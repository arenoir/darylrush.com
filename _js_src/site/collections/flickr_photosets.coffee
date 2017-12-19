class Site.Collections.FlickrPhotosets extends Backbone.Collection

  url: ->
    'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=' +
    Site.flickrApiKey +
    '&user_id=' +
    Site.flickrUserId +
    '&primary_photo_extras=url_m,url_o&format=json&nojsoncallback=1'

  parse: (resp, xhr) ->
    return resp.photosets.photoset


  model: Site.Models.FlickrPhotoset
