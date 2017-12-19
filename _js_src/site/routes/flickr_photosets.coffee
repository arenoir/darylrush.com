Site.Routes.FlickrPhotosets = Backbone.Router.extend
  routes:
    '': 'index'
    'gallery/:id': 'show'

  initialize: (options) ->
    @el = $("#flickr-photosets")
    @collection = new Site.Collections.FlickrPhotosets()
    @collection.fetch()
    @captureLinks()


  index: ->
    view = new Site.Views.FlickrPhotosets(collection: @collection)
    @el.html(view.render().el)

  show: (id) ->
    photos = new Site.Collections.FlickrPhotosetPhotos()
    photos.findById(id)
    view = new Site.Views.FlickrPhotosetPhotos(collection: photos)
    @el.html(view.render().el)

  captureLinks: ->
    router = @
    @el.on "click", "a", (event) ->
      event.preventDefault();
      href = $(this).attr("href").replace(/^#/, '')
      router.navigate(href, {trigger: true})
      return false
