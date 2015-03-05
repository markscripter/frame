var gulp = require('gulp');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var express = require('gulp-express');
var wrapper = require('gulp-wrapper');
var react = require('gulp-react');
var glob = require('glob');
var path = require('path');
var pageData = require('./helpers/page-data');

var DEST = 'public/';
var SRC = "/";

var paths = {
  scripts: ['server/**/**.js'],
  jade: 'server/views/pages/*.jade',
  scss: ['server/sass/**.js'],
  json: ['server/config/pages/**.json'],
  bower: ['server/bower_components/underscore/underscore-min.js',
          'server/bower_components/backbone/backbone.js',
          'server/bower_components/react/react.min.js',
          'server/bower_components/react/JSXTransformer.js',
          'server/bower_components/jquery/dist/jquery.min.js'],
  react: ['server/components/**.jsx']
};

gulp.task('default', ['jade', 'styles', 'javascript', 'react', 'express', 'watch']);

gulp.task('jade', function () {
  glob(paths.jade, {}, function (err, page) {
    if (err) {console.log(err); }
    gulp.src(page)
      .pipe(jade({
        locals: pageData(page)
      }))
      .pipe(gulp.dest(DEST));
  });
});

gulp.task('styles', function () {
  gulp.src('./server/sass/main.scss')
     .pipe(sass())
     .pipe(gulp.dest(DEST + 'css/'));
});

gulp.task('javascript', function () {
  gulp.src(paths.bower)
      .pipe(jshint())
      .pipe(uglify())
      .pipe(wrapper({
      header : '/* \n ${filename} \n */ \n'
    }))
      .pipe(concat('main.min.js'))
      .pipe(gulp.dest(DEST + 'js/'));
});

gulp.task('react', function () {
  gulp.src(paths.react)
      .pipe(react({harmony: true}))
      .pipe(gulp.dest(DEST + 'js/components/'));
});

gulp.task('express', function () {
  express.run({
    file: 'app.js'
  });
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['javascript', 'express']);
  gulp.watch([paths.jade, paths.json], ['jade', 'express']);
  gulp.watch(paths.scss, ['styles', 'express']);
  gulp.watch(paths.react, ['react']);
});