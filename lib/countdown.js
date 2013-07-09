'use strict';

(function() {
  var root = this
    , Countdown;

  Countdown = function(duration, onTick, onComplete) {
    var secondsLeft = duration - 1
      , interval;

    onTick(duration);

    var interval = setInterval(function() {
      if (secondsLeft > 0) {
        onTick(secondsLeft);
        secondsLeft -= 1;
      } else {
        clearInterval(interval);
        onComplete();
      }
    }.bind(this), 1000);

    this.interval = interval;
  };

  Countdown.prototype.abort = function() {
    clearInterval(this.interval);
  };

  if (typeof exports !== 'undefined') {
    module.exports = exports = Countdown;
  } else {
    root.Countdown = Countdown;
  };
}).call(this);
