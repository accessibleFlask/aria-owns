/**
 * Sets current in the sidebar and centers it within the scroll area
 */
function focusNav () {
    var sidebar = $('.site-sidebar nav');
    sidebar.on('focusin',function(){
        $(this).addClass('active');
        $(this).parent().addClass('active');
    });
    sidebar.on('focusout', function(){
        $(this).removeClass('active');
        $(this).parent().removeClass('active');
    });

}

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
    var focus = focusNav();
    if(current) {
        centerScrollbar(current);
    }
});
