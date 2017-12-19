class Site.Models.FlickrPhotoset extends Backbone.Model

  urlM: () ->
    extras = @get('primary_photo_extras')
    return extras.url_m

  description: () ->
    description = @get('description')
    return description._content

  title: () ->
    title = @get('title')
    return title._content
