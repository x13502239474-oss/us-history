# 美国史：理想与现实之间 · 数字读物

以阅读为核心的美国历史数字读物。纯静态站点，无需构建，双击 `index.html` 即可打开，可直接部署到 GitHub Pages。

## 目录结构

```
us-history/
├── index.html          首页（时间轴、九篇导航、疆域示意、人物事件入口）
├── toc.html            完整目录（9 篇 125 章）
├── themes.html         10 个历史专题索引
├── indexes.html        历史人物与事件索引
├── about.html          编撰说明与资料来源
├── reader.html         阅读页（?ch=章节号）
├── css/style.css       全部样式（现代编辑风格）
├── js/
│   ├── data.js         全站数据：目录、专题、人物、事件、时间轴、疆域、书目
│   ├── core.js         本地存储、阅读设置、搜索、公共导航/页脚
│   ├── home.js         首页渲染
│   └── reader.js       阅读页逻辑（进度、收藏、目录、设置、跳转）
└── chapters/
    └── ch01.js … ch10.js   每章一个独立文件（第一篇已完成）
```

## 如何新增一章

1. 在 `chapters/` 新建 `chNN.js`，沿用已有章节的结构：

   ```js
   (function (root) {
     'use strict';
     root.CHAPTERS = root.CHAPTERS || {};
     root.CHAPTERS[11] = {
       id: 11,
       volume: 2,
       title: '美国独立革命的历史背景',
       years: '1763 — 1775',
       wordCount: '约 4000',
       lead: '导语……',
       sections: [
         { heading: '一、……', paragraphs: ['段落一……', '段落二……'] },
         // ……
       ],
       people: ['乔治·华盛顿'],   // 对应 data.js 中 PEOPLE 的 name
       events: ['1765'],          // 对应 data.js 中 EVENTS 的 id
       editorNote: '本章的编撰说明……'
     };
   })(window);
   ```

2. 在 `reader.html` 的章节脚本列表中加一行：
   `<script src="chapters/ch11.js"></script>`

3. 在 `js/data.js` 中把第 11 章的 `status` 从 `'pending'` 改为 `'ready'`。

完成这三步后，目录、搜索、人物/事件索引、时间轴、阅读进度全部自动生效，无需改动其他文件。

如需在索引中加入新人物/事件，在 `data.js` 的 `PEOPLE` / `EVENTS` 数组追加条目即可。

## 阅读功能

- 阅读位置与进度自动记忆、章节收藏、字体/行距/宽度调节——全部保存在浏览器 localStorage，刷新不丢失。
- 全站关键词搜索（`Ctrl/Cmd + K` 或点顶部"搜索"）。
- 人物索引、事件索引、时间轴、章节关联跳转、上下章导航。

## 内容来源与编撰原则

三本核心参考书的分工见 `about.html`。其中方纳《美国史》与《美国通史》六卷本为影印扫描件，本项目环境无法提取其文字；资中筠《20 世纪的美国》可读取电子文本。所有章节正文均为编撰者以自有语言重新叙述，未复制版权原文，对学术争议并列主要观点。这一说明在网站"编撰说明"页向读者公开。
