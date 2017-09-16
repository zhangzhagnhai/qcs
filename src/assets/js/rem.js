(function (doc, win) {
  var docEl = doc.documentElement,
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;

      docEl.style.fontSize = clientWidth / 7.5 + 'px';
      docEl.style.display = "none";
      docEl.clientWidth; // Force relayout - important to new Android devices
      docEl.style.display = "";
    };

  if (!doc.addEventListener) return;

  var div = doc.createElement('div');
  div.setAttribute('style', 'font-size: 1rem');

  if (div.style.fontSize != "1rem") return;

  win.addEventListener('resize', recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);

  recalc();
})(document, window);
