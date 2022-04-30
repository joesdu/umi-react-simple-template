// https://umijs.org/config/

import defaultSettings from './defaultSettings';
import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  access: {},
  antd: {},
  // dva: {
  //   hmr: true
  // },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading'
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  exportStatic: {},
  favicon: './favicon.ico',
  // Fast Refresh 热更新
  fastRefresh: {},
  forkTSChecker: {},
  hash: true,
  ignoreMomentLocale: true,
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
  mfsu: {},
  nodeModulesTransform: { type: 'none' },

  // umi routes: https://umijs.org/docs/routing
  routes,
  targets: {
    ie: 11
  },
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable'
  },
  title: false,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  webpack5: {}
});
