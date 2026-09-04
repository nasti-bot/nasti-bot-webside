// 网站所有文案，集中在这里管理。
// 以后改字、改联系方式、加作品，只需要动这个文件，组件代码一个字不用碰。

export const site = {
  brand: 'Nasti-bot',
  brandTagline: 'Nasti-bot 个人作品集',

  // 加载画面
  loading: {
    brand: 'Nasti-bot',
    text: 'LOADING',
  },

  // 右上角菜单项
  menu: [
    { id: 'home', label: '首页' },
    { id: 'works', label: '作品' },
    { id: 'contact', label: '联系' },
  ],

  // 开幕画面
  hero: {
    eyebrow: 'Design & Development',
    tagline: 'CREATING DIGITAL EXPERIENCES',
  },

  // 作品展示区
  works: {
    label: 'Gallery',
    heading: '作品',
    headingAccent: '展示',
    items: [
      {
        id: 1,
        title: 'The Flowers of Abigail',
        desc: '以花朵与人物交织的 AI 动画短片，探索自然与意识之间的诗意联结。',
        tags: ['Stable Diffusion', 'ControlNet', 'Deforum', 'After Effects'],
        image: '背景图/海报主体.png',
      },
      {
        id: 2,
        title: '哥特回廊',
        desc: '以哥特式尖拱与彩色玻璃为灵感的 AI 生成动画，营造神圣而幽邃的视觉叙事。',
        tags: ['Stable Diffusion', 'ComfyUI', 'DaVinci Resolve'],
      },
      {
        id: 3,
        title: '玫瑰之窗',
        desc: '向中世纪玫瑰花窗致敬的 AI 动画，几何放射与彩窗透光交织出神圣几何。',
        tags: ['Runway Gen-3', 'ComfyUI', 'After Effects'],
      },
    ],
  },

  // 联系方式
  contact: {
    label: 'Contact',
    heading: '联系方式',
    links: [
      { label: '邮箱', value: 'ydcbgxg8tfvy6@gmail.com', href: 'mailto:ydcbgxg8tfvy6@gmail.com' },
      { label: 'GitHub', value: 'github.com/nasti-bot', href: 'https://github.com/nasti-bot' },
      { label: '微信', value: 'ivan615930', href: '#' },
    ],
  },

  footer: '© 2026 Nasti-bot',
};
