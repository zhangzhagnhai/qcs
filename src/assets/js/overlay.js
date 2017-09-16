(function () {
    'use strict';

    window.Overlay = {
        show: show,
        out: out
    };

    function show(content, time) {
        var randomId = Math.random() * 10000 + new Date().getTime();
        randomId = 'overlay-' + parseInt(randomId);
        var time = time || 3000;

        var element = [
            '<div class="overlay" id="' + randomId + '">',
            '<div class="overlay-container overlay-container-tip bounceIn">',
            content,
            '</div>',
            '</div>'
        ].join('');

        $(document.body).append(element);

        setTimeout(function () {
            out(randomId);
        }, time);

        return randomId;
    }

    function out(randomId) {
        $('#' + randomId + ' .overlay-container').addClass('zoomOut animated');
        setTimeout(function () {
            $('#' + randomId).remove();
        }, 500);
    }

    $(document).on('click', '.jq-overlay-close', function () {
        out();
    });

    $(document).on('click', '.overlay', function (e) {
        if (e.target == this) {
            out($(this).attr('id'));
        }
    });
})();