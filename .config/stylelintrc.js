export default {
  plugins: ['stylelint-browser-compat'],
  rules: {
    'plugin/browser-compat': [
      true,
      {
        allow: {
          features: ['at-rules.supports'],
          flagged: false,
          partialImplementation: false,
          prefix: true,
        },
        browserslist: [process.env.BROWSERSLIST],
      },
    ],
  },
}
