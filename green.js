var selectedMapping = null;
$( document ).ready(function() {
    $(".bin").click(OnBinClick);
 var mappings = 
     [
         {
            "ObjectId": "glassTrash",
            "ContainerId":"#garbage2"
         },
        {
            "ObjectId": "plasticTrash",
            "ContainerId":"#garbage3"
         },
        {
            "ObjectId": "paperTrash",
            "ContainerId":"#garbage1"
        }
     ];
     selectedMapping = mappings[0];
     $("#trash").addClass(selectedMapping.ObjectId)
  
    MoveClouds();
    
});


var ComputeThrowPosition = function (garbageBin) {
    return garbageBin.position().left - $("#man").width();
}

var ThrowAway = function (pieceOfTrash, garbageBin) {
    //move man with trash next to the bin
    TweenMax.to("#man", 10, { left: ComputeThrowPosition(garbageBin) });
    //throw trash into bin
    TweenMax.to(pieceOfTrash, 3, { x: 80, y: 80, delay: 10, opacity: 0 });
}

function MoveClouds() {
        var distance = $("#garbage2").position().left;
        TweenMax.to(".cloud", 30, { left: distance, repeat: 10, yoyo: true, onRepeat: function () { }, repeatDelay: 0.5, ease: Linear.easeNone });
}

var OnBinClick = function(){
    ThrowAway($("#trash"), $("#" + this.id));
    var self = this;
    window.setTimeout(function(){
        if ( "#" + self.id == selectedMapping.ContainerId){
            alert("Ok");
        } else{
            alert("not ok")
        }
    }, 12000);
}