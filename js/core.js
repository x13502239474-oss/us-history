/* ============================================================
 * 核心脚本：本地存储、阅读设置、搜索、公共 UI
 * 不依赖任何后端；所有记录保存在浏览器 localStorage。
 * ============================================================ */
(function (root) {
  'use strict';

  var KEY = 'us_history_reader_v1';

  function defaults() {
    return {
      lastChapter: 1,
      progress: {},      // { chapterId: 0..1 }
      favorites: [],     // chapterId[]
      settings: { size: 18, line: 1.9, width: 720 },
      visited: []        // chapterId[]
    };
  }

  function read() {
    try {
      var raw = root.localStorage.getItem(KEY);
      if (!raw) return defaults();
      var data = JSON.parse(raw);
      var d = defaults();
      return {
        lastChapter: data.lastChapter || d.lastChapter,
        progress: data.progress || d.progress,
        favorites: Array.isArray(data.favorites) ? data.favorites : d.favorites,
        settings: Object.assign({}, d.settings, data.settings || {}),
        visited: Array.isArray(data.visited) ? data.visited : d.visited
      };
    } catch (e) { return defaults(); }
  }

  function write(state) {
    try { root.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  var store = {
    get: function () { return read(); },
    update: function (fn) { var s = read(); fn(s); write(s); return s; },
    setLast: function (id) { return store.update(function (s) { s.lastChapter = id; }); },
    setProgress: function (id, ratio) {
      return store.update(function (s) {
        var prev = s.progress[id] || 0;
        s.progress[id] = Math.max(prev, Math.min(1, ratio));
        if (s.visited.indexOf(id) === -1) s.visited.push(id);
        s.lastChapter = id;
      });
    },
    toggleFav: function (id) {
      var result = false;
      store.update(function (s) {
        var i = s.favorites.indexOf(id);
        if (i === -1) { s.favorites.push(id); result = true; }
        else { s.favorites.splice(i, 1); result = false; }
      });
      return result;
    },
    isFav: function (id) { return read().favorites.indexOf(id) !== -1; },
    getSettings: function () { return read().settings; },
    saveSettings: function (obj) {
      return store.update(function (s) { s.settings = Object.assign({}, s.settings, obj); });
    },
    overallProgress: function () {
      var s = read();
      var ready = root.US_HISTORY.allChapters().filter(function (c) { return c.status === 'ready'; });
      var sum = 0;
      ready.forEach(function (c) { sum += (s.progress[c.id] || 0); });
      return { done: sum, total: ready.length, percent: ready.length ? Math.round(sum / ready.length * 100) : 0 };
    }
  };

  // 应用阅读设置到 CSS 变量
  function applySettings() {
    var s = store.getSettings();
    var r = document.documentElement;
    r.style.setProperty('--reader-size', s.size + 'px');
    r.style.setProperty('--reader-line', s.line);
    r.style.setProperty('--reader-width', s.width + 'px');
  }

  function chapterUrl(id) { return 'reader.html?ch=' + id; }

  // 公共：渲染顶部导航
  function renderHeader(active) {
    var links = [
      { key: 'home', href: 'index.html', label: '首页' },
      { key: 'toc', href: 'toc.html', label: '目录' },
      { key: 'themes', href: 'themes.html', label: '专题' },
      { key: 'index', href: 'indexes.html', label: '人物·事件' },
      { key: 'about', href: 'about.html', label: '编撰说明' }
    ];
    var html = '<header class="site-header"><div class="wrap">' +
      '<a class="brand" href="index.html"><span class="brand-mark">美国史</span>' +
      '<span class="brand-sub">理想与现实之间 · 数字读物</span></a>' +
      '<div class="nav-spacer"></div>' +
      '<nav class="nav-links" id="navLinks">' +
      links.map(function (l) {
        return '<a href="' + l.href + '"' + (active === l.key ? ' class="active"' : '') + '>' + l.label + '</a>';
      }).join('') +
      '</nav>' +
      '<button class="icon-btn" id="searchBtn" aria-label="搜索">搜索</button>' +
      '<button class="icon-btn mobile-menu-btn" id="menuBtn" aria-label="菜单">☰</button>' +
      '</div></header>';
    document.body.insertAdjacentHTML('afterbegin', html);

    var menuBtn = document.getElementById('menuBtn');
    if (menuBtn) menuBtn.addEventListener('click', function () {
      document.getElementById('navLinks').classList.toggle('open');
    });

    // 搜索面板
    var panel = document.createElement('div');
    panel.className = 'search-panel';
    panel.id = 'searchPanel';
    panel.innerHTML = '<div class="search-inner"><div class="search-input-row">' +
      '<input type="text" id="searchInput" placeholder="搜索章节标题与正文关键字…" autocomplete="off">' +
      '<button class="icon-btn" id="searchClose">关闭</button></div>' +
      '<div class="search-results" id="searchResults"></div></div>';
    document.body.appendChild(panel);
    var ov = document.createElement('div');
    ov.className = 'overlay'; ov.id = 'searchOverlay';
    document.body.appendChild(ov);

    function openSearch() {
      panel.classList.add('open'); ov.classList.add('show');
      setTimeout(function () { document.getElementById('searchInput').focus(); }, 80);
    }
    function closeSearch() { panel.classList.remove('open'); ov.classList.remove('show'); }
    document.getElementById('searchBtn').addEventListener('click', openSearch);
    document.getElementById('searchClose').addEventListener('click', closeSearch);
    ov.addEventListener('click', closeSearch);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSearch();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    });

    // 搜索索引：标题 + 正文段落 + 人物/事件名
    var index = [];
    if (root.CHAPTERS) {
      Object.keys(root.CHAPTERS).forEach(function (k) {
        var ch = root.CHAPTERS[k];
        var text = ch.title + ' ' + (ch.sections || []).map(function (s) {
          return s.heading + ' ' + s.paragraphs.join(' ');
        }).join(' ');
        index.push({ id: ch.id, title: ch.title, volume: ch.volume, text: text });
      });
    }
    var input = document.getElementById('searchInput');
    var box = document.getElementById('searchResults');
    var timer;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      var q = input.value.trim();
      timer = setTimeout(function () {
        if (!q) { box.innerHTML = ''; return; }
        var hits = [];
        index.forEach(function (it) {
          var pos = it.text.indexOf(q);
          if (pos !== -1 || it.title.indexOf(q) !== -1) {
            var p = pos === -1 ? 0 : pos;
            var snip = it.text.slice(Math.max(0, p - 40), p + 90).replace(/\s+/g, ' ');
            hits.push({ it: it, snip: snip });
          }
        });
        if (!hits.length) {
          box.innerHTML = '<div class="search-empty">未找到匹配。当前仅已撰写章节可检索；其余章节完成后自动加入索引。</div>';
          return;
        }
        box.innerHTML = hits.map(function (h) {
          return '<div class="search-result"><a class="sr-title" href="' + chapterUrl(h.it.id) + '">' +
            h.it.title + '</a><div class="sr-snippet">…' + escapeHtml(h.snip) + '…</div></div>';
        }).join('');
      }, 180);
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderFooter() {
    var html = '<footer class="site-footer"><div class="wrap">' +
      '<div class="foot-title">关于这部数字读物</div>' +
      '<div>以方纳《美国史：理想与现实》为阅读主线，以《美国通史》六卷本深化各时期史实，以资中筠《20 世纪的美国》补充近现代专题。全部正文为重新撰写的叙述，不复制原书文字。</div>' +
      '<div style="margin-top:8px">阅读记录、收藏与设置仅保存在你的浏览器本地。' +
      '<a href="about.html">查看完整编撰说明与资料来源 →</a></div>' +
      '</div></footer>';
    document.body.insertAdjacentHTML('beforeend', html);
  }

  root.Core = {
    store: store,
    applySettings: applySettings,
    chapterUrl: chapterUrl,
    renderHeader: renderHeader,
    renderFooter: renderFooter,
    escapeHtml: escapeHtml
  };

  applySettings();
})(window);
