$( document ).ready(function() {
    ThrowAway($("#trash"), $("#garbage"));
    
});


var ComputeThrowPosition = function(garbageBin){
    return garbageBin.position().left - $("#man").width();
}

var ThrowAway = function(pieceOfTrash, garbageBin){
    //move man with trash next to the bin
    TweenMax.to("#man", 10, {left:ComputeThrowPosition(garbageBin)});
    //throw trash into bin
    TweenMax.to(pieceOfTrash, 3, {x:80, y:80, delay:10, opacity:0});
}