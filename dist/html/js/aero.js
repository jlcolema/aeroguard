var actionBtn = document.getElementById('frmSubmit');
var eForm = document.getElementById("aero-form-body");
var refURL = document.referrer;

$(function () {
    // console.log(location.href);
    // console.log(document.referrer);

    if (refURL.indexOf("skywest") >= 0) {
        var isSW = getCookie("isSkyWest");
        // if cookie doesn't exist, create it
        if (isSW == "") {
            var d = new Date();
            // Expires in 14 days
            d.setTime(d.getTime() + (14 * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = "isSkyWest=1;" + expires + ";path=/";
        }
    }

    $('#fname').focus(function () {
        $(this).removeClass('err');
    });
    $('#lname').focus(function () {
        $(this).removeClass('err');
    });
    $('#email').focus(function () {
        $(this).removeClass('err');
    });
    $('#phone').focus(function () {
        $(this).removeClass('err');
    });
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    $('#mainNav').append($('<div id="navbar-height-col"></div>'));

    // Enter your ids or classes
    var toggler = '.navbar-toggle';
    var close = '.close';
    var pagewrapper = '#page-content';
    var navigationwrapper = '.navbar-header';
    var menuwidth = '100%'; // the menu inside the slide menu itself
    var slidewidth = '60%';
    var menuneg = '-100%';
    var slideneg = '-80%';

    $("#mainNav").on("click", toggler, function (e) {

        var selected = $(this).hasClass('slide-active');

        $('#slidemenu').stop().animate({
            left: selected ? menuneg : '0px'
        });

        $('#navbar-height-col').stop().animate({
            left: selected ? slideneg : '0px'
        });

        $(pagewrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        });

        $(navigationwrapper).stop().animate({
            // left: selected ? '0px' : slidewidth
        });


        $(this).toggleClass('slide-active', !selected);
        $('#slidemenu').toggleClass('slide-active');


        $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');

        if ($(window).width() < 768) {
            $('.stick-req-wrapper').toggle();
        }
    });
    $("#mainNav").on("click", close, function (e) {

        var selected = $(toggler).hasClass('slide-active');

        $('#slidemenu').stop().animate({
            left: selected ? menuneg : '0px'
        });

        $('#navbar-height-col').stop().animate({
            left: selected ? slideneg : '0px'
        });

        $(pagewrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        });

        $(navigationwrapper).stop().animate({
            // left: selected ? '0px' : slidewidth
        });

        $(toggler).toggleClass('slide-active', !selected);
        $('#slidemenu').toggleClass('slide-active');
        $('#slidemenu').toggleClass('in');

        $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');

        if ($(window).width() < 768) {
            $('.stick-req-wrapper').toggle();
        }
    });

    var selected = '#slidemenu, #page-content, body, .navbar, .navbar-header';

    $(window).on("resize", function () {
        if ($(window).width() > 767 && $('.navbar-toggle').is(':hidden')) {
            $(selected).removeClass('slide-active');
        }
    });
});

$.fn.isOnScreen = function () {
    var element = this.get(0);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}

function actionClickHandler() {
    // Disable the button to stop people from clicking it multiple times.
    actionBtn.disabled = true;
    $('.loading').toggle();

    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var val = '';

    if (fname.value == null || fname.value == "") {
        val = 'err';
        $('#fname').addClass('err');
    }
    if (lname.value == null || lname.value == "") {
        val = 'err';
        $('#lname').addClass('err');
    }
    if (email.value == null || email.value == "") {
        val = 'err';
        $('#email').addClass('err');
    }
    if (phone.value == null || phone.value == "") {
        val = 'err';
        $('#phone').addClass('err');
    }


    if (val != 'err') {
        var xmlHttp = new XMLHttpRequest();
        var referrer = 'WWW';
        var isSW = getCookie("isSkyWest");
        // if cookie doesn't exist, create it
        if (isSW != "") referrer = "SkyWest";

        var theURL = "/addlead.ashx?fname=" + fname.value + "&lname=" + lname.value + "&email=" + email.value + "&phone=" + phone.value + "&leadsource=" + referrer;
        console.log("theURL", theURL);
        xmlHttp.open("GET", theURL, false);
        xmlHttp.send(null);

        //jQuery('#fname').val('');
        //jQuery('#lname').val('');
        //jQuery('#email').val('');
        //jQuery('#phone').val('');
        //$('#tyModal').modal('toggle');

        console.log("GA Send");
        ga('send', { hitType: 'event', eventCategory: 'Form - Bottom', eventAction: 'submit', eventLabel: location.href, eventValue: 001 });

        // 12/4/17 - Add TYP redirect
        console.log("Redirect");
        location.href = "thank-you.html";
    } else {
        // Ensable the button
        actionBtn.disabled = false;
        $('.loading').toggle();
    }

    return;
}

actionBtn.addEventListener('click', actionClickHandler, false);

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// ===== Scroll to Top ====
$(window).scroll(function () {
    if ($(this).scrollTop() >= 200) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function () {      // When arrow is clicked
    $('body,html').animate({
        scrollTop: 0                       // Scroll to top of body
    }, 500);
});

jQuery.preloadImages = function () {
    for (var i = 0; i < arguments.length; i++) {
        jQuery("<img />").attr("src", "img/" + arguments[i]);
    }
}
