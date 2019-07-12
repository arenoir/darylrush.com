(function() {
  this.Site = {
    Models: {},
    Collections: {},
    Views: {},
    Routes: {},
    flickrApiKey: '851c8ee9117734be65255c2681370da0',
    flickrUserId: '155630248@N03',
    initVideos: function() {
      new Site.Routes.Videos;
      return Backbone.history.start();
    },
    initPhotoSets: function() {
      new Site.Routes.FlickrPhotosets;
      return Backbone.history.start();
    }
  };

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Site.Models.FlickrPhoto = (function(superClass) {
    extend(FlickrPhoto, superClass);

    function FlickrPhoto() {
      return FlickrPhoto.__super__.constructor.apply(this, arguments);
    }

    FlickrPhoto.prototype.imageUrl = function(size) {
      size || (size = 'q');
      return 'https://farm' + this.get('farm') + '.staticflickr.com/' + this.get('server') + '/' + this.get('id') + '_' + this.get('secret') + '_' + size + '.jpg';
    };

    FlickrPhoto.prototype.description = function() {
      var description;
      description = this.get('description');
      return description._content;
    };

    FlickrPhoto.prototype.title = function() {
      return this.get('title');
    };

    return FlickrPhoto;

  })(Backbone.Model);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Site.Models.FlickrPhotoset = (function(superClass) {
    extend(FlickrPhotoset, superClass);

    function FlickrPhotoset() {
      return FlickrPhotoset.__super__.constructor.apply(this, arguments);
    }

    FlickrPhotoset.prototype.urlM = function() {
      var extras;
      extras = this.get('primary_photo_extras');
      return extras.url_m;
    };

    FlickrPhotoset.prototype.description = function() {
      var description;
      description = this.get('description');
      return description._content;
    };

    FlickrPhotoset.prototype.title = function() {
      var title;
      title = this.get('title');
      return title._content;
    };

    return FlickrPhotoset;

  })(Backbone.Model);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Site.Models.VimeoVideo = (function(superClass) {
    extend(VimeoVideo, superClass);

    function VimeoVideo() {
      return VimeoVideo.__super__.constructor.apply(this, arguments);
    }

    return VimeoVideo;

  })(Backbone.Model);

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Site.Collections.FlickrPhotosetPhotos = (function(superClass) {
    extend(FlickrPhotosetPhotos, superClass);

    function FlickrPhotosetPhotos() {
      this.findById = bind(this.findById, this);
      return FlickrPhotosetPhotos.__super__.constructor.apply(this, arguments);
    }

    FlickrPhotosetPhotos.prototype.parse = function(resp, xhr) {
      return resp.photoset.photo;
    };

    FlickrPhotosetPhotos.prototype.url = function(params) {
      return 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + Site.flickrApiKey + '&user_id=' + Site.flickrUserId + '&photoset_id=' + this.photosetId + '&extras=description&format=json&nojsoncallback=1';
    };

    FlickrPhotosetPhotos.prototype.findById = function(photosetId) {
      this.photosetId = photosetId;
      return this.fetch();
    };

    FlickrPhotosetPhotos.prototype.model = Site.Models.FlickrPhoto;

    return FlickrPhotosetPhotos;

  })(Backbone.Collection);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Site.Collections.FlickrPhotosets = (function(superClass) {
    extend(FlickrPhotosets, superClass);

    function FlickrPhotosets() {
      return FlickrPhotosets.__super__.constructor.apply(this, arguments);
    }

    FlickrPhotosets.prototype.url = function() {
      return 'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=' + Site.flickrApiKey + '&user_id=' + Site.flickrUserId + '&primary_photo_extras=url_m,url_o&format=json&nojsoncallback=1';
    };

    FlickrPhotosets.prototype.parse = function(resp, xhr) {
      return resp.photosets.photoset;
    };

    FlickrPhotosets.prototype.model = Site.Models.FlickrPhotoset;

    return FlickrPhotosets;

  })(Backbone.Collection);

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
      return 'https://vimeo.com/api/v2/darylrush/videos.json';
    };

    VimeoVideos.prototype.model = Site.Models.VimeoVideo;

    return VimeoVideos;

  })(Backbone.Collection);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Site.Views.FlickrPhoto = (function(superClass) {
    extend(FlickrPhoto, superClass);

    function FlickrPhoto() {
      return FlickrPhoto.__super__.constructor.apply(this, arguments);
    }

    FlickrPhoto.prototype.className = 'flickr-photo';

    FlickrPhoto.prototype.render = function() {
      this.$el.html(JST['site/templates/flickr_photo']({
        model: this.model,
        size: 'b'
      }));
      return this;
    };

    return FlickrPhoto;

  })(Backbone.View);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Site.Views.FlickrPhotoThumbnail = (function(superClass) {
    extend(FlickrPhotoThumbnail, superClass);

    function FlickrPhotoThumbnail() {
      return FlickrPhotoThumbnail.__super__.constructor.apply(this, arguments);
    }

    FlickrPhotoThumbnail.prototype.initialize = function(options) {
      this.parent = options.parent;
      return this.model = options.model;
    };

    FlickrPhotoThumbnail.prototype.tagName = 'li';

    FlickrPhotoThumbnail.prototype.className = 'flickr-photo__thumbnail';

    FlickrPhotoThumbnail.prototype.events = {
      'click': 'showPhoto'
    };

    FlickrPhotoThumbnail.prototype.render = function() {
      this.$el.html(JST['site/templates/flickr_photo_thumbnail']({
        model: this.model
      }));
      return this;
    };

    FlickrPhotoThumbnail.prototype.showPhoto = function() {
      return this.parent.showPhoto(this.model);
    };

    return FlickrPhotoThumbnail;

  })(Backbone.View);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Site.Views.FlickrPhotoset = (function(superClass) {
    extend(FlickrPhotoset, superClass);

    function FlickrPhotoset() {
      return FlickrPhotoset.__super__.constructor.apply(this, arguments);
    }

    FlickrPhotoset.prototype.tagName = 'li';

    FlickrPhotoset.prototype.render = function() {
      this.$el.html(JST['site/templates/flickr_photoset']({
        model: this.model
      }));
      return this;
    };

    return FlickrPhotoset;

  })(Backbone.View);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Site.Views.FlickrPhotosetPhotos = (function(superClass) {
    extend(FlickrPhotosetPhotos, superClass);

    function FlickrPhotosetPhotos() {
      return FlickrPhotosetPhotos.__super__.constructor.apply(this, arguments);
    }

    FlickrPhotosetPhotos.prototype.initialize = function(options) {
      this.collection.on("sync", this.renderPhotos, this);
    };

    FlickrPhotosetPhotos.prototype.render = function() {
      this.$el.empty();
      this.$el.append(JST['site/templates/flickr_photoset_photos']());
      return this;
    };

    FlickrPhotosetPhotos.prototype.renderPhotos = function() {
      var first, self;
      self = this;
      first = this.collection.first();
      this.collection.forEach((function(_this) {
        return function(photo) {
          var view;
          view = new Site.Views.FlickrPhotoThumbnail({
            model: photo,
            collection: _this.collection,
            parent: self
          });
          _this.$("#thumbnails-container").append(view.render().el);
        };
      })(this));
      return this.showPhoto(first);
    };

    FlickrPhotosetPhotos.prototype.showPhoto = function(photo) {
      var view;
      view = new Site.Views.FlickrPhoto({
        model: photo
      });
      return this.$("#photo-container").html(view.render().el);
    };

    return FlickrPhotosetPhotos;

  })(Backbone.View);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Site.Views.FlickrPhotosets = (function(superClass) {
    extend(FlickrPhotosets, superClass);

    function FlickrPhotosets() {
      return FlickrPhotosets.__super__.constructor.apply(this, arguments);
    }

    FlickrPhotosets.prototype.tagName = 'ul';

    FlickrPhotosets.prototype.className = 'flickr-photosets';

    FlickrPhotosets.prototype.initialize = function(options) {
      this.collection.on("update", this.render, this);
    };

    FlickrPhotosets.prototype.render = function() {
      console.log('fhotosets view');
      this.$el.empty();
      this.collection.forEach((function(_this) {
        return function(photoset) {
          var view;
          console.log(photoset);
          view = new Site.Views.FlickrPhotoset({
            model: photoset,
            collection: _this.collection
          });
          _this.$el.append(view.render().el);
        };
      })(this));
      return this;
    };

    return FlickrPhotosets;

  })(Backbone.View);

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
  Site.Routes.FlickrPhotosets = Backbone.Router.extend({
    routes: {
      '': 'index',
      'gallery/:id': 'show'
    },
    initialize: function(options) {
      this.el = $("#flickr-photosets");
      this.collection = new Site.Collections.FlickrPhotosets();
      this.collection.fetch();
      return this.captureLinks();
    },
    index: function() {
      var view;
      view = new Site.Views.FlickrPhotosets({
        collection: this.collection
      });
      return this.el.html(view.render().el);
    },
    show: function(id) {
      var photos, view;
      photos = new Site.Collections.FlickrPhotosetPhotos();
      photos.findById(id);
      view = new Site.Views.FlickrPhotosetPhotos({
        collection: photos
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
(function() { this.JST || (this.JST = {}); this.JST["site/templates/flickr_photo"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<img src="', model.imageUrl(size),'" alt="" />\n\n<h3>', model.title(),'</h3>\n\n<p>\n  ', model.description(),'  \n</p>\n');}return __p.join('');};
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["site/templates/flickr_photo_thumbnail"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<img src="', model.imageUrl(),'" alt="" />\n');}return __p.join('');};
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["site/templates/flickr_photoset"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="flickr-photosets__photoset">\n  <a class="flickr-photosets__photoset__image" href="#/gallery/', model.get('id'),'">\n    <img src="', model.urlM(),'" alt="" />\n  </a>\n\n  <p class="flickr-photosets__photoset__description">\n    ', model.description(),'\n  </p>\n\n  <br/>\n\n  <a class="flickr-photosets__photoset__title" href="#/gallery/', model.get('id'),'">\n    ', model.title(),'\n  </a>\n</div>\n');}return __p.join('');};
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["site/templates/flickr_photoset_photos"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div id="photo-container"></div>\n<ul id="thumbnails-container"></ul>\n');}return __p.join('');};
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["site/templates/vimeo_player"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<h2 class="title">\n  ', model.get('title'),'\n</h2>\n\n<iframe id="vimeoplayer" src="https://player.vimeo.com/video/', model.get('id'),'?api=1&amp;player_id=vimeoplayer" width="800" height="455" frameborder="0"></iframe>\n\n<div class="description">\n  ', model.get('description'),'\n  <br/>\n  <a href="#">Back to list</a>\n</div>\n');}return __p.join('');};
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["site/templates/vimeo_video"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<a href="#', model.get('id'),'">\n  <div class="thumbnail">\n    <img src="', model.get('thumbnail_medium'),'"/>\n  </div>\n</a>\n\n<div class="description">\n  ', model.get('description'),'\n</div>\n<div class="title">\n  <a href="#', model.get('id'),'">', model.get('title'),'</a>\n</div>\n');}return __p.join('');};
}).call(this);
