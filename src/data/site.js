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
    { id: 'design', label: '平面设计' },
    { id: 'works', label: 'AI动画' },
    { id: 'contact', label: '联系' },
  ],

  // 开幕画面
  hero: {
    eyebrow: 'Design & Development',
    tagline: 'CREATING DIGITAL EXPERIENCES',
  },

  // 平面设计作品集
  design: {
    label: 'Graphic Design',
    heading: '平面设计',
    headingAccent: '作品集',
    items: [
      {
        id: 1,
        title: '荆棘冠',
        desc: 'From the drooping head of flesh and blood, the crown of the thorns is lifted high.',
        tags: ['平面设计', '视觉设计'],
        image: '作品/荆棘冠.png',
      },
      {
        id: 2,
        title: '蜕凡思',
        desc: 'Shedding the mortal shell, its thoughts brim with vitality.',
        tags: ['平面设计', '视觉设计'],
        image: '作品/蜕凡思.png',
      },
    ],
  },

  // 作品展示区
  works: {
    label: 'Gallery',
    heading: 'AI动画',
    headingAccent: '作品',
    items: [
      {
        id: 1,
        title: 'The Flowers of Abigail',
        desc: '以花朵与人物交织的 AI 动画短片，探索自然与意识之间的诗意联结。',
        tags: ['Stable Diffusion', 'ControlNet', 'Deforum', 'After Effects'],
        image: '背景图/海报主体.png',
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
