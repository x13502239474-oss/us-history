/* ============================================================
 * 美国历史数字读物 · 全站数据
 * 内容与 UI 分离：所有目录、索引、时间轴数据集中于此。
 * 章节正文位于 chapters/chNN.js，逐章独立文件，可单独编辑扩充。
 * status: ready = 已有完整正文；pending = 规划中，尚未撰写（不可点击）。
 * ============================================================ */
(function (root) {
  'use strict';

  var SITE = {
    title: '美国史：理想与现实之间',
    subtitle: '一部以阅读为核心的美国历史数字读物',
    edition: '第一版 · 持续扩充中',
    updated: '2026-11-22',
    sourceNote: [
      '本读物的主线与问题意识，来自埃里克·方纳《美国史：理想与现实》——自由、民主与平等理念在美国历史中的展开及其内在矛盾。',
      '各时期的政治、经济、社会与外交细节，参照刘绪贻、杨生茂主编《美国通史》六卷本。',
      '20 世纪部分的专题判断，参照资中筠《20 世纪的美国》。',
      '编撰说明：上述三书中，《20 世纪的美国》提供可检索的电子文本；方纳《美国史》与《美国通史》六卷本为影印扫描件，无法在本项目环境中提取文字。因此全部章节均为编撰者依据通史知识、以自有语言重新叙述，未复制任何原书段落。凡涉及学术争议之处，尽量并列主要观点，不假托原书作者之口。'
    ]
  };

  // 核心参考书目
  var BOOKS = [
    {
      id: 'foner',
      title: '美国史：理想与现实',
      author: '埃里克·方纳（Eric Foner）',
      role: '核心阅读主线',
      desc: '以"自由"概念的演变贯穿美国历史，关注民主制度、劳动、种族与公民权的扩张及其局限。本读物的问题意识与叙事主线主要据此建立。',
      access: '影印扫描件，正文未能直接提取'
    },
    {
      id: 'tongshi',
      title: '美国通史（六卷本）',
      author: '刘绪贻、杨生茂 主编',
      role: '学术深化依据',
      desc: '按时期系统叙述美国政治、经济、社会、外交与文化，为各章提供史实细节与学术背景。',
      access: '影印扫描件，正文未能直接提取'
    },
    {
      id: 'zizhongyun',
      title: '20 世纪的美国',
      author: '资中筠',
      role: '近现代专题补充',
      desc: '以中国学者的视角审视美国成为世界强国、两次世界大战、冷战与当代美国，长于制度与价值层面的分析。',
      access: '电子文本可读取'
    }
  ];

  // 九篇完整目录（125 章）
  var VOLUMES = [
    {
      id: 1, roman: '第一篇', title: '美洲文明与欧洲殖民', period: '史前 — 1763',
      summary: '在欧洲人到来之前，美洲早已存在复杂文明。本篇从原住民社会与地理环境讲起，追踪西班牙、法国、英国在北美的殖民竞争，以及英属殖民地经济、社会与政治传统的形成，直到七年战争改变北美格局。',
      chapters: [
        { id: 1, title: '欧洲人到来之前的美洲原住民文明', years: '约公元前 12000 — 1492', status: 'ready' },
        { id: 2, title: '美洲地理环境与原住民社会', years: '史前 — 16 世纪', status: 'ready' },
        { id: 3, title: '欧洲地理大发现与殖民扩张', years: '15 — 16 世纪', status: 'ready' },
        { id: 4, title: '西班牙、法国和英国在北美的殖民活动', years: '1513 — 1763', status: 'ready' },
        { id: 5, title: '英属北美殖民地的形成', years: '1607 — 1732', status: 'ready' },
        { id: 6, title: '殖民地经济与社会结构', years: '1607 — 1775', status: 'ready' },
        { id: 7, title: '奴隶贸易与种族制度的形成', years: '1619 — 1775', status: 'ready' },
        { id: 8, title: '英属北美殖民地的政治传统', years: '1607 — 1775', status: 'ready' },
        { id: 9, title: '七年战争与英国殖民政策变化', years: '1754 — 1763', status: 'ready' },
        { id: 10, title: '北美殖民地与英国之间的矛盾', years: '1763 — 1775', status: 'ready' }
      ]
    },
    {
      id: 2, roman: '第二篇', title: '美国独立与共和国建立', period: '1765 — 1791',
      summary: '从抗税运动到独立战争，从邦联条例到联邦宪法，美国人在实践中回答了一个此前没有先例的问题：能否建立一个既有效又自由的共和政体。',
      chapters: [
        { id: 11, title: '美国独立革命的历史背景', years: '1763 — 1775', status: 'pending' },
        { id: 12, title: '波士顿倾茶事件与革命爆发', years: '1773 — 1775', status: 'pending' },
        { id: 13, title: '独立宣言的形成及其思想基础', years: '1776', status: 'pending' },
        { id: 14, title: '美国独立战争', years: '1775 — 1783', status: 'pending' },
        { id: 15, title: '华盛顿与大陆军', years: '1775 — 1783', status: 'pending' },
        { id: 16, title: '法国援助与国际政治', years: '1778 — 1783', status: 'pending' },
        { id: 17, title: '美国独立战争的胜利', years: '1781 — 1783', status: 'pending' },
        { id: 18, title: '邦联条例与早期共和国困境', years: '1781 — 1789', status: 'pending' },
        { id: 19, title: '美国宪法的制定', years: '1787', status: 'pending' },
        { id: 20, title: '联邦主义者与反联邦主义者', years: '1787 — 1788', status: 'pending' },
        { id: 21, title: '权利法案与美国政治制度的建立', years: '1789 — 1791', status: 'pending' },
        { id: 22, title: '华盛顿政府与联邦政府的形成', years: '1789 — 1797', status: 'pending' }
      ]
    },
    {
      id: 3, roman: '第三篇', title: '早期共和国与领土扩张', period: '1790 — 1848',
      summary: '年轻的共和国在政党争论、领土扩张与经济转型中成长。杰斐逊、杰克逊时代的大众政治扩大了参与，也把印第安人迁移与奴隶制问题推向中心。',
      chapters: [
        { id: 23, title: '联邦党与民主共和党', years: '1790 — 1820', status: 'pending' },
        { id: 24, title: '杰斐逊时代', years: '1801 — 1809', status: 'pending' },
        { id: 25, title: '路易斯安那购地', years: '1803', status: 'pending' },
        { id: 26, title: '1812 年战争', years: '1812 — 1815', status: 'pending' },
        { id: 27, title: '门罗主义', years: '1823', status: 'pending' },
        { id: 28, title: '美国西进运动', years: '1800 — 1860', status: 'pending' },
        { id: 29, title: '印第安人迁移与土地扩张', years: '1830 — 1850', status: 'pending' },
        { id: 30, title: '美国领土扩张与墨西哥战争', years: '1845 — 1848', status: 'pending' },
        { id: 31, title: '杰克逊民主与大众政治', years: '1828 — 1840', status: 'pending' },
        { id: 32, title: '美国早期资本主义发展', years: '1790 — 1860', status: 'pending' },
        { id: 33, title: '南北经济结构差异', years: '1800 — 1860', status: 'pending' },
        { id: 34, title: '奴隶制与废奴主义运动', years: '1800 — 1860', status: 'pending' }
      ]
    },
    {
      id: 4, roman: '第四篇', title: '南北战争与重建', period: '1846 — 1877',
      summary: '奴隶制问题撕裂了共和国。内战不仅决定奴隶制的存废，也重新定义了联邦与公民身份；重建时期的短暂希望与最终失败，留下至今未解的种族问题。',
      chapters: [
        { id: 35, title: '奴隶制问题与美国政治危机', years: '1846 — 1860', status: 'pending' },
        { id: 36, title: '密苏里妥协与 1850 年妥协', years: '1820 — 1850', status: 'pending' },
        { id: 37, title: '堪萨斯内战', years: '1854 — 1856', status: 'pending' },
        { id: 38, title: '林肯当选与南方分离', years: '1860 — 1861', status: 'pending' },
        { id: 39, title: '南北战争爆发', years: '1861', status: 'pending' },
        { id: 40, title: '南北战争的军事进程', years: '1861 — 1865', status: 'pending' },
        { id: 41, title: '林肯与解放奴隶宣言', years: '1862 — 1863', status: 'pending' },
        { id: 42, title: '葛底斯堡战役', years: '1863', status: 'pending' },
        { id: 43, title: '南北战争结束', years: '1864 — 1865', status: 'pending' },
        { id: 44, title: '林肯遇刺', years: '1865', status: 'pending' },
        { id: 45, title: '重建时期', years: '1865 — 1877', status: 'pending' },
        { id: 46, title: '黑人公民权与宪法修正案', years: '1865 — 1870', status: 'pending' },
        { id: 47, title: '重建失败及其历史原因', years: '1870 — 1877', status: 'pending' },
        { id: 48, title: '南方种族隔离制度的形成', years: '1877 — 1900', status: 'pending' }
      ]
    },
    {
      id: 5, roman: '第五篇', title: '工业化与现代美国形成', period: '1865 — 1900',
      summary: '内战后的美国迅速工业化。铁路、钢铁与石油重塑经济，垄断资本与工人运动同时壮大，移民与城市化改变社会面貌，进步主义试图回应这些巨变。',
      chapters: [
        { id: 49, title: '镀金时代', years: '1865 — 1900', status: 'pending' },
        { id: 50, title: '第二次工业革命', years: '1870 — 1914', status: 'pending' },
        { id: 51, title: '铁路、钢铁与石油工业', years: '1860 — 1900', status: 'pending' },
        { id: 52, title: '洛克菲勒、卡内基与摩根', years: '1870 — 1910', status: 'pending' },
        { id: 53, title: '垄断资本与托拉斯', years: '1880 — 1910', status: 'pending' },
        { id: 54, title: '美国工人运动', years: '1860 — 1920', status: 'pending' },
        { id: 55, title: '移民潮与城市化', years: '1860 — 1920', status: 'pending' },
        { id: 56, title: '城市贫困与社会问题', years: '1870 — 1910', status: 'pending' },
        { id: 57, title: '进步主义运动', years: '1890 — 1917', status: 'pending' },
        { id: 58, title: '西奥多·罗斯福与反垄断政策', years: '1901 — 1909', status: 'pending' },
        { id: 59, title: '威尔逊与新自由运动', years: '1913 — 1921', status: 'pending' },
        { id: 60, title: '美国海外扩张', years: '1890 — 1914', status: 'pending' },
        { id: 61, title: '美西战争与美国成为海外帝国', years: '1898', status: 'pending' },
        { id: 62, title: '美国与拉丁美洲的关系', years: '1823 — 1930', status: 'pending' }
      ]
    },
    {
      id: 6, roman: '第六篇', title: '世界大战与美国崛起', period: '1914 — 1945',
      summary: '两次世界大战把美国从地区强国推上世界舞台。一战后的繁荣与萧条、新政的制度实验、二战的战争动员，共同塑造了现代美国国家。',
      chapters: [
        { id: 63, title: '第一次世界大战前的美国', years: '1900 — 1914', status: 'pending' },
        { id: 64, title: '美国参与第一次世界大战', years: '1917 — 1918', status: 'pending' },
        { id: 65, title: '威尔逊与十四点计划', years: '1918 — 1919', status: 'pending' },
        { id: 66, title: '战后美国的国际地位', years: '1919 — 1929', status: 'pending' },
        { id: 67, title: '1920 年代的经济繁荣', years: '1920 — 1929', status: 'pending' },
        { id: 68, title: '消费主义与大众文化', years: '1920 — 1940', status: 'pending' },
        { id: 69, title: '种族主义与三 K 党', years: '1915 — 1930', status: 'pending' },
        { id: 70, title: '禁酒令与社会变迁', years: '1920 — 1933', status: 'pending' },
        { id: 71, title: '1929 年经济大危机', years: '1929 — 1933', status: 'pending' },
        { id: 72, title: '大萧条的社会影响', years: '1929 — 1939', status: 'pending' },
        { id: 73, title: '胡佛政府与危机应对', years: '1929 — 1933', status: 'pending' },
        { id: 74, title: '罗斯福新政', years: '1933 — 1939', status: 'pending' },
        { id: 75, title: '新政的制度改革与历史争议', years: '1933 — 1945', status: 'pending' },
        { id: 76, title: '第二次世界大战前的美国', years: '1933 — 1941', status: 'pending' },
        { id: 77, title: '珍珠港事件', years: '1941', status: 'pending' },
        { id: 78, title: '美国参与第二次世界大战', years: '1941 — 1945', status: 'pending' },
        { id: 79, title: '美国的战争经济', years: '1941 — 1945', status: 'pending' },
        { id: 80, title: '欧洲战场与太平洋战场', years: '1941 — 1945', status: 'pending' },
        { id: 81, title: '原子弹与日本投降', years: '1945', status: 'pending' },
        { id: 82, title: '第二次世界大战后的美国国际地位', years: '1945', status: 'pending' }
      ]
    },
    {
      id: 7, roman: '第七篇', title: '冷战与美国超级大国地位', period: '1945 — 1972',
      summary: '战后美国与苏联从盟友变为对手。遏制政策、联盟体系、朝鲜与越南战争、民权运动和新左派，构成冷战时期美国内政外交的双重主线。',
      chapters: [
        { id: 83, title: '战后国际秩序与美苏关系', years: '1945 — 1947', status: 'pending' },
        { id: 84, title: '冷战的形成', years: '1946 — 1949', status: 'pending' },
        { id: 85, title: '杜鲁门主义与遏制政策', years: '1947', status: 'pending' },
        { id: 86, title: '马歇尔计划与欧洲重建', years: '1947 — 1952', status: 'pending' },
        { id: 87, title: '北约与美国联盟体系', years: '1949 — 1955', status: 'pending' },
        { id: 88, title: '朝鲜战争', years: '1950 — 1953', status: 'pending' },
        { id: 89, title: '麦卡锡主义与国内反共运动', years: '1947 — 1954', status: 'pending' },
        { id: 90, title: '艾森豪威尔时期', years: '1953 — 1961', status: 'pending' },
        { id: 91, title: '美国经济与郊区化', years: '1945 — 1960', status: 'pending' },
        { id: 92, title: '肯尼迪与新边疆政策', years: '1961 — 1963', status: 'pending' },
        { id: 93, title: '古巴导弹危机', years: '1962', status: 'pending' },
        { id: 94, title: '越南战争', years: '1955 — 1975', status: 'pending' },
        { id: 95, title: '民权运动', years: '1954 — 1968', status: 'pending' },
        { id: 96, title: '马丁·路德·金与黑人平权', years: '1955 — 1968', status: 'pending' },
        { id: 97, title: '美国学生运动与反战运动', years: '1960 — 1972', status: 'pending' },
        { id: 98, title: '约翰逊与伟大社会计划', years: '1964 — 1968', status: 'pending' },
        { id: 99, title: '尼克松与中美关系正常化', years: '1969 — 1972', status: 'pending' },
        { id: 100, title: '水门事件与美国政治危机', years: '1972 — 1974', status: 'pending' }
      ]
    },
    {
      id: 8, roman: '第八篇', title: '冷战后期与美国政治转型', period: '1973 — 2000',
      summary: '滞胀、石油危机与冷战结束改变了美国的自我理解。里根革命、新自由主义、全球化与互联网革命，把美国带入一个政治经济重新组合的时代。',
      chapters: [
        { id: 101, title: '1970 年代的美国经济困境', years: '1970 — 1980', status: 'pending' },
        { id: 102, title: '石油危机与滞胀', years: '1973 — 1982', status: 'pending' },
        { id: 103, title: '美国社会价值观变化', years: '1960 — 1990', status: 'pending' },
        { id: 104, title: '卡特政府', years: '1977 — 1981', status: 'pending' },
        { id: 105, title: '里根革命', years: '1981 — 1989', status: 'pending' },
        { id: 106, title: '新自由主义与美国经济政策', years: '1980 — 2008', status: 'pending' },
        { id: 107, title: '美国与苏联的后期冷战', years: '1980 — 1991', status: 'pending' },
        { id: 108, title: '冷战结束', years: '1989 — 1991', status: 'pending' },
        { id: 109, title: '老布什与海湾战争', years: '1989 — 1993', status: 'pending' },
        { id: 110, title: '1990 年代的美国经济与社会', years: '1990 — 2000', status: 'pending' },
        { id: 111, title: '克林顿政府', years: '1993 — 2001', status: 'pending' },
        { id: 112, title: '全球化与美国经济', years: '1990 — 2010', status: 'pending' },
        { id: 113, title: '互联网革命与信息社会', years: '1990 — 2010', status: 'pending' }
      ]
    },
    {
      id: 9, roman: '第九篇', title: '21 世纪美国', period: '2001 — 至今',
      summary: '九一一事件开启反恐时代，金融危机暴露制度裂缝，奥巴马、特朗普时期的社会分歧与中美战略竞争，把美国带入新的不确定。',
      chapters: [
        { id: 114, title: '2001 年九一一事件', years: '2001', status: 'pending' },
        { id: 115, title: '反恐战争', years: '2001 — 2021', status: 'pending' },
        { id: 116, title: '阿富汗战争与伊拉克战争', years: '2001 — 2021', status: 'pending' },
        { id: 117, title: '小布什政府', years: '2001 — 2009', status: 'pending' },
        { id: 118, title: '2008 年金融危机', years: '2007 — 2009', status: 'pending' },
        { id: 119, title: '奥巴马与美国政治变化', years: '2009 — 2017', status: 'pending' },
        { id: 120, title: '美国医疗改革与社会政策', years: '2010 — 2017', status: 'pending' },
        { id: 121, title: '美国种族问题的新发展', years: '2000 — 至今', status: 'pending' },
        { id: 122, title: '特朗普与美国政治极化', years: '2015 — 至今', status: 'pending' },
        { id: 123, title: '美国与中国的战略竞争', years: '2010 — 至今', status: 'pending' },
        { id: 124, title: '美国社会结构与经济不平等', years: '1980 — 至今', status: 'pending' },
        { id: 125, title: '21 世纪美国的国际地位与未来挑战', years: '2020 — 至今', status: 'pending' }
      ]
    }
  ];

  // 十个历史专题索引
  var THEMES = [
    { id: 'constitution', title: '美国宪政制度', desc: '宪法形成、联邦制、三权分立、总统制度、国会、最高法院与联邦—州关系。', chapters: [18, 19, 20, 21, 22] },
    { id: 'freedom', title: '美国民主与自由思想', desc: '独立革命的思想基础、自由主义、共和主义、民主扩张及其现实矛盾。', chapters: [8, 13, 20, 24, 31, 95] },
    { id: 'slavery', title: '奴隶制与种族问题', desc: '奴隶制形成、内战、重建、种族隔离、民权运动与当代种族问题。', chapters: [7, 34, 35, 41, 45, 46, 47, 48, 95, 96, 121] },
    { id: 'capitalism', title: '美国资本主义发展', desc: '工业化、垄断资本、金融资本、工人运动、福利政策、经济危机与全球化。', chapters: [32, 50, 51, 52, 53, 54, 74, 106, 112, 118] },
    { id: 'expansion', title: '美国对外扩张', desc: '从大陆扩张到海外扩张，与拉丁美洲、欧洲、亚洲的关系。', chapters: [25, 27, 28, 29, 30, 60, 61, 62, 99] },
    { id: 'superpower', title: '美国成为世界超级大国', desc: '两次世界大战、冷战、美元体系、国际组织与联盟体系。', chapters: [78, 79, 82, 83, 84, 85, 86, 87, 88, 93] },
    { id: 'parties', title: '美国政治思想与政党演变', desc: '联邦党、民主共和党、民主党、共和党的历史演变与自由派—保守派分歧。', chapters: [23, 31, 105, 106, 122] },
    { id: 'movements', title: '美国社会运动', desc: '废奴、妇女、工人、民权、反战及其他社会改革运动。', chapters: [34, 54, 95, 96, 97] },
    { id: 'china', title: '美国与中国关系', desc: '早期贸易、门户开放、二战合作、冷战对抗、关系正常化到战略竞争。', chapters: [60, 99, 108, 123] },
    { id: 'polarization', title: '美国政治极化', desc: '党派分化、社会阶层变化、媒体环境与文化冲突的历史根源。', chapters: [103, 105, 122, 124] }
  ];

  // 人物索引（首批含第一篇相关人物；后续章节可继续扩充）
  var PEOPLE = [
    { id: 'columbus', name: '克里斯托弗·哥伦布', en: 'Christopher Columbus', years: '1451—1506', role: '热那亚航海家', desc: '1492 年抵达加勒比海，开启欧洲与美洲的持续接触。', chapters: [3, 4] },
    { id: 'cortes', name: '埃尔南·科尔特斯', en: 'Hernán Cortés', years: '1485—1547', role: '西班牙征服者', desc: '率军推翻阿兹特克帝国，建立西班牙统治墨西哥的基础。', chapters: [3, 4] },
    { id: 'pizarro', name: '弗朗西斯科·皮萨罗', en: 'Francisco Pizarro', years: '约1471—1541', role: '西班牙征服者', desc: '征服印加帝国，控制秘鲁。', chapters: [3, 4] },
    { id: 'cartier', name: '雅克·卡蒂亚', en: 'Jacques Cartier', years: '1491—1557', role: '法国航海家', desc: '1534 年起探索圣劳伦斯河，为法国在北美的主张奠基。', chapters: [3, 4] },
    { id: 'champlain', name: '塞缪尔·德·尚普兰', en: 'Samuel de Champlain', years: '约1567—1635', role: '法国殖民者', desc: '1608 年建立魁北克，被称为"新法兰西之父"。', chapters: [4] },
    { id: 'raleigh', name: '沃尔特·雷利', en: 'Walter Raleigh', years: '约1552—1618', role: '英国探险家', desc: '资助罗阿诺克殖民尝试，推动英国对北美的兴趣。', chapters: [4, 5] },
    { id: 'john-smith', name: '约翰·史密斯', en: 'John Smith', years: '1580—1631', role: '詹姆斯敦领导者', desc: '弗吉尼亚公司殖民地的军事与行政领导者。', chapters: [5] },
    { id: 'powhatan', name: '波瓦坦', en: 'Powhatan', years: '约1547—1618', role: '波瓦坦联盟首领', desc: '弗吉尼亚地区原住民联盟的统治者，与詹姆斯敦殖民者互动。', chapters: [1, 2, 5] },
    { id: 'pocahontas', name: '波卡洪塔斯', en: 'Pocahontas', years: '约1595—1617', role: '原住民女性', desc: '波瓦坦之女，与约翰·罗尔夫结婚，成为英美文学中的文化符号。', chapters: [5] },
    { id: 'winthrop', name: '约翰·温思罗普', en: 'John Winthrop', years: '1588—1649', role: '马萨诸塞殖民地总督', desc: '提出"山巅之城"的清教徒共同体理念。', chapters: [5, 8] },
    { id: 'williams', name: '罗杰·威廉姆斯', en: 'Roger Williams', years: '约1603—1683', role: '宗教异议者', desc: '因主张宗教宽容被马萨诸塞驱逐，创建罗得岛殖民地。', chapters: [5, 8] },
    { id: 'hutchinson', name: '安妮·哈钦森', en: 'Anne Hutchinson', years: '1591—1643', role: '宗教异议者', desc: '挑战马萨诸塞清教权威，成为宗教自由争论的关键人物。', chapters: [5, 8] },
    { id: 'penn', name: '威廉·佩恩', en: 'William Penn', years: '1644—1718', role: '宾夕法尼亚创建者', desc: '贵格会领袖，建立以宗教宽容与契约政治著称的宾夕法尼亚。', chapters: [5, 8] },
    { id: 'meath', name: '梅托科姆（菲利普王）', en: 'Metacom / King Philip', years: '约1638—1676', role: '万帕诺亚格首领', desc: '领导"菲利普王战争"反抗英国殖民扩张。', chapters: [2, 9] },
    { id: 'georgeIII', name: '乔治三世', en: 'George III', years: '1738—1820', role: '英国国王', desc: '1760 年起在位，其对殖民地的政策引发北美反抗。', chapters: [9, 10] },
    { id: 'franklin', name: '本杰明·富兰克林', en: 'Benjamin Franklin', years: '1706—1790', role: '殖民地政治家、印刷商', desc: '宾夕法尼亚政治领袖，跨殖民地合作的推动者。', chapters: [8, 9, 10] }
  ];

  // 事件索引
  var EVENTS = [
    { id: 'e1492', year: '1492', name: '哥伦布抵达加勒比海', chapters: [3] },
    { id: 'e1519', year: '1519', name: '科尔特斯进军阿兹特克', chapters: [3, 4] },
    { id: 'e1534', year: '1534', name: '卡蒂亚探索圣劳伦斯河', chapters: [3, 4] },
    { id: 'e1607', year: '1607', name: '詹姆斯敦建立', chapters: [4, 5] },
    { id: 'e1608', year: '1608', name: '魁北克建立', chapters: [4] },
    { id: 'e1619', year: '1619', name: '首批非洲奴隶抵达弗吉尼亚', chapters: [7] },
    { id: 'e1620', year: '1620', name: '"五月花号"抵达与《五月花号公约》', chapters: [5, 8] },
    { id: 'e1630', year: '1630', name: '马萨诸塞湾殖民地建立', chapters: [5] },
    { id: 'e1636', year: '1636', name: '罗得岛建立 / 哈佛学院创立', chapters: [5] },
    { id: 'e1664', year: '1664', name: '英国夺取新阿姆斯特丹', chapters: [4, 5] },
    { id: 'e1675', year: '1675', name: '菲利普王战争爆发', chapters: [2, 9] },
    { id: 'e1682', year: '1682', name: '宾夕法尼亚建立', chapters: [5] },
    { id: 'e1732', year: '1732', name: '佐治亚殖民地建立', chapters: [5] },
    { id: 'e1754', year: '1754', name: '法印战争爆发', chapters: [9] },
    { id: 'e1763', year: '1763', name: '《巴黎和约》与《皇家公告》', chapters: [9, 10] },
    { id: 'e1765', year: '1765', name: '《印花税法》危机', chapters: [10] },
    { id: 'e1770', year: '1770', name: '波士顿惨案', chapters: [10] },
    { id: 'e1773', year: '1773', name: '波士顿倾茶事件', chapters: [10] }
  ];

  // 首页时间轴（全局 gross 节点；点"进入"跳到对应章节，pending 节点也保留以展示完整脉络）
  var TIMELINE = [
    { year: '约前12000', label: '人类迁入美洲', chapter: 1 },
    { year: '1492', label: '哥伦布抵达美洲', chapter: 3 },
    { year: '1519', label: '西班牙征服阿兹特克', chapter: 3 },
    { year: '1607', label: '詹姆斯敦建立', chapter: 5 },
    { year: '1620', label: '五月花号与公约', chapter: 5 },
    { year: '1619', label: '奴隶制进入北美', chapter: 7 },
    { year: '1754', label: '法印战争', chapter: 9 },
    { year: '1763', label: '英国独占北美', chapter: 9 },
    { year: '1775', label: '独立战争爆发', chapter: 11 },
    { year: '1783', label: '独立获得承认', chapter: 17 },
    { year: '1787', label: '联邦宪法制定', chapter: 19 },
    { year: '1803', label: '路易斯安那购地', chapter: 25 },
    { year: '1861', label: '南北战争爆发', chapter: 39 },
    { year: '1865', label: '奴隶制废除', chapter: 43 },
    { year: '1898', label: '美西战争', chapter: 61 },
    { year: '1929', label: '经济大危机', chapter: 71 },
    { year: '1933', label: '罗斯福新政', chapter: 74 },
    { year: '1941', label: '珍珠港事件', chapter: 77 },
    { year: '1945', label: '二战结束', chapter: 82 },
    { year: '1947', label: '冷战开始', chapter: 85 },
    { year: '1954', label: '民权运动兴起', chapter: 95 },
    { year: '1972', label: '尼克松访华', chapter: 99 },
    { year: '1989', label: '冷战结束', chapter: 108 },
    { year: '2001', label: '九一一事件', chapter: 114 },
    { year: '2008', label: '金融危机', chapter: 118 }
  ];

  // 疆域变化示意（数据驱动，供首页 SVG 示意使用；非精确地理边界）
  var TERRITORY = [
    { year: '1763', label: '英国北美殖民地', desc: '十三个殖民地沿大西洋分布，西以阿巴拉契亚山为界。', shape: 'thirteen' },
    { year: '1803', label: '路易斯安那购地', desc: '从法国购得密西西比河流域，领土近乎翻倍。', shape: 'louisiana' },
    { year: '1819', label: '佛罗里达', desc: '从西班牙取得佛罗里达。', shape: 'florida' },
    { year: '1845', label: '得克萨斯', desc: '吞并得克萨斯共和国。', shape: 'texas' },
    { year: '1848', label: '墨西哥割让地', desc: '墨西哥战争后取得西南部大片领土。', shape: 'mexican' },
    { year: '1867', label: '阿拉斯加', desc: '从俄国购得阿拉斯加。', shape: 'alaska' }
  ];

  root.US_HISTORY = {
    site: SITE,
    books: BOOKS,
    volumes: VOLUMES,
    themes: THEMES,
    people: PEOPLE,
    events: EVENTS,
    timeline: TIMELINE,
    territory: TERRITORY,
    // 工具方法
    allChapters: function () {
      var out = [];
      VOLUMES.forEach(function (v) { v.chapters.forEach(function (c) { out.push(c); }); });
      return out;
    },
    getChapter: function (id) {
      var found = null;
      VOLUMES.forEach(function (v) {
        v.chapters.forEach(function (c) { if (c.id === Number(id)) found = { meta: c, volume: v }; });
      });
      return found;
    },
    volumeOf: function (id) {
      var found = null;
      VOLUMES.forEach(function (v) {
        v.chapters.forEach(function (c) { if (c.id === Number(id)) found = v; });
      });
      return found;
    }
  };
})(window);
