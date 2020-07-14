'use strict';

const gulp = require('gulp');
const debug = require('gulp-debug');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cssnano = require('gulp-cssnano');
const pug = require('gulp-pug');
const emitty = require('@emitty/core').configure();
const through2 = require('through2');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const prettyHtml = require('gulp-pretty-html');
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');
const del = require('del');
const newer = require('gulp-newer');

sass.compiler = require('node-sass');

emitty.language({
  extensions: ['.pug'],
  parser: require('@emitty/language-pug').parse,
});

const state = {
  // Changed files are written by the name of the task that will process them.
  // This is necessary to support more than one language in @emitty.
  watch: {
    templates: undefined,
  },
};

function getFilter(taskName) {
  return through2.obj(function (file, _encoding, callback) {
    emitty.filter(file.path, state.watch[taskName]).then((result) => {
      if (result) {
        this.push(file);
      }

      callback();
    });
  });
}

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

function clean() {
  return del('dist');
}

function styles() {
  return gulp
    .src('./src/styles/*.scss')
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer())
    .pipe(gulpIf(!isDev, gcmq()))
    .pipe(gulpIf(!isDev, cssnano()))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulp.dest('./dist/styles'));
}

function templates() {
  return gulp
    .src('src/**/*.pug')
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(gulpIf(global.watch, getFilter('templates')))
    .pipe(filter((file) => /src[\\\/]pages/.test(file.path)))
    .pipe(pug({ basedir: 'src' }))
    .pipe(
      gulpIf(
        isDev,
        prettyHtml({
          indent_size: 2,
          indent_char: ' ',
          unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br'],
        })
      )
    )
    .pipe(rename({ dirname: '.' }))
    .pipe(gulp.dest('dist'));
}

function server(cb) {
  browserSync.init({
    files: ['dist/**/*'],
    server: {
      baseDir: ['dist/assets', 'dist'],
    },
  });

  browserSync.watch('src/**/*.*').on('change', browserSync.reload);

  cb();
}

function copy() {
  return gulp
    .src('src/assets/**/*', { since: gulp.lastRun(copy) })
    .pipe(newer('dist'))
    .pipe(gulp.dest('./dist/assets'));
}

function watch() {
  global.watch = true;

  gulp.watch('src/{styles,components}/**/*.scss', gulp.series(styles));
  gulp.watch('src/{pages,components}/**/*.pug', gulp.series(templates));
  gulp.watch('src/assets/**/*.*', gulp.series(copy));
}

exports.build = gulp.series(clean, gulp.parallel(copy, styles, templates));
exports.default = gulp.series(
  clean,
  gulp.parallel(copy, styles, templates),
  server,
  watch
);
