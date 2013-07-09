'use strict';

(function($) {
  var Countdown = function(interval) {
    this.interval = interval;

    this.abort = function() {
      clearInterval(this.interval);
    };
  };

  $.countdown = function(duration, onTick, onComplete) {
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

    return new Countdown(interval);
  }

})(jQuery);
