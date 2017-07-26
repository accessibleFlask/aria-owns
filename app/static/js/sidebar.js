/**
 * Sets current in the sidebar and centers it within the scroll area
 */

function getCurrentSlide() {
    var url = window.location.href;
    var captureRegex = '\/slide-(\\d{1,})\/';
    var reObj = new RegExp(captureRegex);
    var result = reObj.exec(url);

    if(result) {
        return result[1];
    }
    else {
        return false;
    }
}

function centerScrollbar(active) {
    var sidebar = $('.site-sidebar');
    var currentPosition = sidebar.scrollLeft();
    var width = sidebar.width();
    var relevantLink = $('a[href*="' + active + '"]')[0];
    var newPosition = $(relevantLink).position().left;
    var result = (newPosition + currentPosition) - (width / 2);

    $(relevantLink).attr('aria-current', 'page');

    sidebar.animate({
        scrollLeft: result
    });
};

$(function() {
    var current = getCurrentSlide();
    if(current) {
        centerScrollbar(current);
    }
});
