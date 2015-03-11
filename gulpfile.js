var gulp = require('gulp');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var express = require('gulp-express');
var wrapper = require('gulp-wrapper');
var react = require('gulp-react');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var glob = require('glob');
var path = require('path');
var pageData = require('./helpers/page-data');

var DEST = 'public/';
var SRC = "/";

var paths = {
  scripts: ['server/**/**.js'],
  jsGlobal: "server/javascript/global/*.js",
  jsComps: "server/javascript/components/*.js",
  jade: 'server/views/pages/*.jade',
  views: 'server/views/partials/*.partial.jade',
  scss: ['server/sass/**.scss', 'server/sass/objects/**.scss'],
  json: ['server/views-data/**.json', 'server/views-data/partials/*.json'],
  bower: ['bower_components/underscore/underscore-min.js',
          'bower_components/backbone/backbone.js',
          'bower_components/react/react.min.js',
          'bower_components/react/JSXTransformer.js',
          'bower_components/jquery/dist/jquery.min.js'],
  react: ['server/components/**.jsx'],
  svg: 'server/svg/*.svg'
};

gulp.task('default', ['jade', 'styles', 'javascript', 'react', 'svg', 'express', 'watch']);

gulp.task('jade', function () {
  glob(paths.jade, {}, function (err, pages) {
    if (err) {console.log(err); }
    pages.forEach(function (page) {
      var jsonData = pageData(page);
      gulp.src(page)
        .pipe(jade({
          locals: jsonData
        }))
        .pipe(gulp.dest(DEST));
    });
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

  gulp.src(paths.jsGlobal)
      .pipe(jshint())
      //.pipe(uglify())
      .pipe(wrapper({
      header : '/* \n ${filename} \n */ \n'
    }))
      .pipe(concat('global.min.js'))
      .pipe(gulp.dest(DEST + 'js/'));
  gulp.src(paths.jsComps)
      .pipe(jshint())
      .pipe(uglify())
      .pipe(wrapper({
      header : '/* \n ${filename} \n */ \n'
    }))
      .pipe(gulp.dest(DEST + 'js/components'));
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

gulp.task('svg', function () {
  return gulp.src(paths.svg)
             .pipe(svgmin())
             .pipe(svgstore())
             .pipe(gulp.dest(DEST + 'media'));
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['javascript', 'express']);
  gulp.watch([paths.jade, paths.json, paths.views], ['jade', 'express']);
  gulp.watch(paths.scss, ['styles', 'express']);
  gulp.watch(paths.react, ['react']);
  gulp.watch(paths.svg, ['svg']);
});