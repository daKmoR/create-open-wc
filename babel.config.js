const presets = [
  [
    '@babel/env',
    {
      targets: {
        node: '10',
      },
      useBuiltIns: 'usage',
    },
  ],
];

module.exports = {
  plugins: [
    'babel-plugin-transform-dynamic-import'
  ],
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: '10',
        },
        useBuiltIns: 'usage',
      },
    ],
  ]
};
