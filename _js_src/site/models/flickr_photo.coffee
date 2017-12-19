class Site.Models.FlickrPhoto extends Backbone.Model
  imageUrl: (size) ->
    size ||= 'q'
    'https://farm' + @get('farm') + '.staticflickr.com/' + @get('server') + '/' + @get('id') + '_' + @get('secret') + '_' + size + '.jpg'

  description: () ->
    description = @get('description')
    return description._content

  title: () ->
    return @get('title')
