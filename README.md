安装依赖

```bash
yarn install
```

启动项目

```bash
yarn start
```

构建项目

```bash
yarn build
```

构建 Umi 运行时导出内容(如 model 写完后需要执行该命令,才能被 ts 语法提示器检测)

```bash
yarn postinstall
```

更新依赖包

```bash
yarn upgrade-interactive
```

更新 yarn

```bash
yarn set version berry
```

导入 yarn 更新依赖包插件

```bash
yarn plugin import interactive-tools
```

导入 yarn TypeScript 库自动加入插件

```bash
yarn plugin import typescript
```
