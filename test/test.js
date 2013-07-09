var assert = require("assert")
  , $ = require("jquery")
  , sinon = require('sinon')
  , clock;

  global.jQuery = $;

require("../lib/jquery.countdown");

describe("jquery.countdown", function() {
  beforeEach(function() {
    clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    clock.restore();
  });

  describe("$.countdown", function() {
    it("executes onTick while countdown is running", function() {
      var spy1 = sinon.spy()
        , spy2 = sinon.spy();

      $.countdown(5, spy1, spy2);
      assert(spy1.callCount == 1);
      clock.tick(1000);
      assert(spy1.callCount == 2);
      clock.tick(1000);
      assert(spy1.callCount == 3);
      clock.tick(1000);
      assert(spy1.callCount == 4);
    });

    it("executes callback", function() {
      var spy1 = sinon.spy()
        , spy2 = sinon.spy();

      $.countdown(5, spy1, spy2);
      clock.tick(5000);
      assert(spy2.callCount == 1);
    });
  });

  describe("aborting countdown", function() {
    it("calls onTick the correct number of times", function() {
      var spy1 = sinon.spy()
        , spy2 = sinon.spy();

      var countdown = $.countdown(5, spy1, spy2);

      assert(spy1.callCount == 1);
      clock.tick(1000);
      assert(spy1.callCount == 2);
      countdown.abort();
      clock.tick(1000);
      assert(spy1.callCount == 2);
      clock.tick(3000);
      assert(spy2.callCount == 0);
    });
  });
});
