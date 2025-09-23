import type { Component } from "vue";
import type { RouteRecordRaw } from "vue-router";

/**
 * 登录路由名称
 */
const LOGIN_ROUTE_PATH = "/login";

/**
 * 跟路由 所有的动态路由都会添加到这个路由下
 */
const ROOT_ROUTE_NAME = "Root";

const notFoundRoute: RouteRecordRaw = {
  path: "/:path(.*)*",
  component: () => import("@/views/demos/fallback/404.vue"),
  meta: {
    title: "404",
  },
};

const rootRoute = {
  path: "/",
  name: ROOT_ROUTE_NAME,
  component: () => import("@/components/layout/index.vue"),
  children: [],
  meta: {
    hideInBreadcrumb: true,
  },
};

/**
 * 忽略权限的路由
 */
const ignoreAccessRoutes: RouteRecordRaw[] = [
  {
    path: LOGIN_ROUTE_PATH,
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      requiresAuth: false,
    },
  },
];

/**
 * 权限路由，前端权限模式下会使用该数据
 */
const accessRoutes: RouteRecordRaw[] = [
  {
    path: "/home",
    component: () => import("@/views/home/index.vue"),
    meta: {
      title: "首页",
      icon: "material-symbols:dashboard-outline-rounded",
      fixedInTabs: true,
    },
  },
  {
    path: "/demos",
    children: [
      {
        path: "access",
        children: [
          {
            path: "toggle",
            component: () => import("@/views/demos/access/toggle/index.vue"),
            meta: {
              title: "权限切换",
              icon: "mdi:page-previous-outline",
            },
          },
        ],
        meta: {
          title: "权限",
          icon: "material-symbols:lock-outline",
        },
      },
      {
        path: "fallback",
        children: [
          {
            path: "403",
            component: () => import("@/views/demos/fallback/403.vue"),
            meta: {
              title: "403",
              icon: "mdi:forbid",
            },
          },
          {
            path: "404",
            component: () => import("@/views/demos/fallback/404.vue"),
            meta: {
              title: "404",
              icon: "ic:baseline-browser-not-supported",
            },
          },
          {
            path: "500",
            component: () => import("@/views/demos/fallback/500.vue"),
            meta: {
              title: "500",
              icon: "streamline-flex:monitor-error",
            },
          },
        ],
        meta: {
          title: "异常页",
          icon: "solar:shield-warning-broken",
        },
      },
      {
        path: "external",
        meta: {
          title: "外部页面",
          icon: "ant-design:link-outlined",
        },
        children: [
          {
            path: "iframe",
            children: [
              {
                path: "form",
                component: {},
                meta: {
                  title: "复杂表单",
                  icon: "lets-icons:form",
                  link: "https://naive-ui.pro-components.cn/zh-CN/os-theme/components/form-list#list-nest.vue",
                  linkMode: "iframe",
                },
              },
              {
                path: "edit-data-table",
                component: {},
                meta: {
                  title: "编辑表格",
                  icon: "material-symbols:table-outline",
                  link: "https://naive-ui.pro-components.cn/zh-CN/os-theme/components/edit-data-table#async.vue",
                  linkMode: "iframe",
                },
              },
              {
                path: "baidu-iframe",
                component: {},
                meta: {
                  title: "百度",
                  icon: "ri:baidu-fill",
                  link: "https://www.baidu.com",
                  linkMode: "iframe",
                },
              },
              {
                path: "menu",
                component: () => import("@/views/system/menu/index.vue"),
                meta: {
                  title: "菜单管理",
                  link: true,
                  linkMode: "iframe",
                },
              },
            ],
            meta: {
              title: "内嵌",
              icon: "material-symbols:iframe",
            },
          },
          {
            path: "link",
            children: [
              {
                path: "vite",
                component: {},
                meta: {
                  icon: "logos:vitejs",
                  title: "Vite",
                  link: "https://vite.dev",
                },
              },
              {
                path: "vue",
                component: {},
                meta: {
                  icon: "logos:vue",
                  title: "Vue",
                  link: "https://vuejs.org/",
                },
              },
              {
                path: "menu-layout-falsy",
                component: () => import("@/views/system/menu/index.vue"),
                meta: {
                  title: "无布局",
                  layout: false,
                  link: true,
                },
              },
              {
                path: "menu",
                component: () => import("@/views/system/menu/index.vue"),
                meta: {
                  title: "菜单管理",
                  link: true,
                },
              },
            ],
            meta: {
              title: "外链",
              icon: "akar-icons:link-out",
            },
          },
        ],
      },
      {
        path: "download",
        name: "Download",
        component: () => import("@/views/demos/download/index.vue"),
        meta: {
          title: "文件下载",
          icon: "material-symbols:download",
        },
      },
      {
        path: "nested-detail",
        component: () => import("@/views/demos/nested/index.vue"),
        children: [
          {
            path: "detail",
            component: () => import("@/views/demos/nested/detail.vue"),
            meta: {
              title: "详情页",
              hideInMenu: true,
            },
          },
        ],
        meta: {
          title: "嵌套详情页",
          icon: "bx:detail",
        },
      },
      {
        path: "keep-alive",
        children: [
          {
            path: "demo1",
            component: () => import("@/views/demos/keep-alive/demo1.vue"),
            meta: {
              title: "基础缓存",
              keepAlive: true,
            },
          },
          {
            path: "demo2",
            component: () => import("@/views/demos/keep-alive/demo2.vue"),
            meta: {
              title: "条件缓存",
              keepAlive: {
                include: ["Tabs"],
              },
            },
          },
        ],
        meta: {
          title: "缓存路由",
          icon: "octicon:cache-16",
        },
      },
      {
        path: "tabs",
        name: "Tabs",
        component: () => import("@/views/demos/tabs/index.vue"),
        meta: {
          title: "多标签",
          icon: "mdi:tab",
        },
      },
      {
        path: "page-component",
        component: () => import("@/views/demos/page-component/index.vue"),
        meta: {
          title: "页面级组件",
          icon: "material-symbols:pageview-outline",
        },
      },
      {
        path: "editor",
        component: () => import("@/views/demos/wang-editor/index.vue"),
        meta: {
          title: "富文本",
          icon: "material-symbols:edit-document-outline",
        },
      },
      {
        path: "complex-form",
        component: () => import("@/views/demos/complex-form/index.vue"),
        meta: {
          title: "复杂表单",
          icon: "material-symbols:dynamic-form-outline",
        },
      },
      {
        path: "icon",
        component: () => import("@/views/demos/icon/index.vue"),
        meta: {
          title: "图标选择器",
          icon: "mdi:image-outline",
        },
      },
      {
        path: "loading",
        component: () => import("@/views/demos/loading/index.vue"),
        meta: {
          title: "Loading 指令",
          icon: "line-md:loading-twotone-loop",
        },
      },
    ],
    meta: {
      title: "演示",
      icon: "hugeicons:codesandbox",
    },
  },
  {
    path: "/system",
    children: [
      {
        path: "user",
        component: () => import("@/views/system/user/index.vue"),
        meta: {
          title: "用户管理",
          icon: "ant-design:user-outlined",
          roles: ["super", "admin"],
        },
      },
      {
        path: "role",
        component: () => import("@/views/system/role/index.vue"),
        meta: {
          title: "角色管理",
          icon: "carbon:user-role",
          roles: ["super"],
        },
      },
      {
        path: "menu",
        component: () => import("@/views/system/menu/index.vue"),
        meta: {
          title: "菜单管理",
          roles: ["super"],
        },
      },
    ],
    meta: {
      title: "系统管理",
      icon: "ant-design:setting-outlined",
      roles: ["super", "admin"],
    },
  },
];

/**
 * 页面组件映射，后端权限模式下会使用该数据
 */
const matched = import.meta.glob("@/views/**/*.vue");
const pageMap = Object.entries(matched).reduce<Record<string, Component>>(
  (p, [path, value]) => {
    const finalPath = `/${path.split("/").slice(3).join("/")}`;
    p[finalPath] = value;
    return p;
  },
  {}
);

export {
  accessRoutes,
  ignoreAccessRoutes,
  LOGIN_ROUTE_PATH,
  notFoundRoute,
  pageMap,
  ROOT_ROUTE_NAME,
  rootRoute,
};
