class Site.Views.FlickrPhotosetPhotos extends Backbone.View
  tagName: 'ul'
  className: 'flickr-photoset__photos'

  initialize: (options) ->
    #@collection.on "update", @renderPhotos, @
    @collection.on "sync", @renderPhotos, @
    return

  render: ->
    @$el.empty()
    @$el.append(JST['site/templates/flickr_photoset_photos']())
    @


  renderPhotos: ->
    self = @
    first = @collection.first()
    @collection.forEach (photo) =>
      view = new Site.Views.FlickrPhotoThumbnail( model: photo, collection: @collection, parent: self )
      @$el.append( view.render().el )
      return
    @showPhoto(first)

  showPhoto: (photo) ->
    console.log(photo);
    view = new Site.Views.FlickrPhoto( model: photo)
    console.log(view)

    this.$("#flickr-photo").html(view.render().el )
