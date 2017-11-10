$( document ).ready(function() {
    $(".bin").click(OnBinClick);
    MoveCloud();
    ThrowAway($("#trash"), $("#garbage2"));
    
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

function MoveCloud(){
    TweenMax.to(".norisor", 50, { left: "700px", repeat: 10, yoyo: true, onRepeat: function() { }, repeatDelay: 0.5, ease: Linear.easeNone });
}

var OnBinClick = function(){
alert(this.id);
}