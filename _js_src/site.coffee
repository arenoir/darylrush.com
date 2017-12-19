#= require_self
#= require_tree ./site/models
#= require_tree ./site/collections
#= require_tree ./site/views
#= require_tree ./site/routes
#= require_tree ./site/templates


@Site =
  Models: {}
  Collections: {}
  Views: {}
  Routes: {}
  flickrApiKey: '851c8ee9117734be65255c2681370da0'
  flickrUserId: '155630248@N03'

  initVideos: () ->
    new Site.Routes.Videos;
    Backbone.history.start();

  initPhotoSets: () ->
    new Site.Routes.FlickrPhotosets;
    Backbone.history.start();
