//适配REM
(function (window, undefined) {
    var resizeTimeout = 0,
        html = window.document.documentElement,
        designWidth = 750,
        maxWidth = 1366;

    function setBaseFontSize() {
        var windowWidth = html.getBoundingClientRect().width;
        if (windowWidth > maxWidth) {
            windowWidth = maxWidth;
        }
        var ratio = windowWidth / designWidth;
        var baseFontSize = ratio * 100;
        html.style.fontSize = baseFontSize + 'px';
        html.ratio = ratio;
        html.bfs = baseFontSize;
    }
    window.addEventListener('resize', function () {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(setBaseFontSize, 300);
    }, false);
    setBaseFontSize();
})(window);

