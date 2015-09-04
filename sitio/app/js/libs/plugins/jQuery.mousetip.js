// Plugin: jQuery.mousetip
// Source: github.com/nathco/jQuery.mousetip
// Author: Nathan Rutzky
// Update: 1.00
    
$.fn.mousetip = function(tip, x, y) {
    
    var $this = $(this);        
    
    $this.hover(function() {
        
        $(tip, this).fadeIn();
    
    }, function() {
    
        $(tip, this).fadeOut().removeAttr('style');
    
    }).mousemove(function(e) {
        var offset = $(this).offset();
        var mouseX = e.pageX - x;
        var mouseY = e.pageY - y;

        var X = mouseX - offset.left;
        var Y = mouseY - offset.top;

        /*var mouseX = e.pageX + (x || 10);
        var mouseY = e.pageY + (y || 10);*/
    
        $(tip, this).show().css({
            
            top:Y, left:X
            
        });
    });
};
