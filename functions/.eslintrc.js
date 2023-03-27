const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: 'module'
  },
  ignorePatterns: [
    '/lib/**/*' // Ignore built files.
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/no-unresolved': 0,
    'import/no-webpack-loader-syntax': 0
  }
};