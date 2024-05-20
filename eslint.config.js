import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import expo from "eslint-config-expo";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...expo.configs.recommended
];