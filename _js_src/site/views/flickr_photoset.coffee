class Site.Views.FlickrPhotoset extends Backbone.View
  tagName: 'li'

  render: ->
    @$el.html( JST['site/templates/flickr_photoset'](model: @model))
    @
