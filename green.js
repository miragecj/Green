var selectedMapping = null;
$(document).ready(function () {
    $(".bin").click(OnBinClick);
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
    selectedMapping = mappings[GetRandomPosition()];
    $("#trash").addClass(selectedMapping.ObjectId)

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
    TweenMax.to("#man", 10, { left: ComputeThrowPosition($("#garbage3")) });
}

var ThrowAway = function (pieceOfTrash, garbageBin, duration) {
    //move man with trash next to the bin
    TweenMax.to("#man", duration, { left: ComputeThrowPosition(garbageBin) });
    //throw trash into bin
    TweenMax.to(pieceOfTrash, 3, { x: 80, y: 80, delay: duration, opacity: 0 });
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
            alert("Ok");
        } else {
            alert("not ok")
        }
    }, GetTimeoutDuration(animationDuration));
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