$( document ).ready(function() {
    var trash = $("#garbage");
    var trashPosition  = $("#garbage").position().left - $("#man").width();
     TweenMax.to("#man", 10, {left:trashPosition});
     TweenMax.to("#trash", 3, {x:80, y:80, delay:10, opacity:0});
});
