(function() {
  this.Site = {
    Models: {},
    Collections: {},
    Views: {},
    Routes: {},
    initVideos: function() {
      new Site.Routes.Videos;
      return Backbone.history.start();
    }
  };

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Site.Models.VimeoVideo = (function(superClass) {
    extend(VimeoVideo, superClass);

    function VimeoVideo() {
      return VimeoVideo.__super__.constructor.apply(this, arguments);
    }

    VimeoVideo.prototype.junk = function() {
      return 'test';
    };

    return VimeoVideo;

  })(Backbone.Model);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Site.Collections.VimeoVideos = (function(superClass) {
    extend(VimeoVideos, superClass);

    function VimeoVideos() {
      return VimeoVideos.__super__.constructor.apply(this, arguments);
    }

    VimeoVideos.prototype.url = function() {
      return 'http://vimeo.com/api/v2/darylrush/videos.json';
    };

    VimeoVideos.prototype.model = Site.Models.VimeoVideo;

    return VimeoVideos;

  })(Backbone.Collection);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Site.Views.VimeoPlayer = (function(superClass) {
    extend(VimeoPlayer, superClass);

    function VimeoPlayer() {
      return VimeoPlayer.__super__.constructor.apply(this, arguments);
    }

    VimeoPlayer.prototype.tagName = 'div';

    VimeoPlayer.prototype.className = 'vimeo-player';

    VimeoPlayer.prototype.initialize = function(options) {
      this.collection.on("update", this.render, this);
    };

    VimeoPlayer.prototype.render = function() {
      var model;
      model = this.collection.find((function(_this) {
        return function(vid) {
          return '' + vid.id === '' + _this.id;
        };
      })(this));
      if (model) {
        this.$el.html(JST['site/templates/vimeo_player']({
          model: model
        }));
      }
      return this;
    };

    return VimeoPlayer;

  })(Backbone.View);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Site.Views.VimeoVideo = (function(superClass) {
    extend(VimeoVideo, superClass);

    function VimeoVideo() {
      return VimeoVideo.__super__.constructor.apply(this, arguments);
    }

    VimeoVideo.prototype.tagName = 'li';

    VimeoVideo.prototype.render = function() {
      this.$el.html(JST['site/templates/vimeo_video']({
        model: this.model
      }));
      return this;
    };

    return VimeoVideo;

  })(Backbone.View);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Site.Views.VimeoVideos = (function(superClass) {
    extend(VimeoVideos, superClass);

    function VimeoVideos() {
      return VimeoVideos.__super__.constructor.apply(this, arguments);
    }

    VimeoVideos.prototype.tagName = 'ul';

    VimeoVideos.prototype.className = 'videos';

    VimeoVideos.prototype.initialize = function(options) {
      this.collection.on("update", this.render, this);
    };

    VimeoVideos.prototype.render = function() {
      this.$el.empty();
      this.collection.forEach((function(_this) {
        return function(video) {
          var view;
          view = new Site.Views.VimeoVideo({
            model: video,
            collection: _this.collection
          });
          _this.$el.append(view.render().el);
        };
      })(this));
      return this;
    };

    return VimeoVideos;

  })(Backbone.View);

}).call(this);
(function() {
  Site.Routes.Videos = Backbone.Router.extend({
    routes: {
      '': 'index',
      ':id': 'show'
    },
    initialize: function(options) {
      this.el = $("#videos");
      this.collection = new Site.Collections.VimeoVideos();
      this.collection.fetch();
      return this.captureLinks();
    },
    index: function() {
      var view;
      view = new Site.Views.VimeoVideos({
        collection: this.collection
      });
      return this.el.html(view.render().el);
    },
    show: function(id) {
      var view;
      view = new Site.Views.VimeoPlayer({
        id: id,
        collection: this.collection
      });
      return this.el.html(view.render().el);
    },
    captureLinks: function() {
      var router;
      router = this;
      return this.el.on("click", "a", function(event) {
        var href;
        event.preventDefault();
        href = $(this).attr("href").replace(/^#/, '');
        router.navigate(href, {
          trigger: true
        });
        return false;
      });
    }
  });

}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["site/templates/vimeo_player"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<h2 class="title">\n  ', model.get('title'),' \n</h2>\n\n<iframe id="vimeoplayer" src="http://player.vimeo.com/video/', model.get('id'),'?api=1&amp;player_id=vimeoplayer" width="800" height="455" frameborder="0"></iframe>\n\n<div class="description">\n  ', model.get('description'),'\n  <br/>\n  <a href="#">Back to list</a>\n</div>\n');}return __p.join('');};
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["site/templates/vimeo_video"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<a href="#', model.get('id'),'">\n  <div class="thumbnail">\n    <img src="', model.get('thumbnail_medium'),'"/>\n  </div>\n</a>\n\n<div class="description">\n  ', model.get('description'),'\n</div>\n<div class="title">\n  <a href="#', model.get('id'),'">', model.get('title'),'</a>\n</div>\n');}return __p.join('');};
}).call(this);
