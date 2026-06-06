import basicArg from './utils/eslint/basicArg.mjs'
import settingArgs from './utils/eslint/settingArgs.mjs'
import styleGuideArg from './utils/eslint/styleGuideArgs.mjs'

export default [...basicArg, ...styleGuideArg, ...settingArgs]
