class Site.Collections.VimeoVideos extends Backbone.Collection
  url: ->
    'https://vimeo.com/api/v2/darylrush/videos.json'

  model: Site.Models.VimeoVideo
