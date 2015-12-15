var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var nunjucksRender = require('gulp-nunjucks-render');
 
gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['templates/']);

  // Gets .html and .nunjucks files in pages
  return gulp.src('templates/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender())
  // output files in app folder
  .pipe(gulp.dest('dist'))
});

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass', 'nunjucks'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['templates/**/*.html'], ['nunjucks']);
});
