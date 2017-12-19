class Site.Views.FlickrPhotosetPhotos extends Backbone.View

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
      @$("#thumbnails-container").append( view.render().el )
      return
    @showPhoto(first)

  showPhoto: (photo) ->
    view = new Site.Views.FlickrPhoto( model: photo)
    this.$("#photo-container").html(view.render().el )
