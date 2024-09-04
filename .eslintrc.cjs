/** @type {import('eslint').Linter.Config} */

const shared = {
  plugins: [
    'check-file',
    'canonical',
    'no-relative-import-paths',
    'no-switch-statements',
    'perfectionist',
    'playwright',
    'prefer-arrow',
    'react',
    'sonarjs',
    'tailwindcss',
    'unicorn',
    'vitest',
    'you-dont-need-lodash-underscore',
  ],
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:no-switch-statements/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:canonical/recommended',
    'plugin:sonarjs/recommended-legacy',
    'plugin:tailwindcss/recommended',
    'plugin:unicorn/recommended',
    'plugin:perfectionist/recommended-natural-legacy',
    'prettier',
  ],
  rules: {
    'canonical/destructuring-property-newline': 'off',
    'canonical/import-specifier-newline': 'off',
    'canonical/id-match': 'off',
    'check-file/filename-naming-convention': [
      'error',
      {
        'app/{components,pages}/**/*.ts': 'CAMEL_CASE',
        'app/{components,pages}/**/!(assets|hooks|state|tests)/*.tsx':
          'index+()',
        'app/{components,pages}/**/(assets|hooks|state|tests)/*.{ts,tsx}':
          'KEBAB_CASE',
        'app/languages/**/*.ts': '(_index)|([a-z])*([a-z0-9])*(-+([a-z0-9]))',
        '**/hooks/*.{ts,tsx}': 'CAMEL_CASE',
        'app/state/*.tsx': 'KEBAB_CASE',
        'test/**/*.ts?(x)': 'KEBAB_CASE',
      },
      {
        ignoreMiddleExtensions: true,
      },
    ],
    'check-file/folder-naming-convention': [
      'error',
      {
        'app/components/**/': '(assets|hooks|state|tests|[A-Z][a-zA-Z0-9]*)',
      },
    ],
    'check-file/folder-match-with-fex': [
      'error',
      {
        '*.(stories|test).{ts,tsx}': 'app/**/tests/',
      },
    ],
    'consistent-return': 'off',
    curly: ['error', 'all'],
    'eslint-comments/disable-enable-pair': 'off',
    'eslint-comments/no-unused-disable': 'error',
    'import/extensions': 'off',
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArray: true,
        allowLiteral: true,
        allowObject: true,
      },
    ],
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
      },
    ],
    'max-params': ['error'],
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      {
        allowedDepth: 1,
        allowSameFolder: true,
        prefix: '~',
        rootDir: 'app',
      },
    ],
    'no-unused-vars': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: ['block-like', 'export', 'return'],
        prev: '*',
      },
    ],
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'natural',
        internalPattern: ['~/**'],
        newlinesBetween: 'never',
        groups: [
          'react',
          ['external-type', 'external'],
          ['builtin-type', 'builtin'],
          ['internal-type', 'internal'],
          ['parent-type', 'parent'],
          ['sibling-type', 'sibling'],
          ['index-type', 'index'],
          'side-effect',
          ['object', 'unknown'],
          'style',
        ],
        customGroups: {
          value: {
            react: ['react', 'react-*'],
          },
          type: {
            react: ['react', 'react-*'],
          },
        },
      },
    ],
    'perfectionist/sort-jsx-props': [
      'error',
      {
        type: 'natural',
        groups: ['reserved'],
        customGroups: {
          reserved: ['key', 'ref'],
        },
      },
    ],
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        classPropertiesAllowed: false,
        disallowPrototype: true,
        singleReturnOnly: false,
      },
    ],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: false,
        avoidEscape: true,
      },
    ],
    'react/boolean-prop-naming': [
      'error',
      {
        propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
        rule: '^((is|has|can|show|hide|no)[A-Z]([A-Za-z0-9]?)+|(show|hide|disabled|required))',
      },
    ],
    'react/function-component-definition': 'off',
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-filename-extension': 'off',
    'react/jsx-newline': ['error', {prevent: true}],
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'sonarjs/cognitive-complexity': 'off',
    'sonarjs/no-nested-conditional': 'off',
    'sonarjs/no-commented-code': 'off',
    'sonarjs/no-misused-promises': ['error', {checksVoidReturn: false}],
    'sonarjs/todo-tag': 'off',
    'sonarjs/regex-complexity': 'off',
    'spaced-comment': 'off',
    // classnames order handled by prettier-plugin-tailwindcss
    'tailwindcss/classnames-order': 'off',
    'unicorn/consistent-destructuring': 'error',
    'unicorn/filename-case': 'off',
    'unicorn/new-for-builtins': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prefer-export-from': 'off',
    'unicorn/prefer-set-has': 'off',
    'unicorn/prefer-switch': 'off',
    'unicorn/prefer-ternary': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        ignore: [
          'acc',
          'ctx',
          'e2e',
          'env',
          'obj',
          'prev',
          'req',
          'res',
          /args/i,
          /fn/i,
          /params/i,
          /props/i,
          /ref/i,
          /src/i,
          /utils/i,
        ],
      },
    ],
    'unicorn/text-encoding-identifier-case': 'off',
  },
};

