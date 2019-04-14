//Bring in dependencies
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const image = require('gulp-image');
const del = require('del');
const webserver = require('gulp-webserver');
const inject = require('gulp-inject');

//File paths
const distRoot = './dist';
//----Javascript
const jsRoot = './js';
const jsDist = `${distRoot}/scripts`;
const jsFiles = [
  `${jsRoot}/circle/autogrow.js`,
  `${jsRoot}/circle/circle.js`,
  `${jsRoot}/global.js`
];
//----Sass
const sassRoot = './sass';
const sassDist = `${distRoot}/styles`;
const sassFiles = `${sassRoot}/**/*.scss`;
//----Images
const imgRoot = './images';
const imgDist = './dist/content';
const imgFiles = `${imgRoot}/*`;
//----HTML and Other Static Resources
const htmlFiles = './*.html';
const iconsFiles = './icons/**';

function scripts() {
  return gulp
    .src(jsFiles, { sourcemaps: true })
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDist, { sourcemaps: '.' }));
}

function styles() {
  return gulp
    .src(sassFiles, { sourcemaps: true })
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename('all-min-css.css'))
    .pipe(gulp.dest(sassDist, { sourcemaps: '.' }));
}

function images() {
  return gulp
    .src(imgFiles)
    .pipe(image())
    .pipe(gulp.dest(imgDist));
}

function copyStatic() {
  return gulp.src([htmlFiles, iconsFiles], { base: './' }).pipe(gulp.dest(distRoot));
}

function clean() {
  return del(`${distRoot}/*`);
}

function server() {
  return gulp.src(distRoot).pipe(
    webserver({
      livereload: true,
      open: true
    })
  );
}

function watch() {
  gulp.watch(sassFiles, styles);
}

const build = gulp.series([clean, gulp.parallel([scripts, styles, images, copyStatic])]);

exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.clean = clean;
exports.watch = watch;

exports.build = build;
exports.default = gulp.series([build, server, watch]);
