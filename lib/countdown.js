(function() {
  'use strict';

  var root = this;

  var Countdown = function(duration, onTick, onComplete, step) {
    var secondsLeft = Math.round(duration)
        , step = (step > 0) ? Math.round(step) : 1
        , tick = function() {
          if (secondsLeft > 0) {
            onTick(secondsLeft);
            if (secondsLeft >= step) {
              secondsLeft -= step;
            }
            else {
              // Clear the current interval, and start it up with the the remaining seconds left.
              clearInterval(interval);
              interval = setInterval(
                function() { tick.call(this) }, 1000 * secondsLeft, this
              );
              secondsLeft = 0;
            }
          } else {
              clearInterval(interval);
              onComplete();
          }
        }
        // Setting the interval, by call tick and passing through this via a self-calling function wrap.
        , interval = setInterval(
          function() { tick.call(this) }, 1000 * step, this
        );

    // First tick.
    tick.call(this);

    return {
      abort: function() {
        clearInterval(interval);
      }

      , getRemainingTime: function() {
        return secondsLeft;
      }
    };
  };

  if (typeof exports !== 'undefined') module.exports = exports = Countdown;
  else root.Countdown = Countdown;

}).call(this);
