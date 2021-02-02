var teamArray = shuffleArray(teamArrayStatic().slice());
var timeinterval;

function onKeyEvent(event) {
    var x = event.charCode || event.keyCode;
    if (x == 32) {
        startMe(90, next=false);
    } else {
        startMe(90, next=true);
    }
}

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    clearInterval(timeinterval);
    
    function updateClock() {
    var t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
        var snd = new Audio("http://soundbible.com/grab.php?id=1542&type=wav");
        snd.play();
        clearInterval(timeinterval);
    }
    }

    updateClock();
    timeinterval = setInterval(updateClock, 1000);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
return array;
}

function startMe(seconds, next=true) {
    
    if (teamArray.length > 0) {
        var member = document.getElementById('member')
        if (next) {
            member.innerHTML = teamArray.pop();
        }
        clearInterval(timeinterval);
        initializeClock('clockdiv', new Date(Date.parse(new Date()) + seconds * 1000));
    } else {
        document.getElementById('clockdiv').querySelector('.minutes').innerHTML = '00'
        document.getElementById('clockdiv').querySelector('.seconds').innerHTML = '00'
        document.getElementById('member').innerHTML = ''
        clearInterval(timeinterval);
        teamArray = shuffleArray(teamArrayStatic().slice());
    }
}