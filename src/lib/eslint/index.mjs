import { noCrossFeatureDeepImports } from "./rules/cross-features-imports.mjs"
import { noExternalMockHandlerImports } from "./rules/external-mock-handler-imports.mjs"

const config = {
  rules: {
    "no-cross-feature-deep-imports": noCrossFeatureDeepImports,
    "no-external-mock-handler-imports": noExternalMockHandlerImports
  }
}

export default config