module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2024: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules', 'build'],
  extends: ['airbnb', ...shared.extends],
  plugins: shared.plugins,
  rules: shared.rules,
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: [
        ...shared.plugins,
        '@typescript-eslint',
        'typescript-enum',
        'import',
      ],
      extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:typescript-enum/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        ...shared.extends,
      ],
      settings: {
        'import/internal-regex': '^~/',
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx'],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
        react: {
          pragma: 'React',
          version: 'detect',
        },
        jest: {
          version: 28,
        },
        linkComponents: [
          {linkAttribute: 'to', name: 'Link'},
          {linkAttribute: 'to', name: 'NavLink'},
        ],
        tailwindcss: {
          callees: ['twJoin', 'twMerge'],
        },
      },
      globals: {
        Api: 'readonly',
      },
      rules: {
        ...shared.rules,
        'no-undef': 'off',
        '@typescript-eslint/array-type': ['error', {default: 'array'}],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/method-signature-style': 'error',
        '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],
        '@typescript-eslint/no-unused-vars': 'error',
      },
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/method-signature-style': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['*.test.ts?(x)', '*.stories.ts?(x)'],
      extends: ['plugin:vitest/legacy-recommended'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'guard-for-in': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'max-params': 'off',
        'no-await-in-loop': 'off',
        'no-restricted-syntax': 'off',
        'react/jsx-props-no-spreading': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/no-identical-functions': 'off',
      },
    },
    {
      files: ['test/**/*.ts?(x)'],
      extends: ['plugin:vitest/legacy-recommended'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
    },
    {
      files: ['*.tsx', '**/hooks/*.ts?(x)'],
      rules: {
        'canonical/filename-match-exported': 'error',
        'canonical/sort-react-dependencies': 'error',
        'sonarjs/cognitive-complexity': 'off',
        'sonarjs/function-return-type': 'off',
      },
    },
    {
      files: ['app/**/!(*.test|*.stories).ts?(x)'],
      rules: {
        'import/no-unresolved': 'error',
      },
    },
    {
      files: ['./*.ts'],
      rules: {
        'global-require': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'error',
        'import/prefer-default-export': 'off',
        'no-void': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/prevent-abbreviations': 'off',
      },
    },
    {
      files: ['.storybook/**/*.ts?(x)'],
      rules: {
        'canonical/filename-match-exported': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['**/routes/**/*.tsx'],
      rules: {
        'canonical/filename-match-exported': 'off',
        'react/display-name': 'off',
      },
    },
    {
      files: ['app/?(components|pages|services|utils)/**/*.ts?(x)'],
      rules: {
        'max-lines': ['error', 200],
      },
    },
    {
      files: ['app/languages/**/*.ts'],
      rules: {
        'sonarjs/no-hardcoded-credentials': 'off',
      },
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        'prefer-arrow/prefer-arrow-functions': 'off',
      },
    },
    {
      files: [
        '**/*.stories.tsx',
        'app/root.tsx',
        'app/entry.server.tsx',
        'test/**/*.ts?(x)',
      ],
      rules: {
        'canonical/filename-match-exported': 'off',
      },
    },
    {
      files: ['.playwright/**/*.ts'],
      extends: ['plugin:playwright/recommended'],
      rules: {
        'canonical/filename-match-exported': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'no-await-in-loop': 'off',
        'no-restricted-syntax': 'off',
      },
    },
  ],
};
