# jQuery.countdown

Remove confirmation modals from your site! jQuery.countdown replaces confirmation modals with a UI interaction in which the
action to be confirmed will happen after a provided number of time unless the user chooses to abort that operation.  

## API

### $.countdown(duration, onTick, onComplete)

Begins a countdown.  After `duration` time has passed, the function `onComplete `will be executed.  Every second, the `onTick`
function will be executed.  

The function returns an object with which the countdown can be controlled.  This object has a method called `abort` that
stops the countdown.  

Example:

```javascript
var submitCountdown = $.countdown(5, function(seconds) {
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
