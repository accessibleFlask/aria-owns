function progressPanel(event) {
    var button = event.target;
    var currentPanel = $('div.current');

    // Move the appropriate direction
    if($(button).hasClass('prev-button')) {
        var previous = currentPanel.prev();
        var lookAhead = previous.prev();

        if(!previous.is('div.hidden')) {
            return;
        }

        if(!lookAhead.is('div.hidden')) {
            fixFirstButtons();
        }

        if(previous.attr('id').includes('panel')) {
            // swap attributes
            previous.removeClass('hidden');
            previous.addClass('current');
            currentPanel.removeClass('current');
            currentPanel.addClass('hidden');
            // set focus
            previous.focus();
            previous[0].scrollIntoView();
        }

        // swap from slide to panel
        if($('.next-button.hidden').is('button')) {
            $('.next-button.hidden').removeClass('hidden');
            $('#next-slide').addClass('hidden');
        }
    }
    else {
        var next = currentPanel.next();
        var lookAhead = next.next();

        if(next && !next.is('div.hidden')) {
            return;
        }

        if(lookAhead && !lookAhead.is('div.hidden')) {
            fixLastButtons();
        }

        if(next && next.attr('id') && next.attr('id').includes('panel')) {
            // swap attributes
            next.removeClass('hidden');
            next.addClass('current');
            currentPanel.removeClass('current');
            currentPanel.addClass('hidden');
            // set focus
            next.focus();
            next[0].scrollIntoView();
        }

        // swap from panel to slide
        if($('.prev-button.hidden').is('a')) {
            $('#prev-slide').removeClass('hidden');
            $('button.prev-button').addClass('hidden');
        }
    }

    if(isLastPanel()) {
        $('button.next-button').addClass('hidden');
        $('#next-slide').removeClass('hidden');
    }
    else {
        $('#next-slide').addClass('hidden');
        $('button.next-button').removeClass('hidden');
    }

    if(isFirstPanel()) {
        $('button.prev-button').addClass('hidden');
        $('#prev-slide').removeClass('hidden');
    }
    else {
        $('#prev-slide').addClass('hidden');
        $('button.prev-button').removeClass('hidden');
    }
}

function showErrors() {
    var errors = $('[aria-invalid]');
    var flashes = $('[role="alert"]');
    var badFlashes = $('#flashes');

    if(errors.length || flashes.length) {
        var panelOne = $('#panel-one');
        var formPanel = $(errors[0]).parent().parent();
        if(!formPanel.length) {
            formPanel = $(flashes[0]).parent();
        }

        panelOne.removeClass('current');
        panelOne.addClass('hidden');
        formPanel.removeClass('hidden');
        formPanel.addClass('current');
    }
    else if(badFlashes.length) {
        var panelOne = $('#panel-one');
        var formPanel = $(badFlashes[0]).parent();

        panelOne.removeClass('current');
        panelOne.addClass('hidden');
        formPanel.removeClass('hidden');
        formPanel.addClass('current');
    }
}

function checkShowButtons() {
    var divs = $('div[id^="panel"]');
    if(!divs.length) {
        $('.slide-nav').css({'display': 'none'});
        return false;
    }

    return true;
}

function isLastPanel() {
    var panels = $('div[id^="panel"]');
    var currentPanelID = $('div.current')[0].id;
    var lastPanelID = panels.last()[0].id;

    return currentPanelID === lastPanelID ? true : false;

}

function isFirstPanel() {
    var panels = $('div[id^="panel"]');
    var currentPanelID = $('div.current')[0].id;
    var firstPanelID = panels.first()[0].id;

    return currentPanelID === firstPanelID ? true : false;
}

function updateHref() {
    // Try to grab the aria-current
    // if that hasn't been set yet, figure out the current slide the long way
    var currentLink = $('a[aria-current]');
    if(!currentLink.length) {
        currentLink = $('a[href*="' + getCurrentSlide() + '"]');

        if(!currentLink.length) {
            // homepage
            // disable previous, next is slide 1
            $('#prev-slide').css({'visibility': 'hidden'});
            $('#next-slide')[0].href = window.location.href + 'slide-1/';
            return;
        }
    }

    // next and prev link are nested in a li
    // #crimes
    var nextLink = currentLink.parent().next().children()[0];
    var prevLink = currentLink.parent().prev().children()[0];

    if(!nextLink) {
        $('#next-slide').css({'visibility': 'hidden'});
        $('#prev-slide')[0].href = prevLink.href;
        return;
    }

    $('#next-slide')[0].href = nextLink.href;
    $('#prev-slide')[0].href = prevLink.href;
}

function fixLastButtons() {
    $('#next-slide').removeClass('hidden');
    $('button.next-button').addClass('hidden');
}

function fixFirstButtons() {
    $('#prev-slide').removeClass('hidden');
    $('button.prev-button').addClass('hidden');
}

$(function() {
    $('button.prev-button, button.next-button').on('click', progressPanel);
    showErrors();
    updateHref();

    if(isLastPanel()) {
        fixLastButtons();
    }

    if(isFirstPanel()) {
        fixFirstButtons();
    }
});
