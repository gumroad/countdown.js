(function() {
  'use strict';

  var root = this;

  var Countdown = function(duration, onTick, onComplete) {
    var secondsLeft = parseFloat(duration)
        , tick = function() {
          if (secondsLeft > 0) {
              onTick(secondsLeft);

              if (secondsLeft >= 1.0) {
                secondsLeft -= 1.0;
              } else {
                clearInterval(interval);

                // Assign a new timeout here so we can abort still if < 1 second
                setTimeout(function() {
                  onComplete();
                }, secondsLeft * 1000);
              }
          } else {
            clearInterval(interval);
            onComplete();
          }
        }
        // Setting the interval, by calling tick() and passing through this via a self-calling function wrap.
        , interval = setInterval(
          (function(self){
            return function() { tick.call(self); };
          })(this), 1000
        )
        , timeout;

    // First tick.
    tick.call(this);

    return {
      abort: function() {
        // We set the timeout and are definitely < 1 second here
        if (typeof timeout !== "undefined") {
          clearTimeout(timeout);
        } else {
          clearInterval(interval);
        }
      }

      , getRemainingTime: function() {
        return secondsLeft;
      }
    };
  };

  if (typeof exports !== 'undefined') module.exports = exports = Countdown;
  else root.Countdown = Countdown;

}).call(this);
