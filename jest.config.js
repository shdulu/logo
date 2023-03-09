module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest' // .vue 文件转换
  },
  transformIgnorePatterns: ['/!node_modules\\/lodash-es/']
}
