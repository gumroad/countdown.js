# Countdown.js [![Build Status](https://travis-ci.org/gumroad/countdown.js.png)](https://travis-ci.org/gumroad/countdown.js)


Countdown.js is a library that allows developers to set countdowns for any kind of interaction.  For example, if you would
like to submit a form, Countdown.js allows you to set a 5 second countdown and give the user a chance to cancel the
submission. You can see it in action [here](http://gumroad.github.io/countdown.js/).

## API

### new Countdown(duration, onTick, onComplete)

Begins a countdown.  After `duration` time has passed, the function `onComplete `will be executed.  Every second, the `onTick`
function will be executed.  

Example:

```javascript
var countdown = new Countdown(5, function(seconds) {
  console.log(seconds); //log the number of seconds that have passed
}, function() {
   console.log("Countdown complete!") //log that the countdown has complete
});
```

### abort()

Terminates countdown.  

Example:

```javascript
countdown.abort();
```

### getRemainingTime()

Returns remaining time in seconds.

Example:

```javascript
countdown.getRemainingTime(); //=> 4
```

## Example

[http://gumroad.github.io/countdown.js/](http://gumroad.github.io/countdown.js/)

## Contribute

Install development dependencies
```
npm install
```

## Test

```
npm test
```
