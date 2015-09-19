/***************** Nav Transformicon ******************/

/* When user clicks the Icon */
$(".nav-toggle").click(function(e) {
    e.preventDefault();
    $(this).toggleClass("active");
    $(".overlay-boxify").toggleClass("open");
});

/* When user clicks a link */
$(".overlay ul li a").click(function(e) {
    //alert("a")
    e.preventDefault();
    var url = $(this).attr("href");
    console.log(url)
    if(url.charAt(0) == "#"){
        url = url.replace("#","")
         Backbone.history.navigate( '/'+url,{ trigger:true, replace: false })
        $("#popupContent").remove();
    }else{
        location.href=window.location.href.split('#')[0];
    }
    // $(".nav-toggle").toggleClass("active");
   // $(".overlay-boxify").removeClass("open");
   // console.log($(".overlay-boxify").hasClass("open"))
    //location.href=$(e.target).attr("href");
    //window.location.reload()
    //$(".overlay-boxify").toggleClass("open");
});

/* When user clicks outside */
$(".overlay").click(function() {
    $(".nav-toggle").toggleClass("active");
    $(".overlay-boxify").toggleClass("open");
});

/***************** Smooth Scrolling ******************/

$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 2000);
            return false;
        }
    }
});


