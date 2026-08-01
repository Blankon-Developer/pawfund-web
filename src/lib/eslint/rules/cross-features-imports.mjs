import { resolve, dirname } from "node:path"

const noCrossFeatureDeepImports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Imports to other features must go through the barrel index (index.ts) as a public interface, not a direct subfolder.",
    },
    messages: {
      deepImport:
        "Import between/outside features must go through their barrel index: " +
        "`@/features/{{importedFeature}}`, as a public interface, not a direct subfolder." +
        "Make sure what you want to import is exported from the index.ts file of that feature.",
    },
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value

        const currentFile = context.filename ?? context.getFilename()
        const normalizedFile = currentFile.replace(/\\/g, "/")

        // Resolve the import path to an absolute path so that both alias
        // (@/features/…) and relative (../features/…) forms are handled uniformly.
        let resolvedImportPath

        if (importPath.startsWith("@/")) {
          // Alias import — convert @/ to the logical /src/ path for matching.
          // We only need the path segment, not a real filesystem path.
          resolvedImportPath = importPath.replace(/^@\//, "/src/")
        } else if (importPath.startsWith(".")) {
          // Relative import — resolve against the current file's directory.
          const absolutePath = resolve(dirname(currentFile), importPath)
          // Normalise to forward-slashes and extract the /src/… portion.
          const normalized = absolutePath.replace(/\\/g, "/")
          const srcIndex = normalized.indexOf("/src/")
          if (srcIndex === -1) return
          resolvedImportPath = normalized.slice(srcIndex)
        } else {
          // Node built-in or bare package import — not our concern.
          return
        }

        // Check whether the resolved path goes into a feature sub-folder:
        //   /src/features/<featureName>/<anything>
        const importMatch = resolvedImportPath.match(
          /\/src\/features\/([^/]+)\/.+/
        )
        if (!importMatch) return

        const importedFeature = importMatch[1]

        // Get the feature name of the file being processed (if any).
        const currentFeatureMatch = normalizedFile.match(
          /\/src\/features\/([^/]+)\//
        )
        const currentFeature = currentFeatureMatch?.[1]

        // If the file is in the SAME feature → allowed (internal import).
        if (currentFeature === importedFeature) return

        context.report({
          node,
          messageId: "deepImport",
          data: { importedFeature },
        })
      },
    }
  },
}

export { noCrossFeatureDeepImports }