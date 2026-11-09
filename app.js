/* Дом барнхаус — 3D-проход по кадрам. Данные (карта кадров, комнаты, смета) вписаны ниже,
   поэтому сайт открывается двойным щелчком по index.html. */
'use strict';
var DATA = {"fps": 15, "frames": 922, "rooms": [{"id": "0", "name": "Крыльцо", "area": null, "floor": 1, "start": 1, "end": 64}, {"id": "1.1", "name": "Тамбур", "area": 2.93, "floor": 1, "start": 65, "end": 102}, {"id": "1.2", "name": "Прихожая", "area": 9.65, "floor": 1, "start": 103, "end": 149}, {"id": "1.3", "name": "Холл", "area": 3.1, "floor": 1, "start": 150, "end": 165}, {"id": "1.8", "name": "Гостиная с лестничной зоной", "area": 25.04, "floor": 1, "start": 166, "end": 230}, {"id": "1.7", "name": "Столовая", "area": 18.59, "floor": 1, "start": 231, "end": 271}, {"id": "1.6", "name": "Кухня", "area": 11.35, "floor": 1, "start": 272, "end": 314}, {"id": "1.3", "name": "Холл", "area": 3.1, "floor": 1, "start": 315, "end": 361}, {"id": "L", "name": "Лестница", "area": null, "floor": 1, "start": 362, "end": 467}, {"id": "2.1", "name": "Холл 2 этажа с лестницей", "area": 6.69, "floor": 2, "start": 468, "end": 542}, {"id": "2.5", "name": "Спальня хозяев", "area": 19.32, "floor": 2, "start": 543, "end": 579}, {"id": "2.1", "name": "Холл 2 этажа с лестницей", "area": 6.69, "floor": 2, "start": 580, "end": 608}, {"id": "2.3", "name": "Спальня 2", "area": 12.15, "floor": 2, "start": 609, "end": 674}, {"id": "2.1", "name": "Холл 2 этажа с лестницей", "area": 6.69, "floor": 2, "start": 675, "end": 696}, {"id": "2.6", "name": "Гостевая спальня", "area": 11.78, "floor": 2, "start": 697, "end": 805}, {"id": "2.1", "name": "Холл 2 этажа с лестницей", "area": 6.69, "floor": 2, "start": 806, "end": 831}, {"id": "2.2", "name": "Кабинет", "area": 12.15, "floor": 2, "start": 832, "end": 862}, {"id": "2.1", "name": "Холл 2 этажа с лестницей", "area": 6.69, "floor": 2, "start": 863, "end": 893}, {"id": "2.4", "name": "Ванная", "area": 4.98, "floor": 2, "start": 894, "end": 922}]};
var PASSPORT = [{"id": "1.1", "name": "Тамбур", "floor": 1, "area": 2.93}, {"id": "1.2", "name": "Прихожая", "floor": 1, "area": 9.65}, {"id": "1.3", "name": "Холл", "floor": 1, "area": 3.1}, {"id": "1.4", "name": "С/у (гостевой)", "floor": 1, "area": 1.91}, {"id": "1.5", "name": "Тех. помещение", "floor": 1, "area": 3.24}, {"id": "1.6", "name": "Кухня", "floor": 1, "area": 11.35}, {"id": "1.7", "name": "Столовая", "floor": 1, "area": 18.59}, {"id": "1.8", "name": "Гостиная с лестничной зоной", "floor": 1, "area": 25.04}, {"id": "2.1", "name": "Холл 2 этажа с лестницей", "floor": 2, "area": 6.69}, {"id": "2.2", "name": "Кабинет", "floor": 2, "area": 12.15}, {"id": "2.3", "name": "Спальня 2", "floor": 2, "area": 12.15}, {"id": "2.4", "name": "Ванная", "floor": 2, "area": 4.98}, {"id": "2.5", "name": "Спальня хозяев", "floor": 2, "area": 19.32}, {"id": "2.6", "name": "Гостевая спальня", "floor": 2, "area": 11.78}];
var PALETTE = [{"name": "Известковый грейж", "hex": "#D8D0C1", "where": "стены всего дома, двери, гладкие потолки"}, {"name": "Оливковый известковый", "hex": "#66684F", "where": "столовая, спальня хозяев, низ стен гостевой"}, {"name": "Угольная штукатурка", "hex": "#353230", "where": "каминная стена"}, {"name": "Тёмный сланец", "hex": "#4A4744", "where": "санузлы, тамбур, прихожая, тех. помещение"}, {"name": "Чернёная сталь, матовая", "hex": "#1C1B1A", "where": "рельсы, ограждение, светильники, ручки"}, {"name": "Табачный дуб", "hex": "#5A3E2B", "where": "пол, ступени, столы, фасады кухни"}, {"name": "Старая амбарная доска", "hex": "#6E655B", "where": "потолки 1 этажа, балки, стены за кроватью"}, {"name": "Сосна под маслом", "hex": "#C8A57A", "where": "потолки второго этажа"}, {"name": "Кожа коньяк", "hex": "#8C4B24", "where": "диван, банкетки, рабочее кресло"}, {"name": "Белый «кабанчик»", "hex": "#EEEBE4", "where": "кухня, санузлы; затирка #3C3936"}, {"name": "Лён и терракота", "hex": "#B4704F", "where": "шторы, пледы, ковры"}];
var SMETA = {"region": "Москва (допущение)", "date": "2026-11-09", "rooms": {"1.1": 113890, "1.2": 436179, "1.3": 79298, "1.4": 203752, "1.5": 311971, "1.6": 1035476, "1.7": 930786, "1.8": 1524473, "2.1": 220144, "2.2": 604343, "2.3": 513382.0, "2.4": 362542, "2.5": 800154.0, "2.6": 497392.0, "Лестница": 360000, "Общее": 130000}, "cats": {"Отделка": 2749472, "Двери, лестница, балки": 1002090, "Кухня и техника": 835000, "Сантехника": 260600, "Мебель": 2525810.0, "Свет": 337810, "Текстиль и декор": 363000, "Прочее": 50000}, "reserve": 812378, "total": 8936160.0};

