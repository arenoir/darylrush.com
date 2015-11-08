class Site.Views.VimeoVideos extends Backbone.View
  tagName: 'ul'
  className: 'videos'

  initialize: (options) ->
    @collection.on "update", @render, @
    return

  render: ->
    @$el.empty()
    @collection.forEach (video) =>
      view = new Site.Views.VimeoVideo( model: video, collection: @collection )
      @$el.append( view.render().el )
      return
    @