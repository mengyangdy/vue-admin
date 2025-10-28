const local: App.I18n.Schema = {
  common: {
    status: {
      enable: 'Enable',
      disable: 'Disable',
    },
    edit: 'Edit',
    delete: 'Delete',
    confirmDelete: 'Confirm Delete',
    check: 'Check',
    expandColumn: 'Expand',
    batchDelete: 'Batch Delete',
    refresh: 'Refresh',
    add: 'Add',
    columnSetting: 'Column Setting',
  },
  page: {
    home: {
      title: 'Home',
    },
    about: {
      title: 'About',
      introduction: `Vue-Admin is an elegant and powerful admin template, based on the latest front-end technology stack, including Vue3, Vite7, TypeScript, Pinia and UnoCSS. It has built-in rich theme configuration and components, strict code specifications, and an automated file routing system. In addition, it also uses the online mock data solution based on ApiFox. SoybeanAdmin provides you with a one-stop admin solution, no additional configuration, and out of the box. It is also a best practice for learning cutting-edge technologies quickly.`,
      projectInfo: {
        title: 'Project Info',
        version: 'Version',
        latestBuildTime: 'Latest Build Time',
        githubLink: 'GitHub Link',
        previewLink: 'Preview Link',
      },
      prdDep: 'Production Dependencies',
      devDep: 'Development Dependencies',
    },
    manage: {
      user: {
        gender: {
          unknown: 'Unknown',
          male: 'Male',
          female: 'Female',
        },
      },
    },
  },
};

export default local;
