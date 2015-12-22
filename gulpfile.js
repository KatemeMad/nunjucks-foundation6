var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var nunjucksRender = require('gulp-nunjucks-render');

// define plug-ins
var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var mainBowerFiles = require('main-bower-files');

// Define paths variables
var dest_path =  'public';
// grab libraries files from bower_components, minify and push in /public
gulp.task('publish-components', function() {
  var jsFilter = gulpFilter('*.js', {restore: true}),
      cssFilter = gulpFilter('*.css', {restore: true}),
      fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf'], {restore: true});

  return gulp.src(mainBowerFiles())

  // grab vendor js files from bower_components, minify and push in /public
  .pipe(jsFilter)
  .pipe(gulp.dest(dest_path + '/js/'))
  .pipe(uglify())
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(gulp.dest(dest_path + '/js/'))
  .pipe(jsFilter.restore)

  // grab vendor css files from bower_components, minify and push in /public
  .pipe(cssFilter)
  .pipe(gulp.dest(dest_path + '/css'))
  .pipe(minifycss())
  .pipe(rename({
      suffix: ".min"
  }))
  .pipe(gulp.dest(dest_path + '/css'))
  .pipe(cssFilter.restore)

  // grab vendor font files from bower_components and push in /public
  .pipe(fontFilter)
  .pipe(flatten())
  .pipe(gulp.dest(dest_path + '/fonts'));
});

gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['src/templates/']);

  // Gets .html and .nunjucks files in pages
  return gulp.src('src/templates/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender())
  // output files in app folder
  .pipe(gulp.dest('public'))
});

var sassPaths = [
  'src/bower_components/foundation-sites/scss',
  'src/bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('src/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['sass', 'nunjucks', 'publish-components'], function() {
  gulp.watch(['src/scss/**/*.scss'], ['sass']);
  gulp.watch(['src/templates/**/*.html'], ['nunjucks']);
});
