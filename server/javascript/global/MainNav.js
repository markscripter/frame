var MainNav = (function () {
  var instance;

  function _init(opts) {
    var _opts = _.extend({
      el: $('#mainNav'),
      trigger: $('[aria-controls="mainNav"]')
    }, opts);


    function toggleMenu() {
      if (_opts.el.attr('aria-expanded') === "true") {
        // currently open, close
        _opts.el.attr('aria-expanded', false)
                .attr('aria-hidden', true);
        _opts.trigger.attr('aria-expanded', false);
      } else {
        // currently closed, open
        _opts.el.attr('aria-expanded', true)
                .attr('aria-hidden', false);
        _opts.trigger.attr('aria-expanded', true);
      }
    }

    // events
    _opts.trigger.on("click", toggleMenu.bind(_opts));
  }

  return {
    getInstance : function (options) {
      if (!instance) {
        instance = _init(options);
      }
      return instance;
    }
  };
})();

var mainNav = MainNav.getInstance();