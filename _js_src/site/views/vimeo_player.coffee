class Site.Views.VimeoPlayer extends Backbone.View
  tagName: 'div'
  className: 'vimeo-player'

  initialize: (options) ->
    @collection.on "update", @render, @
    return
  
  render: ->
    model = @collection.find (vid) => 
      return ''+vid.id == ''+@id

    if model
      @$el.html( JST['site/templates/vimeo_player'](model: model))
    @