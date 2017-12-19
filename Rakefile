require 'sprockets'
require 'coffee-script'



namespace :assets do

  def sprockets
    environment = Sprockets::Environment.new
    environment.append_path '_js_src'
    environment
  end

  desc 'compile assets'
  task :compile => [:compile_js] do
  end

  desc 'compile javascript assets'
  task :compile_js do
    asset     = sprockets['vendor']
    outfile   = Pathname.new('assets/js').join('vendor.js') # may want to use the digest in the future?
    FileUtils.mkdir_p outfile.dirname
    asset.write_to(outfile)

    asset     = sprockets['site']
    outfile   = Pathname.new('assets/js').join('site.js') # may want to use the digest in the future?
    FileUtils.mkdir_p outfile.dirname
    asset.write_to(outfile)

    puts "successfully compiled js assets"
  end

  # todo: add :clean_all, :clean_css, :clean_js tasks, invoke before writing new file(s)
end
