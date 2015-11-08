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
  
  initVideos: () ->
    new Site.Routes.Videos;
    Backbone.history.start();