// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // 1. Relajar el tipado estricto (ya tienes el 'any' apagado, bien ahí)
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',

      // 2. Variables no usadas (Cámbialo a 'warn' para que no rompa el build)
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // 3. Promesas (En pruebas rápidas, a veces no quieres el await forzado)
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',

      // 4. El "Fix" definitivo para Windows y Prettier
      // "prettier/prettier": ["error", { 
      //   "endOfLine": "auto",
      //   "singleQuote": true,
      //   "trailingComma": "all" 
      // }],
      "prettier/prettier": "off",

      // 5. Desactivar el chequeo de tipos en el linter (Ahorra CPU y errores raros)
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    },
  },
);
