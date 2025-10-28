const local: App.I18n.Schema = {
  common: {
    status: {
      enable: '启用',
      disable: '禁用',
    },
    edit: '编辑',
    delete: '删除',
    confirmDelete: '确认删除',
    check: '选择',
    expandColumn: '展开',
    batchDelete: '批量删除',
    refresh: '刷新',
    add: '添加',
    columnSetting: '列设置',
  },
  page: {
    home: {
      title: '首页',
    },
    about: {
      title: '关于',
      introduction: `Vue-Admin 是一个优雅且功能强大的后台管理模板，基于最新的前端技术栈，包括 Vue3, Vite7, TypeScript, Pinia 和 UnoCSS。它内置了丰富的主题配置和组件，代码规范严谨，实现了自动化的文件路由系统。此外，它还采用了基于 ApiFox 的在线Mock数据方案。SoybeanAdmin 为您提供了一站式的后台管理解决方案，无需额外配置，开箱即用。同样是一个快速学习前沿技术的最佳实践。`,
      projectInfo: {
        title: '项目信息',
        version: '版本',
        latestBuildTime: '最新构建时间',
        githubLink: 'GitHub 链接',
        previewLink: '预览地址',
      },
      prdDep: '生产依赖',
      devDep: '开发依赖',
    },
    manage: {
      user: {
        gender: {
          unknown: '未知',
          male: '男',
          female: '女',
        },
      },
    },
  },
};

export default local;
