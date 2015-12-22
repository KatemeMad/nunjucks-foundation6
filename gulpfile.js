var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var nunjucksRender = require('gulp-nunjucks-render');
 
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

gulp.task('default', ['sass', 'nunjucks'], function() {
  gulp.watch(['src/scss/**/*.scss'], ['sass']);
  gulp.watch(['src/templates/**/*.html'], ['nunjucks']);
});
