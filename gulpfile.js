const path = require('path');
const { src, dest, watch, series } = require('gulp');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');

const pagesSrc = path.resolve(__dirname, '_src/html/pages/**/*.ejs').replace(/\\/g, '/');
const partialsSrc = path.resolve(__dirname, '_src/html/partials/');
const watchSrc = path.resolve(__dirname, '_src/html/**/*.{ejs,js}').replace(/\\/g, '/');
const devOutputPath = path.resolve(__dirname, '_public');
const prodOutputPath = path.resolve(__dirname, '_dist');
const injectedObj = {}; // template helperやJSONはこちらのオブジェクトに追加していく
const opts = {
  root: partialsSrc,
};

function devEjs(cb) {
  src(pagesSrc)
    .pipe(plumber())
    .pipe(ejs(injectedObj, opts))
    .pipe(rename({extname: '.html'}))
    .pipe(dest(devOutputPath))

  cb();
}

function buildEjs(cb) {
  src(pagesSrc)
    .pipe(plumber())
    .pipe(ejs(injectedObj, opts))
    .pipe(rename({extname: '.html'}))
    .pipe(dest(prodOutputPath))

  cb();
}

function watchEjs(cb) {
  watch(watchSrc, series(devEjs));
  cb();
}

exports.devEjs = devEjs;
exports.buildEjs = buildEjs;
exports.watchEjs = watchEjs;