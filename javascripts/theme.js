if ($('meta[name="viewport"]').attr('content').length == 0) {
    document.write('<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; user-scalable=0;" />');
}

function leftMenu() {
    var wrapper = $('#wrapper3');
    $('#top-menu').insertBefore(wrapper);
    wrapper.width($(window).width() - 200);
    $('#footer').width($(window).width() - 200);
}

function addElements(){
    $( '<div id="menu"><div class="burger"><div class="one"></div><div class="two"></div><div class="three"></div></div><div class="circle"></div></div>').appendTo( $( "#header" ) );
    var menuLeft = $('#top-menu'),
        body = $('body'),
        search = $('#quick-search'),
        menuButton = $('#menu');

    menuButton.click(function() {
        $(this).toggleClass('active' );
        body.toggleClass('menu-push-toright');
        menuButton.toggleClass('menu-push-toright');
        search.toggleClass('menu-push-toright');
        menuLeft.toggleClass('open');
    });
}

function mainMenu() {
    var menu = $('#main-menu');
    if (menu.children().length == 1) {
        $('#quick-search').addClass('withMenu');
        $( '<div id="burger-main-menu"><div class="one"></div><div class="two"></div><div class="three"></div></div>').appendTo( $( "#header" ) );
        var menuButton = $('#burger-main-menu'),
            body = $('body');
        menuButton.click(function() {
            $(this).toggleClass('active');
            body.toggleClass('show-main-menu');
            menuButton.toggleClass('show-main-menu');
            menu.toggleClass('open');
        });
    }
}

function getViewportWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

function wrapTable(table) {
    if ($(table).length >= 1) {
        $(table).wrap('<div class="table-wrapper"></div>');
    }
}

function ganttsResponsive() {
    $('.controller-gantts #content > table:first').remove().clone(true, true).appendTo("#query_form").wrap('<div id="gantts" class="gantts autoscroll"></div>');
    $('.controller-calendars #content > table:first').remove().clone(true, true).appendTo("#query_form").wrap('<div id="calendars" class="calendars autoscroll"></div>');
    var newGantts = $('#gantts').find('table');
    var newGanttsWidth = function () {
        $(window).width() < 750 ? newGantts.width($('.gantt_hdr').width() + $('#gantt_area').find('> div').width() + 10) : newGantts.width('100%');
    };
    newGanttsWidth();
    $(window).on('resize', newGanttsWidth);
}

function insertAfter( referenceNode, newNode ) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

$(document).ready(function () {
    fixesV3();
    var sidebar = $('#sidebar'),
        main = $('#main'),
        header = $('#header'),
        logged = $('#loggedas');
    header.append('<a href="/" class="logo"><span></span></a>');
    header.find('> h1').insertAfter($('.logo'));
    $('#quick-search').insertAfter(header.find('> h1'));
    $('#account').insertAfter(logged);
    leftMenu();
    if (getViewportWidth() <= 1024) {
        if ($('#menu').length != 1) {
            addElements();
        }
    }
    if (getViewportWidth() <= 1024) {
        if ($('#burger-main-menu').length != 1) {
            mainMenu();
        }
    }
    wrapTable('table.list, table.cal, #query_form_content > fieldset + fieldset > div > table, table.query-columns');
    ganttsResponsive();
    $('td.priority').each(function() {
       $(this).wrapInner('<span></span>');
    });
    if (sidebar && sidebar.children().length > 0) {
        var sidebarButton = '<a class="fa fa-plus-square sidebar-menu-trigger"></a>';
        main.prepend(sidebarButton);
    }
    $('.sidebar-menu-trigger').click(function() {
        $(this).toggleClass('open');
        $("#sidebar").toggleClass('open');
    });
    logged.find('a').detach().appendTo(logged.contents().wrap('<span class="logged"></span>').end());
    if ($('.pagination + .pages').length == 1) {
        $('.pages').appendTo($('.pagination'));
    }
    $('.query-columns').parent().parent().removeAttr('style');
});

$(window).bind('resize', function () {
    leftMenu();
    if (getViewportWidth() <= 1024) {
        if ($('#menu').length != 1) {
            addElements();
        }
    }

    if (getViewportWidth() <= 1024) {
        if ($('#burger-main-menu').length != 1) {
            mainMenu();
        }
    }

    fixesV3();
});

function fixesV3() {
    $('link[rel=stylesheet][href="/stylesheets/responsive.css"]').remove();
    $('.js-project-menu > ul').detach().appendTo('#main-menu');
    $('.js-general-menu > ul').detach().appendTo('#top-menu');
    $('.js-sidebar > *').detach().appendTo('#sidebar');
    $('.js-profile-menu ul').detach().appendTo('#account');
    $('.js-flyout-menu-toggle-button, .js-flyout-menu').remove();
}