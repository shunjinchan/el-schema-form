module.exports = {
  title: 'El Schema Form',
  description: '表单自动化解决方案',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/component/form/' },
      { text: 'Schema', link: '/schema/form-schema/' },
      { text: '场景案例', link: '/demo/simple/' },
      { text: 'Github', link: '' }
    ],

    sidebar: [
      {
        title: '指南', // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          '/guide/',
          '/guide/getting-started/'
        ]
      },

      {
        title: '组件',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/component/form/',
          '/component/layout/',
          '/component/schema/'
        ]
      },

      {
        title: 'Schema',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/schema/form-schema/',
          '/schema/api/'
        ]
      },

      {
        title: '场景案例',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/demo/simple/',
          '/demo/list/',
          '/demo/layout/',
          '/demo/complex/'
        ]
      }
    ],

    smoothScroll: true
  }
}
