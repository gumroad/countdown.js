'use strict';

(function() {
  var root = this;

  var Countdown = function(duration, onTick, onComplete){
    this.secondsLeft = duration;
    var tick = function() {
        if (this.secondsLeft > 0) {
            onTick(this.secondsLeft);
            this.secondsLeft -= 1;
        } else {
            clearInterval(this.interval);
            onComplete();
        }
    }
    //setting the interval, by call tick and passing through this via a self-calling function wrap
    this.interval = setInterval( 
      (function(self){
        return function() { tick.call(self) }
      })(this),1000
    );
  }

  Countdown.prototype.abort = function() {
    clearInterval(this.interval);
  }

  if (typeof exports !== 'undefined') module.exports = exports = Countdown;
  else root.Countdown = Countdown;

}).call(this);
