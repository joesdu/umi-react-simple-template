import defaultSettings from './defaultSettings';
// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  access: {},
  antd: {},
  // Fast Refresh 热更新
  fastRefresh: true,
  hash: true,
  ignoreMomentLocale: true,
  initialState: {},
  request: {},
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true
  },
  manifest: {
    basePath: '/'
  },

  model: {},
  presets: ['umi-presets-pro'],
  routes,
  targets: {
    ie: 11
  },
  // umi routes: https://umijs.org/docs/routing
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable'
  }
});