(function () {
  var N = DATA.frames;
  var PX_PER_FRAME = 14;            // длина прокрутки на один кадр
  var canvas = document.getElementById('view');
  var ctx = canvas.getContext('2d');
  var imgs = new Array(N + 1);
  var loaded = new Uint8Array(N + 2);
  var cur = 1, shown = 0;

  function src(f) { return 'frames/' + String(f).padStart(4, '0') + '.jpg'; }

  /* ---------- холст ---------- */
  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    shown = 0; draw();
  }
  function nearestLoaded(f) {
    if (loaded[f]) return f;
    for (var d = 1; d < N; d++) {
      if (f - d >= 1 && loaded[f - d]) return f - d;
      if (f + d <= N && loaded[f + d]) return f + d;
    }
    return 0;
  }
  function draw() {
    var f = nearestLoaded(cur);
    if (!f || f === shown) return;
    var im = imgs[f], cw = canvas.width, ch = canvas.height;
    var s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight);   // заполнить экран, как background-size: cover
    var w = im.naturalWidth * s, h = im.naturalHeight * s;
    ctx.drawImage(im, (cw - w) / 2, (ch - h) / 2, w, h);
    shown = f;
  }

  /* ---------- загрузка кадров: сначала каждый 4-й (экран загрузки), потом остальные ---------- */
  var first = [], rest = [];
  for (var f = 1; f <= N; f++) ((f - 1) % 4 === 0 || f === N ? first : rest).push(f);
  var pct = document.getElementById('pct'), lbar = document.getElementById('lbar'), loader = document.getElementById('loader');
  var doneFirst = 0;
  function load(list, onEach, done) {
    var i = 0, active = 0, LIM = 8;
    function next() {
      while (active < LIM && i < list.length) {
        (function (f) {
          var im = new Image(); active++;
          im.onload = im.onerror = function () {
            active--; if (im.naturalWidth) { imgs[f] = im; loaded[f] = 1; }
            onEach(f); if (i >= list.length && active === 0) done(); else next();
          };
          im.src = src(f);
        })(list[i++]);
      }
    }
    next();
  }
  load(first, function (f) {
    doneFirst++;
    var p = Math.round(doneFirst / first.length * 100);
    pct.textContent = p + '%'; lbar.style.width = p + '%';
    if (f === 1) draw();
  }, function () {
    loader.classList.add('done');
    shown = 0; draw();
    load(rest, function (f) { if (Math.abs(f - cur) < 3) { shown = 0; draw(); } }, function () {});
  });

  /* ---------- прокрутка ---------- */
  var spacer = document.getElementById('scroll');
  function setHeight() { spacer.style.height = (N * PX_PER_FRAME + window.innerHeight) + 'px'; }
  setHeight();
  function maxScroll() { return Math.max(1, document.documentElement.scrollHeight - window.innerHeight); }
  function frameToY(f) { return (f - 1) / (N - 1) * maxScroll(); }

  var lenis = null;
  var bar = document.getElementById('bar');
  function setFrame(f) {
    f = Math.max(1, Math.min(N, Math.round(f)));
    if (f !== cur) { cur = f; draw(); updateUI(); }
    bar.style.width = ((cur - 1) / (N - 1) * 100) + '%';
  }

  if (window.gsap && window.ScrollTrigger && window.Lenis) {
    gsap.registerPlugin(ScrollTrigger);
    lenis = new Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: true, syncTouchLerp: 0.08, touchMultiplier: 1.4 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    var state = { f: 1 };
    gsap.to(state, {
      f: N, ease: 'none',
      scrollTrigger: { trigger: spacer, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      onUpdate: function () { setFrame(state.f); }
    });
  } else {
    // без интернета (библиотеки не загрузились): своя плавная прокрутка
    var target = 1, smooth = 1;
    window.addEventListener('scroll', function () { target = 1 + window.scrollY / maxScroll() * (N - 1); }, { passive: true });
    (function tick() { smooth += (target - smooth) * 0.12; setFrame(smooth); requestAnimationFrame(tick); })();
  }
  function goFrame(f) {
    var y = frameToY(f);
    if (lenis) lenis.scrollTo(y, { duration: 1.6 }); else window.scrollTo({ top: y, behavior: 'smooth' });
  }

  /* ---------- комната, этаж ---------- */
  var card = document.getElementById('roomCard'), rid = document.getElementById('roomId'),
      rname = document.getElementById('roomName'), rarea = document.getElementById('roomArea');
  var floorBtns = document.querySelectorAll('[data-floor]');
  var lastRoom = null, hideT = null, hint = document.getElementById('hint');
  function segAt(f) {
    for (var i = 0; i < DATA.rooms.length; i++) { var r = DATA.rooms[i]; if (f >= r.start && f <= r.end) return r; }
    return DATA.rooms[0];
  }
  function fmtArea(a) { return a ? String(a).replace('.', ',') + ' м²' : ''; }
  function updateUI() {
    var r = segAt(cur);
    floorBtns.forEach(function (b) { b.classList.toggle('on', +b.dataset.floor === r.floor); });
    if (cur > 20) hint.style.opacity = 0;
    if (r !== lastRoom) {
      lastRoom = r;
      rid.textContent = (r.id && r.id.indexOf('.') > 0 ? r.id + ' · ' : '') + 'этаж ' + r.floor;
      rname.textContent = r.name;
      rarea.textContent = fmtArea(r.area);
      card.classList.add('show');
      clearTimeout(hideT);
      hideT = setTimeout(function () { card.classList.remove('show'); }, 2600);
    }
  }
  floorBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var fl = +b.dataset.floor;
      for (var i = 0; i < DATA.rooms.length; i++) if (DATA.rooms[i].floor === fl) { goFrame(DATA.rooms[i].start); break; }
    });
  });

  /* ---------- меню ---------- */
  var panel = document.getElementById('panel'), body = document.getElementById('panelBody');
  function money(v) { return Math.round(v).toLocaleString('ru-RU') + ' ₽'; }
  function firstSeg(id) {
    var best = null;
    DATA.rooms.forEach(function (r) { if (r.id === id && (!best || r.end - r.start > best.end - best.start)) best = r; });
    return best;
  }
  function holdFrame(seg) { return Math.round((seg.start + seg.end) / 2); }
  function roomsHTML() {
    var h = '<h2>Комнаты</h2><p class="sub">14 помещений по паспорту дома. Нажмите на комнату, чтобы перейти к ней в проходе.</p>';
    [1, 2].forEach(function (fl) {
      h += '<div class="floor-h">ЭТАЖ ' + fl + '</div><ul class="list">';
      PASSPORT.filter(function (r) { return r.floor === fl; }).forEach(function (r) {
        var seg = firstSeg(r.id);
        h += '<li><span class="num">' + r.id + '</span>' +
          (seg ? '<button data-frame="' + holdFrame(seg) + '">' + r.name + '</button>'
               : '<span>' + r.name + '<span class="off">не на маршруте прохода</span></span>') +
          '<span class="val">' + fmtArea(r.area) + '</span></li>';
      });
      h += '</ul>';
    });
    return h;
  }
  function materialsHTML() {
    var h = '<h2>Материалы</h2><p class="sub">Палитра дизайн-проекта v2 «тёплый амбар»: старое дерево, чёрная сталь, кожа, лён.</p>';
    PALETTE.forEach(function (p) {
      h += '<div class="sw"><i style="background:' + p.hex + '"></i><div>' + p.name + ' <small>' + p.where + ' · ' + p.hex + '</small></div></div>';
    });
    return h;
  }
  function smetaHTML() {
    var h = '<h2>Смета</h2><p class="sub">Смета v3, ' + SMETA.region + ', ' + SMETA.date + '. Суммы по комнатам и разделам.</p><ul class="list">';
    PASSPORT.forEach(function (r) {
      if (SMETA.rooms[r.id]) h += '<li><span class="num">' + r.id + '</span><span>' + r.name + '</span><span class="val">' + money(SMETA.rooms[r.id]) + '</span></li>';
    });
    Object.keys(SMETA.rooms).forEach(function (k) {
      if (!PASSPORT.some(function (r) { return r.id === k; })) h += '<li><span class="num"></span><span>' + k + '</span><span class="val">' + money(SMETA.rooms[k]) + '</span></li>';
    });
    h += '</ul><div class="floor-h">ПО РАЗДЕЛАМ</div><ul class="list">';
    Object.keys(SMETA.cats).forEach(function (k) { h += '<li><span class="num"></span><span>' + k + '</span><span class="val">' + money(SMETA.cats[k]) + '</span></li>'; });
    h += '<li><span class="num"></span><span>Резерв 10%</span><span class="val">' + money(SMETA.reserve) + '</span></li></ul>';
    h += '<div class="total"><span>Итого</span><b>' + money(SMETA.total) + '</b></div>';
    return h;
  }
  var menuBtns = document.querySelectorAll('.menu button');
  function openPanel(kind) {
    body.innerHTML = kind === 'rooms' ? roomsHTML() : kind === 'materials' ? materialsHTML() : smetaHTML();
    panel.hidden = false; body.scrollTop = 0;
    menuBtns.forEach(function (b) { b.classList.toggle('on', b.dataset.panel === kind); });
    if (lenis) lenis.stop();
  }
  function closePanel() {
    panel.hidden = true;
    menuBtns.forEach(function (b) { b.classList.toggle('on', b.dataset.go === '0'); });
    if (lenis) lenis.start();
  }
  document.querySelectorAll('[data-panel]').forEach(function (b) {
    b.addEventListener('click', function () { panel.hidden || !b.classList.contains('on') ? openPanel(b.dataset.panel) : closePanel(); });
  });
  document.querySelectorAll('[data-go]').forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); closePanel(); goFrame(1); });
  });
  document.getElementById('closePanel').addEventListener('click', closePanel);
  body.addEventListener('click', function (e) {
    var t = e.target.closest('[data-frame]'); if (!t) return;
    closePanel(); goFrame(+t.dataset.frame);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePanel(); });

  window.addEventListener('resize', function () { setHeight(); resize(); if (window.ScrollTrigger) ScrollTrigger.refresh(); });
  resize(); updateUI();
})();
