var assert = require("assert")
  , sinon = require('sinon')
  , clock
  , tickFunction
  , callbackFunction;

Countdown = require("../lib/countdown");

describe("countdown.js", function() {
  beforeEach(function() {
    clock = sinon.useFakeTimers();
    tickFunction = sinon.spy();
    callbackFunction = sinon.spy();
  });

  afterEach(function() {
    clock.restore();
  });

  describe("Countdown.start", function() {
    it("executes onTick while countdown is running", function() {
      new Countdown(5, tickFunction, callbackFunction);
      assert(tickFunction.callCount == 1);
      clock.tick(1000);
      assert(tickFunction.callCount == 2);
      clock.tick(1000);
      assert(tickFunction.callCount == 3);
      clock.tick(1000);
      assert(tickFunction.callCount == 4);
      clock.tick(1000);
      assert(tickFunction.callCount == 5);
      clock.tick(1000);
      assert(tickFunction.callCount == 5);
    });

    it("executes onTick while countdown is running with user specified step interval", function() {
      new Countdown(5, tickFunction, callbackFunction, 2);
      assert(tickFunction.callCount == 1);
      clock.tick(1000);
      assert(tickFunction.callCount == 1);
      clock.tick(1000);
      assert(tickFunction.callCount == 2);
      clock.tick(1000);
      assert(tickFunction.callCount == 2);
      clock.tick(1000);
      assert(tickFunction.callCount == 3);
      clock.tick(1000);
      assert(tickFunction.callCount == 3);
    });

    it("defaults to 1 second ticks with invalid step parameter", function() {
      new Countdown(2, tickFunction, callbackFunction, -1);
      assert(tickFunction.callCount == 1);
      clock.tick(1000);
      assert(tickFunction.callCount == 2);
      clock.tick(1000);
      new Countdown(2, tickFunction, callbackFunction, []);
      assert(tickFunction.callCount == 3);
      clock.tick(1000);
      assert(tickFunction.callCount == 4);
      clock.tick(1000);
      new Countdown(2, tickFunction, callbackFunction, {});
      assert(tickFunction.callCount == 5);
      clock.tick(1000);
      assert(tickFunction.callCount == 6);
      clock.tick(1000);
      new Countdown(2, tickFunction, callbackFunction, 'invalid');
      assert(tickFunction.callCount == 7);
      clock.tick(1000);
      assert(tickFunction.callCount == 8);
      clock.tick(1000);
      new Countdown(2, tickFunction, callbackFunction, true);
      assert(tickFunction.callCount == 9);
      clock.tick(1000);
      assert(tickFunction.callCount == 10);
      clock.tick(1000);
    });

    it("executes onComplete", function() {
      new Countdown(5, tickFunction, callbackFunction);
      clock.tick(4000);
      assert(callbackFunction.callCount == 0);
      clock.tick(5000);
      assert(callbackFunction.callCount == 1);
    });

    it("executes onComplete at 2 ticks for 2.4", function() {
      new Countdown(2.4, tickFunction, callbackFunction);
      clock.tick(1000);
      assert(callbackFunction.callCount == 0);
      clock.tick(1000);
      assert(callbackFunction.callCount == 1);
      // Ensure this is Math.round behavior
      clock.tick(1000);
      assert(callbackFunction.callCount == 1);
    });

    it("executes onComplete at 3 ticks for 2.5", function() {
      new Countdown(2.5, tickFunction, callbackFunction);
      clock.tick(1000);
      assert(callbackFunction.callCount == 0);
      clock.tick(1000);
      assert(callbackFunction.callCount == 0);
      // Ensure this is Math.round behavior
      clock.tick(1000);
      assert(callbackFunction.callCount == 1);
    });
  });

  describe("aborting countdown", function() {
    var countdown;

    beforeEach(function() {
      countdown = new Countdown(5, tickFunction, callbackFunction);
    });

    it("calls onTick the correct number of times", function() {
      assert(tickFunction.callCount == 1);
      clock.tick(1000);
      assert(tickFunction.callCount == 2);
      countdown.abort();
      clock.tick(1000);
      assert(tickFunction.callCount == 2);
    });

    it("does not call onComplete", function() {
      countdown.abort();
      clock.tick(5000);
      assert(callbackFunction.callCount == 0);
    });
  });

  describe("getRemainingTime", function() {
    var countdown;

    beforeEach(function() {
      this.countdown = new Countdown(5, tickFunction, callbackFunction);
    });

    it("calls returns the correct getRemainingTime immediately on the next tick", function() {
      assert(this.countdown.getRemainingTime() === 4);
    });

    it("calls returns the correct getRemainingTime on a clock tick tick", function() {
      assert(this.countdown.getRemainingTime() === 4);
      clock.tick(1000);
      assert(this.countdown.getRemainingTime() === 3);
    });
  });
});
