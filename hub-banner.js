/* hub-banner.js — shared top banner for all pages reached from the hub.
 * Usage: <script src="/hub-banner.js"
 *           data-project="Name" data-started="YYYY-MM-DD"
 *           data-layout="portfolio|fluted|flow"></script>
 * Full-width, 34px, dark/lime/mono — matches the hub. Reserves its own space. */
(function () {
  var s = document.currentScript;
  var name = (s && s.getAttribute('data-project')) || document.title || 'Project';
  var date = (s && s.getAttribute('data-started')) || '';
  var layout = (s && s.getAttribute('data-layout')) || 'flow';
  var H = 34;
  var LIME = '#B8FF3D';
  var FONT = "'JetBrains Mono',ui-monospace,'SF Mono',Menlo,monospace";

  var bar = document.createElement('div');
  bar.id = 'hub-banner';
  bar.innerHTML =
    '<a class="hb-back" href="/" aria-label="Back to hub">← Hub</a>' +
    '<span class="hb-name"></span>' +
    (date ? '<span class="hb-date">Started <b></b></span>' : '');
  bar.querySelector('.hb-name').textContent = name;
  if (date) bar.querySelector('.hb-date b').textContent = date;

  var base =
    '#hub-banner{position:fixed;top:0;left:0;right:0;height:' + H + 'px;' +
    'z-index:2147483000;display:flex;align-items:center;gap:14px;padding:0 14px;' +
    'box-sizing:border-box;background:#0f1117;border-bottom:1px solid rgba(230,232,236,0.14);' +
    'font-family:' + FONT + ';font-size:11px;line-height:1;letter-spacing:0.12em;' +
    'text-transform:uppercase;color:#E6E8EC}' +
    '#hub-banner *{box-sizing:border-box}' +
    '#hub-banner .hb-back{display:inline-flex;align-items:center;gap:7px;color:#E6E8EC;' +
    'text-decoration:none;padding:5px 11px;border-radius:999px;' +
    'border:1px solid rgba(230,232,236,0.18);' +
    'transition:color .2s,border-color .2s,background .2s}' +
    '#hub-banner .hb-back:hover{color:' + LIME + ';border-color:rgba(184,255,61,.5);' +
    'background:rgba(184,255,61,.06)}' +
    '#hub-banner .hb-name{font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '#hub-banner .hb-date{margin-left:auto;color:rgba(230,232,236,.45);white-space:nowrap}' +
    '#hub-banner .hb-date b{color:' + LIME + ';font-weight:500}' +
    '@media(max-width:520px){#hub-banner .hb-date{display:none}}';

  var off;
  if (layout === 'portfolio') {
    // fixed full-viewport split app — shift the top stack down, shrink the panes
    off =
      '.topbar{top:' + H + 'px!important}' +
      '.project-tabs{top:' + (56 + H) + 'px!important}' +
      '.viewport,.console,.deepdive{top:' + (100 + H) + 'px!important}' +
      '.viewport,.console,.deepdive,.split{height:calc(100vh - ' + (128 + H) + 'px)!important}' +
      '.stage{padding-top:' + (100 + H) + 'px!important}';
  } else if (layout === 'fluted') {
    off = '.stage{top:' + H + 'px!important}.toggle{top:' + (20 + H) + 'px!important}';
  } else {
    off = 'html{scroll-padding-top:' + H + 'px}body{padding-top:' + H + 'px!important}';
  }

  var style = document.createElement('style');
  style.textContent = base + off;

  function mount() {
    document.head.appendChild(style);
    document.body.appendChild(bar);
    // pages that size to their container (fluted canvas, vh layouts) need a nudge
    try { window.dispatchEvent(new Event('resize')); } catch (e) {}
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
