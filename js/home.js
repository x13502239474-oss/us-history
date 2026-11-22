/* 首页渲染逻辑 */
(function (root) {
  'use strict';
  var D = root.US_HISTORY, C = root.Core;
  C.renderHeader('home');
  C.renderFooter();

  // 继续阅读
  var state = C.store.get();
  var last = D.getChapter(state.lastChapter);
  var box = document.getElementById('continueBox');
  if (last && last.meta.status === 'ready') {
    box.innerHTML = '<a class="continue-card" href="' + C.chapterUrl(last.meta.id) + '">' +
      '<div><div class="c-label">继续阅读 · 上次读到第 ' + last.meta.id + ' 章</div>' +
      '<div class="c-title">' + last.meta.title + '</div></div><span class="c-arrow">→</span></a>';
  }

  // 九篇导航
  document.getElementById('periodGrid').innerHTML = D.volumes.map(function (v) {
    var ready = v.chapters.filter(function (c) { return c.status === 'ready'; }).length;
    return '<a class="period-item" href="toc.html#v' + v.id + '">' +
      '<span class="p-num">' + v.roman + '</span>' +
      '<h3>' + v.title + '</h3>' +
      '<span class="p-years">' + v.period + ' · ' + ready + '/' + v.chapters.length + ' 章已撰写</span>' +
      '<p>' + v.summary + '</p></a>';
  }).join('');

  // 时间轴
  document.getElementById('timeline').innerHTML = D.timeline.map(function (t) {
    var ch = D.getChapter(t.chapter);
    var ready = ch && ch.meta.status === 'ready';
    var label = ready
      ? '<a href="' + C.chapterUrl(t.chapter) + '">' + t.label + '</a>'
      : '<span class="pending-label" title="该章节尚未撰写">' + t.label + '</span>';
    return '<div class="tl-row' + (ready ? ' ready' : '') + '">' +
      '<span class="tl-year">' + t.year + '</span><span class="tl-dot"></span>' +
      '<span class="tl-label">' + label + '</span></div>';
  }).join('');

  // 疆域变化示意（SVG 抽象示意，按所选阶段绘制叠加色块）
  var territoryIdx = 0;
  function drawTerritory(idx) {
    var item = D.territory[idx];
    var layers = D.territory.slice(0, idx + 1).map(function (t) { return t.shape; });
    var colors = { thirteen: '#1b3a5c', louisiana: '#2b5580', florida: '#4a7599', texas: '#6c93ac', mexican: '#8ba9bb', alaska: '#a9bdc9' };
    var rects = [
      { shape: 'alaska', x: 8, y: 8, w: 52, h: 24, label: '阿拉斯加' },
      { shape: 'thirteen', x: 296, y: 62, w: 78, h: 70, label: '十三州' },
      { shape: 'florida', x: 300, y: 134, w: 30, h: 30, label: '佛罗里达' },
      { shape: 'louisiana', x: 164, y: 60, w: 132, h: 96, label: '路易斯安那' },
      { shape: 'texas', x: 150, y: 156, w: 62, h: 54, label: '得克萨斯' },
      { shape: 'mexican', x: 90, y: 158, w: 60, h: 72, label: '西南部' }
    ];
    var parts = rects.map(function (r) {
      var active = layers.indexOf(r.shape) !== -1;
      return '<rect x="' + r.x + '" y="' + r.y + '" width="' + r.w + '" height="' + r.h + '" rx="3" ' +
        'fill="' + (active ? colors[r.shape] : '#e9e5df') + '" stroke="#fff" stroke-width="1.5"/>' +
        '<text x="' + (r.x + r.w / 2) + '" y="' + (r.y + r.h / 2 + 4) + '" text-anchor="middle" ' +
        'font-size="10" fill="' + (active ? '#fff' : '#9a9ea5') + '">' + r.label + '</text>';
    }).join('');
    document.getElementById('territoryMap').innerHTML =
      '<svg viewBox="0 0 400 250" role="img" aria-label="美国领土扩张示意">' +
      '<rect x="0" y="0" width="400" height="250" fill="#f5f3ef"/>' + parts +
      '<text x="200" y="242" text-anchor="middle" font-size="11" fill="#6b7078">' + item.year + ' · ' + item.label + '</text>' +
      '</svg>';
    Array.prototype.forEach.call(document.querySelectorAll('.t-item'), function (el, i) {
      el.classList.toggle('active', i === idx);
    });
  }
  document.getElementById('territoryList').innerHTML = D.territory.map(function (t, i) {
    return '<div class="t-item' + (i === 0 ? ' active' : '') + '" data-i="' + i + '">' +
      '<div class="t-year">' + t.year + '</div><div class="t-name">' + t.label + '</div>' +
      '<div class="t-desc">' + t.desc + '</div></div>';
  }).join('');
  Array.prototype.forEach.call(document.querySelectorAll('.t-item'), function (el) {
    el.addEventListener('click', function () { territoryIdx = Number(el.dataset.i); drawTerritory(territoryIdx); });
  });
  drawTerritory(0);

  // 人物与事件小卡
  document.getElementById('peopleChips').innerHTML = D.people.slice(0, 12).map(function (p) {
    var readyIds = p.chapters.filter(function (id) {
      var ch = D.getChapter(id); return ch && ch.meta.status === 'ready';
    });
    if (!readyIds.length) return '';
    return '<a class="chip" href="' + C.chapterUrl(readyIds[0]) + '">' + p.name + '<span class="chip-sub">' + p.years + '</span></a>';
  }).join('');
  document.getElementById('eventChips').innerHTML = D.events.map(function (e) {
    var readyIds = e.chapters.filter(function (id) {
      var ch = D.getChapter(id); return ch && ch.meta.status === 'ready';
    });
    if (!readyIds.length) return '';
    return '<a class="chip" href="' + C.chapterUrl(readyIds[0]) + '">' + e.year + ' ' + e.name + '</a>';
  }).join('');

  // 阅读进度
  var p = C.store.overallProgress();
  document.getElementById('progressText').textContent =
    '已撰写章节 ' + p.total + ' 章 · 累计阅读进度 ' + p.percent + '% · 收藏 ' + state.favorites.length + ' 章';
  document.getElementById('progressBar').style.width = p.percent + '%';
})(window);
