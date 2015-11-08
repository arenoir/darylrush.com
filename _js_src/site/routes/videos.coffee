Site.Routes.Videos = Backbone.Router.extend
  routes:
    '': 'index'
    ':id': 'show'

  
  initialize: (options) ->
    @el = $("#videos")
    @collection = new Site.Collections.VimeoVideos()
    @collection.fetch()
    @captureLinks()


  index: ->
    view = new Site.Views.VimeoVideos(collection: @collection)
    @el.html(view.render().el)

  show: (id) ->
    view = new Site.Views.VimeoPlayer(id: id, collection: @collection)    
    @el.html(view.render().el)
    

  captureLinks: ->
    router = @
    @el.on "click", "a", (event) ->
      event.preventDefault();
      href = $(this).attr("href").replace(/^#/, '')  
      router.navigate(href, {trigger: true})
      return false

