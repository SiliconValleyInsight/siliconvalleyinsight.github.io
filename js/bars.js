var bars = [];
var barWidth = 20;
var gutter = 10;
function getBaseHeight(x) {
  var h = view.bounds.height / 4;
  return Math.sin(
    5 * Math.PI * x / view.bounds.width
  ) * h / 2 + h;
}
function genRandomHeight(bar) {
  return bar.baseHeight - Math.random() * bar.baseHeight * 0.25;
}
function onWinResize() {
  var clientRect = view.element.parentNode.getClientRects()[0];
  var vs = new Size(clientRect.width, clientRect.height);
  view.viewSize = vs;
}
function onResize() {
  while (bars.length > 0) {
    bars.pop().remove();
  }
  var i = 0;
  while (i * (barWidth + gutter) < view.bounds.width) {
    var x = i * (barWidth + gutter);
    var rect = new Rectangle();
    rect.bottomCenter = new Point(x, view.bounds.height);
    rect.size = new Size(barWidth, getBaseHeight(x));
    var bar = new Path.Rectangle(rect);
    bar.fillColor = '#f9f9f9';
    bar.strokeColor = '#eee';
    bar.pivot = rect.bottomCenter;
    bar.baseHeight = getBaseHeight(x);
    bar.nextHeight = genRandomHeight(bar);
    bars.push(bar);
    i = bars.length;
  }
}
var mp = null; // Mouse pointer
var mv = new Point(0, 0); // Mouse vector
function onFrame(e) {
  bars.forEach(function(bar, i) {
    // Pointer force
    // strength
    // * y vector (pull)
    // / distance from pointer (push)
    var pf = mp ? (
      20
      * -mv.y
      / mp.getDistance(bar.bounds.topCenter)
    ) : 0;
    var dh = bar.nextHeight - bar.bounds.height;
    var dsy = dh / bar.baseHeight + pf;
    bar.scaling.y += dsy / 30;
    // Min 1% scale
    if (bar.scaling.y < 0.01) {
      bar.scaling.y = 0.01;
    }
    // Max to 100% scale
    if (bar.scaling.y > 1) {
      bar.scaling.y = 1;
    }
    // Random scaling
    if (Math.abs(dsy) < 0.001) {
      bar.nextHeight = genRandomHeight(bar);
    }
  });
  // Dampen
  mv /= 30;
}
function onMouseMove(e) {
  mp = e.point;
  mv += e.delta;
}
window.onresize = onWinResize;
onWinResize();
