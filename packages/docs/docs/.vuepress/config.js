const { fs, path } = require('@vuepress/shared-utils')

module.exports = ctx => ({
  dest: '../../vuepress',

  locales: {
    '/': {
      lang: 'en-US',
      title: 'Waves Doc',
      description: 'Vue-powered Static Site Generator'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Waves Doc',
      description: 'Vue 驱动的静态网站生成器'
    },
    '/ru/': {
      lang: 'ru-RU',
      title: 'Waves Doc',
      description: 'Waves документация на русском'
    },
    '/ko/': {
      lang: 'ko-Ko',
      title: 'Waves Doc',
      description: 'Waves документация на ko'
    },
    '/pt-br/': {
      lang: 'pt-Br',
      title: 'Waves Doc',
      description: 'Waves документация на Português'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#1f5af6' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#1f5af6' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  theme: '@vuepress/vue',
  themeConfig: {
    logo: '/waves-docs-logo.svg',

    repo: 'vuejs/vuepress',
    editLinks: true,
    docsDir: 'packages/docs/docs',
    // #697 Provided by the official algolia team.
    // algolia: ctx.isProd ? ({
    //   apiKey: '3a539aab83105f01761a137c61004d85',
    //   indexName: 'vuepress'
    // }) : null,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: {
          '/api/': getApiSidebar(),
          '/introduction/': getGuideSidebar('Guide', 'Advanced'),
          '/plugin/': getPluginSidebar('Plugin', 'Introduction', 'Official Plugins'),
          '/theme/': getThemeSidebar('Theme', 'Introduction'),
        }
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: require('./nav/zh'),
        sidebar: {
          '/zh/api/': getApiSidebar(),
          '/zh/guide/': getGuideSidebar('指南', '深入'),
          '/zh/plugin/': getPluginSidebar('插件', '介绍', '官方插件'),
          '/zh/theme/': getThemeSidebar('主题', '介绍')
        }
      },
      '/ru/': {
        label: 'Русский',
        selectText: 'Язык',
        editLinkText: 'Изменить эту страницу на GitHub',
        lastUpdated: 'Последние изменения',
        nav: require('./nav/ru'),
        sidebar: {
          '/ru/api/': getApiSidebar(),
          '/ru/guide/': getGuideSidebar('Гайд', 'Тест'),
          '/ru/plugin/': getPluginSidebar('Плагин', 'Введение', 'Официальные плагины'),
          '/ru/theme/': getThemeSidebar('Тема', 'Введение')
        }
      },
      '/ko/': {
        label: '한국어',
        selectText: 'Язык',
        editLinkText: 'Изменить эту страницу на GitHub',
        lastUpdated: 'Последние изменения',
        nav: require('./nav/ko'),
        sidebar: {
          '/ru/api/': getApiSidebar(),
          '/ru/guide/': getGuideSidebar('Гайд', 'Тест'),
          '/ru/plugin/': getPluginSidebar('Плагин', 'Введение', 'Официальные плагины'),
          '/ru/theme/': getThemeSidebar('Тема', 'Введение')
        }
      },
      '/pt-br/': {
        label: 'Português',
        selectText: 'Язык',
        editLinkText: 'Изменить эту страницу на GitHub',
        lastUpdated: 'Последние изменения',
        nav: require('./nav/pt-br'),
        sidebar: {
          '/ru/api/': getApiSidebar(),
          '/ru/guide/': getGuideSidebar('Гайд', 'Тест'),
          '/ru/plugin/': getPluginSidebar('Плагин', 'Введение', 'Официальные плагины'),
          '/pt-br/theme/': getThemeSidebar('Тема', 'Введение')
        }
      }
    },
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/google-analytics', {
      ga: 'UA-128189152-1'
    }],
    ['container', {
      type: 'vue',
      before: '<pre class="vue-container"><code>',
      after: '</code></pre>',
    }],
    ['container', {
      type: 'upgrade',
      before: info => `<UpgradePath title="${info}">`,
      after: '</UpgradePath>',
    }],
  ],
  extraWatchFiles: [
    '.vuepress/nav/en.js',
    '.vuepress/nav/zh.js',
  ]
})

function getApiSidebar () {
  return [
    'cli',
    'node'
  ]
}

function getGuideSidebar (groupA, groupB) {
  return [
// '',
    // 'developer-tools',
    // ['developer-tools/', {
    //   title: 'Foo',
    //   collapsable: true,
    //   children: [
    //     // '',
    //     'faq'
    //   ]
    // }],
    {
      title: 'Overview',
      collapsable: true,
    },
    {
      title: 'Waves environment',
      collapsable: true,
      children: [
        {
          title: 'Waves Tokens',
          path: 'waves-environment/waves-tokens'
        },
        {
          title: 'Custom Tokens',
          path: 'waves-environment/custom-tokens',
        },
      ],
    },
    {
      title: 'Getting started',
      collapsable: false,
    },
    {
      title: 'Developer tools',
      collapsable: false,
    },
    {
      title: 'Waves api & sdk',
      collapsable: false,
    },
    {
      title: 'Smart contracts',
      collapsable: false,
    },
    {
      title: 'Waves full node',
      collapsable: false,
    },
    {
      title: 'Oracles developments',
      collapsable: false,
    },
    {
      title: 'Waves client',
      collapsable: false,
    },
    {
      title: 'Tutorials and articles',

      collapsable: false,
      children: [
        {
          title: 'Test',
          path: 'developer-tools/faq',
        }
      ]
    },
    {
      title: 'Proposals',
      collapsable: false,
    },
    // ['developer-tools/faq', ],

    // 'developer-tools/faq',
    // 'getting-started',
    // 'directory-structure',
    // 'basic-config',
    // 'assets',
    // 'markdown',
    // 'using-vue',
    // 'i18n',
    // 'deploy',
  ]
}

const officalPlugins = fs
  .readdirSync(path.resolve(__dirname, '../plugin/official'))
  .map(filename => 'official/' + filename.slice(0, -3))
  .sort()

function getPluginSidebar (pluginTitle, pluginIntro, officialPluginTitle) {
  return [
    {
      title: pluginTitle,
      collapsable: false,
      children: [
        ['', pluginIntro],
        'using-a-plugin',
        'writing-a-plugin',
        'life-cycle',
        'option-api',
        'context-api'
      ]
    },
    {
      title: officialPluginTitle,
      collapsable: false,
      children: officalPlugins,
    }
  ]
}

function getThemeSidebar (groupA, introductionA) {
  return [
    {
      title: groupA,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        ['', introductionA],
        'using-a-theme',
        'writing-a-theme',
        'option-api',
        'default-theme-config',
        'inheritance'
      ]
    },
  ]
}
