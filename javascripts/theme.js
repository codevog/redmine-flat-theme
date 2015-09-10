document.write('<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; user-scalable=0;target-densityDpi=device-dpi" />');

//$.getScript('selectize.min.js');

(function (window) {

    'use strict';

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    }
    else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

    // transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(classie);
    } else {
        // browser global
        window.classie = classie;
    }

})(window);

function leftMenu() {
    var wrapper = $('#wrapper3');
    $('#top-menu').insertBefore(wrapper);
    wrapper.width($(window).width() - 200);
    $('#footer').width($(window).width() - 200);
}

function addElements(){
    $( '<div id="menu"><div class="burger"><div class="one"></div><div class="two"></div><div class="three"></div></div><div class="circle"></div></div>' ).appendTo( $( "#header" ) );
    var menuLeft = document.getElementById( 'top-menu' ),
        showLeft = document.getElementById( 'menu' ),
        body = document.body,
        search = document.getElementById( 'quick-search' ),
        menuButton = document.getElementById( 'menu' );

    showLeft.onclick = function() {
        classie.toggle( this, 'active' );
        classie.toggle( body, 'menu-push-toright' );
        classie.toggle( menuButton, 'menu-push-toright' );
        classie.toggle( search, 'menu-push-toright' );
        classie.toggle( menuLeft, 'open' );
    };
}

function mainMenu() {
    if ($('#main-menu').children().length == 1) {
        $('#quick-search').addClass('withMenu');
        $( '<div id="burger-main-menu"><div class="one"></div><div class="two"></div><div class="three"></div></div>' ).appendTo( $( "#header" ) );
        var menu = document.getElementById( 'main-menu'),
            menuButton = document.getElementById( 'burger-main-menu'),
            body = document.body;
        menuButton.onclick = function() {
            classie.toggle( this, 'active');
            classie.toggle( body, 'show-main-menu' );
            classie.toggle( menuButton, 'show-main-menu' );
            classie.toggle( menu, 'open' );
        }
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

    $('.controller-gantts #content > table:first').remove().clone(true,true).appendTo( "#query_form" ).wrap('<div id="gantts" class="gantts autoscroll"></div>');
    $('.controller-calendars #content > table:first').remove().clone(true,true).appendTo( "#query_form" ).wrap('<div id="calendars" class="calendars autoscroll"></div>');

    var $newGantts = $('#gantts > table'),

        newGanttsWidth = function(){
            $(window).width() < 750 ? $newGantts.width($('.gantt_hdr').width() + $('#gantt_area > div').width() + 10) : $newGantts.width('100%');

        };

    newGanttsWidth();

    $(window).on('resize', newGanttsWidth);
}

//childElements find
function childElements(node) {
    var elems=new Array();
    var children = node.childNodes;
    for (var i=0, m=children.length; i<m; i++)
        if (children[i].nodeType===document.ELEMENT_NODE)
            elems.push(children[i]);
    return elems;
}

//insert After
function insertAfter( referenceNode, newNode ) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

$(document).ready(function () {
    var sidebar = jQuery('#sidebar'),
        main = jQuery('#main');

    jQuery('#header').append('<a href="/" class="logo"><span></span></a>');
    jQuery('#header > h1').insertAfter(jQuery('.logo'));
    jQuery('#quick-search').insertAfter(jQuery('#header > h1'));
    jQuery('#account').insertAfter(jQuery('#loggedas'));

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
    wrapTable('table.list, table.cal, #query_form_content > fieldset + fieldset > div > table');
    ganttsResponsive();

    $('td.priority').each(function() {
       $(this).wrapInner('<span></span>');
    });

    if (sidebar && sidebar.children().length > 0) {
        var sidebarButton = '<a class="fa fa-plus-square sidebar-menu-trigger"></a>';
        main.prepend(sidebarButton);
    }

    jQuery('.sidebar-menu-trigger').click(function() {
        classie.toggle( this, 'open' );
        classie.toggle( document.getElementById("sidebar"), 'open' );
    });
    jQuery('.add-filter').prependTo( "#filters" ).wrap('<table class="filters-add"></table>');

    jQuery('#loggedas a').detach().appendTo(jQuery('#loggedas').contents().wrap('<span class="logged"></span>').end());
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
});