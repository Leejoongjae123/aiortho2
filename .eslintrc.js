/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:prettier/recommended', // Prettier와 충돌 방지
  ],
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    // 필요 시 커스터마이징
    'react/react-in-jsx-scope': 'off', // Next.js에서는 필요 없음
    'prettier/prettier': ['error'], // Prettier 룰을 ESLint로 강제
  },
};
