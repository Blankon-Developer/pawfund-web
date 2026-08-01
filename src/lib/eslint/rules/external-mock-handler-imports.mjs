import { resolve, dirname } from "node:path"

const noExternalMockHandlerImports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Imports from `@/_mocks/handlers` (and any other sub-path inside `@/_mocks` except `server` and `worker`) are forbidden outside the `src/_mocks` folder.",
    },
    messages: {
      noHandlerImport:
        "Importing from `_mocks/handlers` is not allowed outside `src/_mocks`. " +
        "Only `@/_mocks/server` and `@/_mocks/worker` are public.",
      noInternalMockImport:
        "Importing `{{importPath}}` from inside `_mocks` is not allowed outside `src/_mocks`. " +
        "Only `@/_mocks/server` and `@/_mocks/worker` are public.",
    },
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value

        const currentFile = context.filename ?? context.getFilename()
        const normalizedFile = currentFile.replace(/\\/g, "/")

        // Resolve the import to a logical /src/… path so we handle both
        // alias (@/_mocks/…) and relative (../_mocks/…) imports uniformly.
        let resolvedImportPath

        if (importPath.startsWith("@/")) {
          resolvedImportPath = importPath.replace(/^@\//, "/src/")
        } else if (importPath.startsWith(".")) {
          const absolutePath = resolve(dirname(currentFile), importPath)
          const normalized = absolutePath.replace(/\\/g, "/")
          const srcIndex = normalized.indexOf("/src/")
          if (srcIndex === -1) return
          resolvedImportPath = normalized.slice(srcIndex)
        } else {
          return
        }

        // Only care about imports that target _mocks.
        if (!resolvedImportPath.startsWith("/src/_mocks")) return

        // Files that live inside src/_mocks are allowed to import anything there.
        if (normalizedFile.includes("/src/_mocks/")) return

        // Rule 1: nothing from _mocks/handlers/** is accessible outside.
        if (resolvedImportPath.startsWith("/src/_mocks/handlers")) {
          context.report({ node, messageId: "noHandlerImport" })
          return
        }

        // Rule 2: inside _mocks only server and worker are public.
        // Matches /src/_mocks/server, /src/_mocks/server.ts,
        //         /src/_mocks/worker, /src/_mocks/worker.ts
        const allowedPattern = /^\/src\/_mocks\/(server|worker)(\.ts)?$/
        if (!allowedPattern.test(resolvedImportPath)) {
          context.report({
            node,
            messageId: "noInternalMockImport",
            data: { importPath },
          })
        }
      },
    }
  },
}

export { noExternalMockHandlerImports }