# countdown.js

Countdown.js is a library that allows developers to set countdowns for functions that can be cancelled.  For example, if you would
like to submit a form, countdown.js allows you to set a 5 second countdown and give the user a chance to cancel the
submission. 

## API

### new Countdown(duration, onTick, onComplete)

Begins a countdown.  After `duration` time has passed, the function `onComplete `will be executed.  Every second, the `onTick`
function will be executed.  

Countdown objects have an `abort` method with which the countdown can be stopped.  

Example:

```javascript
var submitCountdown = new Countdown(5, function(seconds) {
  console.log(seconds); //log the number of seconds that have passed
}, function() {
   console.log("Countdown complete!") //log that the countdown has complete
});

submitCountdown.abort(); //aborts the countdown
```

### Contribute

Install development dependencies
```
npm install
```

### Test

Run `jake test`
