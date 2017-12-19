class Site.Collections.FlickrPhotosetPhotos extends Backbone.Collection
  parse: (resp, xhr) ->
    return resp.photoset.photo

  url: (params) ->
    'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' +
    Site.flickrApiKey +
    '&user_id=' +
    Site.flickrUserId +
    '&photoset_id=' +
    this.photosetId +
    '&extras=description&format=json&nojsoncallback=1'

  findById: (photosetId) =>
    this.photosetId = photosetId
    this.fetch()

  model: Site.Models.FlickrPhoto
