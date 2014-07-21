// Gulp Task Modules
var gulp       = require('gulp');
var gutil      = require('gulp-util');
var jshint     = require('gulp-jshint');
var browserify = require('gulp-browserify');
var concat     = require('gulp-concat');
var clean      = require('gulp-clean');

// Server
var embedlr = require('gulp-embedlr');
var refresh = require('gulp-livereload');
var lrserver = require('tiny-lr')();
var express = require('express');
var livereload = require('connect-livereload');
var livereloadport = 35728;
var serverport = 5000;

var server = express();
server.use(livereload({port: livereloadport}));
server.use(express.static('./dist'));
server.all('/*', function(req, res) {
  res.sendfile('views/index.html', { root: 'dist' });
});

gulp.task('lint', function() {
  gulp.src('./app/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function() {
  gulp.src(['app/app.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('views', function() {
  gulp.src('app/views/*.html')
  .pipe(gulp.dest('dist/views/'))
  .pipe(refresh(lrserver));
});

gulp.task('dev', function() {
  server.listen(serverport);
  lrserver.listen(livereloadport);

  gulp.watch(['app/*.js', 'app/**/*.js'], [
    'lint',
    'browserify'
  ]);

  gulp.watch(['app/views/**/*.html'], [
    'views'
  ]);
});
