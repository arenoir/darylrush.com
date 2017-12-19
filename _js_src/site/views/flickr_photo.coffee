class Site.Views.FlickrPhoto extends Backbone.View
  tagName: 'div'
  className: 'flickr-photo'

  render: ->
    @$el.html( JST['site/templates/flickr_photo'](model: @model, size: 'h'))
    @
