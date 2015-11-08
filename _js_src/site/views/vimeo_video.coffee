class Site.Views.VimeoVideo extends Backbone.View
  tagName: 'li'
  
  render: ->
    @$el.html( JST['site/templates/vimeo_video'](model: @model))
    @