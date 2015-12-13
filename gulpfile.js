var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var nunjucks = require('gulp-nunjucks-html');
 
gulp.task('nunjucks', function() {
  return gulp.src('templates/**/*.html')
    .pipe(nunjucks({
      searchPaths: ['templates']
    }))
    .pipe(gulp.dest('dist'));
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
