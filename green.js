var selectedMapping = null;
var mappings =
[
    {
        "ObjectId": "plasticTrash",
        "ContainerId": "#garbage3"
    },
    {
        "ObjectId": "glassTrash",
        "ContainerId": "#garbage2"
    },
    {
        "ObjectId": "paperTrash",
        "ContainerId": "#garbage1"
    }
];

$(document).ready(function () {
    $(".bin").click(OnBinClick);
    
    selectedMapping = mappings[GetRandomPosition()];
    $("#trash").addClass(selectedMapping.ObjectId);

    MoveClouds();
    MovePerson();
});

var ComputeThrowPosition = function (garbageBin) {
    return garbageBin.position().left - $("#man").width();
}

function GetRandomPosition(mappings) {
    return Math.floor((Math.random() * 3));
}

function MovePerson() {
    TweenMax.to("#man", 2, { left: ComputeThrowPosition($("#garbage3")) });
}

var ThrowAway = function (pieceOfTrash, garbageBin, duration) {
    //move man with trash next to the bin
    TweenMax.to("#man", duration, { left: ComputeThrowPosition(garbageBin) });
    //throw trash into bin
    TweenMax.to(pieceOfTrash, 3, { x: 80, y: 80, delay: duration, opacity: 0, rotation: 360, scale: 0.5 });
}

function MoveClouds() {
    var distance = $("#garbage2").position().left;
    TweenMax.to(".cloud", 30, { left: distance, repeat: 10, yoyo: true, onRepeat: function () { }, repeatDelay: 0.5, ease: Linear.easeNone });
}

var OnBinClick = function () {
    var animationDuration = GetAnimationDuration(this.id);
    ThrowAway($("#trash"), $("#" + this.id), animationDuration);
    var self = this;
    window.setTimeout(function () {
        if ("#" + self.id == selectedMapping.ContainerId) {
            AnimateFlower();
        } else {
            HideFlowers();
            ShowPenguin();
        }
        EnableRetry();
    }, GetTimeoutDuration(animationDuration)-500);
}

function GetTimeoutDuration(animationDuration) {
    return (animationDuration * 1000) + 2000;
}
function GetAnimationDuration(containerId) {
    switch (containerId) {
        case "garbage3":
            return 0;
        case "garbage2":
            return 1;
        case "garbage1":
            return 2;
    }
}

var AnimateFlower = function()
{
    TweenMax.staggerTo("div.positiveResult img", 2, { scale: 2, rotation: 360, onComplete:NormalizeFlower});
}

var NormalizeFlower = function()
{
    TweenMax.to("div.positiveResult img", 1, {scale: 1, rotation: -360, opacity:1});
}

var HideFlowers = function()
{
 TweenMax.to("div.positiveResult img", 3, {scale: 0.2, opacity: 0});
}

var ShowPenguin = function()
{
    $(".negativeResult").addClass("madPenguin");
    TweenMax.from(".negativeResult", 1, {opacity: 0, right:0})
}

var EnableRetry = function()
{
    $(".retry").click(function(){

        //reset person position
        TweenMax.to("#man", 0.2, { left: 200 });
        $(".negativeResult").removeClass("madPenguin");
        NormalizeFlower();
        $(".retry").css("color", "grey");
        selectedMapping = mappings[GetRandomPosition()];
        $("#trash").removeClass();
        $("#trash").addClass(selectedMapping.ObjectId);
        TweenMax.to("#trash", 0.1, {opacity: 1, left:70, top:0, scale:1, onComplete:MovePerson, delay:2});

    });
    $(".retry").css("color", "black");
}