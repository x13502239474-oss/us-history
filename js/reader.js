/* 阅读页逻辑 */
(function (root) {
  'use strict';
  var D = root.US_HISTORY, C = root.Core, esc = C.escapeHtml;
  C.renderHeader('reader');

  var params = new URLSearchParams(location.search);
  var id = Number(params.get('ch')) || 1;
  var entry = D.getChapter(id);
  var ch = root.CHAPTERS && root.CHAPTERS[id];

  if (!entry || !ch || entry.meta.status !== 'ready') {
    document.getElementById('articleRoot').innerHTML =
      '<div class="article-head"><h1>章节尚未撰写</h1></div>' +
      '<p class="muted">该章尚无正文，未设空壳页面。请从目录选择已完成的章节阅读。</p>' +
      '<p><a href="toc.html" style="color:var(--navy-2)">返回目录 →</a></p>';
    return;
  }

  var meta = entry.meta, vol = entry.volume;
  var prev = id > 1 ? id - 1 : null;
  var next = id < 125 ? id + 1 : null;
  // 只链接确实已撰写的相邻章节
  var prevReady = prev && D.getChapter(prev) && D.getChapter(prev).meta.status === 'ready' ? prev : null;
  var nextReady = next && D.getChapter(next) && D.getChapter(next).meta.status === 'ready' ? next : null;

  // 定位上一已撰写/下一已撰写（在已撰写序列中跳）
  var readyIds = D.allChapters().filter(function (c) { return c.status === 'ready'; }).map(function (c) { return c.id; });
  var pos = readyIds.indexOf(id);
  var jumpPrev = pos > 0 ? readyIds[pos - 1] : null;
  var jumpNext = pos < readyIds.length - 1 ? readyIds[pos + 1] : null;

  // 记进度
  C.store.setLast(id);

  // 渲染正文
  var head =
    '<div class="article-head">' +
      '<div class="ah-crumb"><a href="toc.html">目录</a> / ' + esc(vol.roman) + ' ' + esc(vol.title) + ' / 第 ' + id + ' 章</div>' +
      '<h1>' + esc(ch.title) + '</h1>' +
      '<div class="ah-years">' + esc(meta.years) + '</div>' +
      '<div class="ah-meta"><span>' + D.site.edition + '</span>' +
      '<span>约 ' + (ch.wordCount || '—') + ' 字</span>' +
      '<span id="favStatus"></span></div>' +
    '</div>';

  var body = '<div class="article-body" id="articleBody">';
  if (ch.lead) body += '<p class="lead-para">' + esc(ch.lead) + '</p>';
  (ch.sections || []).forEach(function (sec, i) {
    body += '<h2 id="sec' + i + '">' + esc(sec.heading) + '</h2>';
    (sec.paragraphs || []).forEach(function (p) {
      body += '<p>' + linkify(p) + '</p>';
    });
  });
  if (ch.editorNote) {
    body += '<div class="editor-note"><b>编撰说明　</b>' + esc(ch.editorNote) + '</div>';
  }
  body += '</div>';

  var nav = '<div class="article-foot"><div class="chapter-nav">';
  if (jumpPrev) {
    var pc = D.getChapter(jumpPrev);
    nav += '<a href="' + C.chapterUrl(jumpPrev) + '"><div class="cn-box cn-prev"><div class="cn-label">← 上一章（第 ' + jumpPrev + ' 章）</div><div class="cn-title">' + esc(pc.meta.title) + '</div></div></a>';
  } else { nav += '<span></span>'; }
  if (jumpNext) {
    var nc = D.getChapter(jumpNext);
    nav += '<a href="' + C.chapterUrl(jumpNext) + '"><div class="cn-box cn-next"><div class="cn-label">下一章（第 ' + jumpNext + ' 章）→</div><div class="cn-title">' + esc(nc.meta.title) + '</div></div></a>';
  } else { nav += '<span></span>'; }
  nav += '</div><div style="margin-top:18px"><a href="toc.html" style="font-size:12px;color:var(--navy-2)">返回完整目录 →</a></div></div>';

  document.getElementById('articleRoot').innerHTML = head + body + nav;

  // 把正文中的「第NN章」转为链接（仅在引用已撰写章节时）
  function linkify(text) {
    return esc(text).replace(/第(\d+)章/g, function (m, num) {
      var n = Number(num), target = D.getChapter(n);
      if (target && target.meta.status === 'ready') {
        return '<a class="ch-link" href="' + C.chapterUrl(n) + '">第' + n + '章</a>';
      }
      return m;
    });
  }

  // 侧栏
  var asideHtml =
    '<h4>本篇</h4><div class="ra-volume">' + esc(vol.roman) + ' ' + esc(vol.title) + '</div>' +
    '<h4>本章目录</h4><ul class="toc-mini" id="tocMini">' +
    (ch.sections || []).map(function (s, i) { return '<li data-i="' + i + '"><a href="#sec' + i + '">' + esc(s.heading) + '</a></li>'; }).join('') +
    '</ul><div class="aside-block"><h4>本章涉及</h4>' +
    ((ch.people || []).map(function (p) { return '<a href="indexes.html">' + esc(p) + '</a>'; }).join('')) +
    ((ch.events || []).map(function (e) { return '<a href="indexes.html">' + esc(e) + '</a>'; }).join('')) +
    '</div><div class="aside-block"><h4>阅读工具</h4><div class="aside-tools">' +
    '<button id="asideFav">☆ 收藏本章</button><button id="asideSet">A 阅读设置</button>' +
    '<button id="asideToc">目录</button><button id="asideTop">回到顶部</button>' +
    '</div></div>';
  document.getElementById('readerAside').innerHTML = asideHtml;

  // 收藏状态
  function refreshFav() {
    var isFav = C.store.isFav(id);
    var label = isFav ? '★ 已收藏' : '☆ 收藏本章';
    var af = document.getElementById('asideFav'), rf = document.getElementById('railFav');
    if (af) { af.textContent = label; af.classList.toggle('active', isFav); }
    if (rf) rf.textContent = isFav ? '★' : '☆';
    var fs = document.getElementById('favStatus');
    if (fs) fs.textContent = isFav ? '已收藏' : '';
  }
  function toggleFav() { C.store.toggleFav(id); refreshFav(); }
  refreshFav();
  ['asideFav', 'railFav'].forEach(function (bid) {
    var el = document.getElementById(bid); if (el) el.addEventListener('click', toggleFav);
  });

  // 设置抽屉
  var panel = document.getElementById('settingsPanel'), ov = document.getElementById('drawerOverlay');
  function openSet() { panel.classList.add('open'); ov.classList.add('show'); syncSet(); }
  function closeSet() { panel.classList.remove('open'); ov.classList.remove('show'); }
  ['asideSet', 'railSet'].forEach(function (bid) {
    var el = document.getElementById(bid); if (el) el.addEventListener('click', openSet);
  });
  ov.addEventListener('click', closeSet);

  var s = C.store.getSettings();
  function syncSet() {
    s = C.store.getSettings();
    document.getElementById('setSize').value = s.size;
    document.getElementById('setLine').value = s.line;
    document.getElementById('setWidth').value = s.width;
    document.getElementById('sizeVal').textContent = s.size + 'px';
    document.getElementById('lineVal').textContent = s.line;
    document.getElementById('widthVal').textContent = s.width + 'px';
  }
  function bind(bid, key) {
    document.getElementById(bid).addEventListener('input', function () {
      var val = Number(this.value);
      var patch = {};
      patch[key] = val;
      C.store.saveSettings(patch);
      C.applySettings(); syncSet();
    });
  }
  bind('setSize', 'size'); bind('setLine', 'line'); bind('setWidth', 'width');
  document.getElementById('resetSettings').addEventListener('click', function () {
    C.store.saveSettings({ size: 18, line: 1.9, width: 720 }); C.applySettings(); syncSet();
  });

  function toTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  ['asideTop', 'railTop'].forEach(function (bid) {
    var el = document.getElementById(bid); if (el) el.addEventListener('click', toTop);
  });
  ['asideToc', 'railToc'].forEach(function (bid) {
    var el = document.getElementById(bid); if (el) el.addEventListener('click', function () {
      if (window.innerWidth <= 760) document.getElementById('readerAside').classList.toggle('open');
      else toTop();
    });
  });
  var mt = document.getElementById('mobileTocBtn');
  if (mt) mt.addEventListener('click', function () { document.getElementById('readerAside').classList.toggle('open'); });

  // 进度与滚动位置记忆
  var article = document.getElementById('articleBody');
  var savedKey = 'us_hist_scroll_' + id;
  var savedPos = 0;
  try { savedPos = Number(root.localStorage.getItem(savedKey)) || 0; } catch (e) {}
  var restored = false;
  function onScroll() {
    var top = window.scrollY || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (article) {
      var rect = article.getBoundingClientRect();
      var artTop = rect.top + window.scrollY, artH = article.offsetHeight;
      var ratio = artH > 0 ? Math.max(0, Math.min(1, (window.scrollY - artTop + window.innerHeight * 0.5) / artH)) : 0;
      C.store.setProgress(id, ratio);
    }
    try { root.localStorage.setItem(savedKey, String(top)); } catch (e) {}
    // 高亮当前目录
    var items = document.querySelectorAll('#tocMini li');
    var best = -1, bestDist = Infinity;
    for (var i = 0; i < items.length; i++) {
      var sec = document.getElementById('sec' + i);
      if (!sec) continue;
      var d = Math.abs(sec.getBoundingClientRect().top - 120);
      if (d < bestDist) { bestDist = d; best = i; }
    }
    items.forEach(function (li, i) { li.classList.toggle('active', i === best); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', function () {
    if (savedPos > 0 && !restored) {
      restored = true;
      setTimeout(function () { window.scrollTo(0, savedPos); }, 60);
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSet(); });
})(window);
