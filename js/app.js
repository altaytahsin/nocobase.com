/*********************************/
/*         INDEX                 */
/*================================
 *     01.  Loader               *
 *     02.  Toggle Menus         *
 *     03.  Active Menu          *
 *     04.  Clickable Menu       *
 *     05.  Back to top          *
 *     06.  Feather icon         *
 *     06.  DD Menu              *
 *     06.  Active Sidebar Menu  *
 ================================*/


window.addEventListener('load',   fn , false )

//  window.onload = function loader() {
function fn() {
    // Preloader
    if(document.getElementById('preloader')){
        setTimeout(() => {
            document.getElementById('preloader').style.visibility = 'hidden';
            document.getElementById('preloader').style.opacity = '0';
        }, 350);
    }
    // Menus
    activateMenu();
}

//Menu
// Toggle menu
function toggleMenu() {
    document.getElementById('isToggle').classList.toggle('open');
    var isOpen = document.getElementById('navigation')
    if (isOpen.style.display === "block") {
        isOpen.style.display = "none";
    } else {
        isOpen.style.display = "block";
    }
};

//Menu Active
function getClosest(elem, selector) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) { }
                return i > -1;
            };
    }

    // Get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }
    return null;

};

function activateMenu() {
    var menuItems = document.getElementsByClassName("sub-menu-item");
    if (menuItems) {

        var matchingMenuItem = null;
        for (var idx = 0; idx < menuItems.length; idx++) {
            if (menuItems[idx].href === window.location.href) {
                matchingMenuItem = menuItems[idx];
            }
        }

        if (matchingMenuItem) {
            matchingMenuItem.classList.add('active');
            var immediateParent = getClosest(matchingMenuItem, 'li');
            if (immediateParent) {
                immediateParent.classList.add('active');
            }

            var parent = getClosest(matchingMenuItem, '.parent-menu-item');
            if (parent) {
                parent.classList.add('active');
                var parentMenuitem = parent.querySelector('.menu-item');
                if (parentMenuitem) {
                    parentMenuitem.classList.add('active');
                }
                var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
                if (parentOfParent) {
                    parentOfParent.classList.add('active');
                }
            } else {
                var parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
                if (parentOfParent) {
                    parentOfParent.classList.add('active');
                }
            }
        }
    }
}

// Clickable Menu
if(document.getElementById("navigation")){
    var elements = document.getElementById("navigation").getElementsByTagName("a");
    for(var i = 0, len = elements.length; i < len; i++) {
        elements[i].onclick = function (elem) {
            if(elem.target.getAttribute("href") === "javascript:void(0)") {
                var submenu = elem.target.nextElementSibling.nextElementSibling;
                submenu.classList.toggle('open');
            }
        }
    }
}

// Menu sticky
function windowScroll() {
    const navbar = document.getElementById("topnav");
    if(navbar!=null){
        if (
            document.body.scrollTop >= 50 ||
            document.documentElement.scrollTop >= 50
        ) {
            navbar.classList.add("nav-sticky");
        } else {
            navbar.classList.remove("nav-sticky");
        }
    }
}

window.addEventListener('scroll', (ev) => {
    ev.preventDefault();
    windowScroll();
})

// back-to-top
var mybutton = document.getElementById("back-to-top");
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if(mybutton!=null){
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}



//ACtive Sidebar
(function () {
    var current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);;
    if (current === "") return;
    var menuItems = document.querySelectorAll('.sidebar-nav a');
    for (var i = 0, len = menuItems.length; i < len; i++) {
        if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
            menuItems[i].parentElement.className += " active";
        }
    }
})();

//Feather icon
feather.replace();

// dd-menu
var ddmenu = document.getElementsByClassName("dd-menu");
for(var i = 0, len = ddmenu.length; i < len; i++) {
    ddmenu[i].onclick = function (elem) {
        elem.stopPropagation();
    }
}

//Tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

//small menu
try {
    var spy = new Gumshoe('#navmenu-nav a');
}catch(err) {
    
}

// Demo
$(document).ready(function() { 
    $('#steps-wrap').addClass('loaded');
});

$('.demo_step_start').hover(function(){
    $(this).find('.button').attr('data-balloon-visible','');
})

$('.button').hover(function(){
    $(this).removeAttr("data-balloon-visible");
})

$('.button').click(function(){
    var curStep = $(this).parent();
    var nextStep = $(this).parent().prev();
    var stepsGroup = nextStep.find('.steps-groups');

    if($(this).hasClass('button1')) {
        $('.steps-title').removeClass('active');
        $('#guide1').addClass('active');
    } else if($(this).hasClass('button6')) {
        $('.steps-title').removeClass('active');
        $('#guide2').addClass('active');
    } else if($(this).hasClass('button10')) {
        $('.steps-title').removeClass('active');
        $('#guide3').addClass('active');
    } else if($(this).hasClass('button32')) {
        $('.steps-title').removeClass('active');
    }

    nextStep.show();

    curStep.fadeOut('slow', function(){
        setTimeout(() => { 
            nextStep.find('.button').attr('data-balloon-visible','');
        }, 100);
    });
})

$('.steps-groups').click(function(){
    $(this).fadeOut();
})

$('.steps-title').click(function(){
    $('.demo_step').fadeOut();
    $('.steps-title').removeClass('active');
    $(this).addClass('active');
    $('.steps-groups').show(0);

    if($(this).hasClass('guide1')) {
        $('#button2').parent().fadeIn();
    } else if($(this).hasClass('guide2')) {
        $('#button7').parent().fadeIn();
    } else if($(this).hasClass('guide3')) {
        $('#button11').parent().fadeIn();
    }
})

// Language
// if (!localStorage.getItem('locale')) {
//     localStorage.setItem('locale', window.navigator.language.toLowerCase() || 'en');
// }

// if (window.location.search.startsWith('?locale=zh')) {
//     localStorage.setItem('locale', 'zh-cn');
// } else if (window.location.search.startsWith('?locale=en')) {
//     localStorage.setItem('locale', 'en-us');
// }

// var language = localStorage.getItem('locale');

// if (location.pathname !== '/cn/' && language.startsWith('zh')) {
//     window.location = 'https://www.nocobase.com/cn/'
// } else if (location.pathname !== '/' && !language.startsWith('zh')) {
//     window.location = 'https://www.nocobase.com/'
// }