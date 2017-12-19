class Site.Views.FlickrPhotosets extends Backbone.View
  tagName: 'ul'
  className: 'flickr-photosets'

  initialize: (options) ->
    @collection.on "update", @render, @
    return

  render: ->
    console.log('fhotosets view')

    @$el.empty()
    @collection.forEach (photoset) =>
      console.log(photoset)
      view = new Site.Views.FlickrPhotoset( model: photoset, collection: @collection )
      @$el.append( view.render().el )
      return
    @
