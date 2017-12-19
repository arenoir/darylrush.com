class Site.Views.FlickrPhotoThumbnail extends Backbone.View
  initialize:(options) ->
    @parent = options.parent
    @model = options.model

  tagName: 'li'
  className: 'flickr-photo__thumbnail'
  events:
    'click': 'showPhoto'

  render: ->
    @$el.html( JST['site/templates/flickr_photo_thumbnail'](model: @model))
    @


  showPhoto: ->
    @parent.showPhoto(@model);
