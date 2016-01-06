const path = require('path');
const gulp = require('gulp');
const $    = require('gulp-load-plugins')();
const nunjucksRender = require('gulp-nunjucks-render');
const bower = require('gulp-bower');

const publicRoot = 'public';
const bowerDir = 'src/bower_components';

// publish bower libraries
gulp.task('bower', function() {
    return bower()
    .pipe(gulp.dest( path.join(publicRoot, 'lib/') ))
});

// Nunjucks
gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['src/templates/']);

  // Gets .html and .nunjucks files in pages
  return gulp.src('src/templates/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender())
  // output files in app folder
  .pipe(gulp.dest(publicRoot))
});


// SASS
var sassPaths = [
  path.join(bowerDir, 'foundation-sites/scss'),
  path.join(bowerDir, 'motion-ui/src')
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
    .pipe(gulp.dest( path.join(publicRoot, 'css') ));
});

gulp.task('default', ['sass', 'nunjucks', 'bower'], function() {
  gulp.watch(['src/scss/**/*.scss'], ['sass']);
  gulp.watch(['src/templates/**/*.html'], ['nunjucks']);
});
