////////////////////////////
// Bring in dependencies //
//////////////////////////

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const image = require('gulp-image');
const del = require('del');
const webserver = require('gulp-webserver');

/////////////////
// File paths //
///////////////

//----Root directory
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

///////////////
//  Tasks  //
////////////

//----Handles minification of javascript files
function scripts() {
  return gulp
    .src(jsFiles, { sourcemaps: true }) // targets javascript files and uses built in sourcemapping
    .pipe(concat('all.min.js')) // concats javascript to all.min.js
    .pipe(uglify()) // uglify the code
    .pipe(gulp.dest(jsDist, { sourcemaps: '.' })); // save file to the dist folder with a seperate sourcemap file
}

//----Handles compiling sass files
function styles() {
  return gulp
    .src(sassFiles, { sourcemaps: true }) // targets sass files and uses built in sourcemapping
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) // converts sass to a single css file and minifies at the same time
    .pipe(rename('all.min.css.css')) // rename file to all-min-css
    .pipe(gulp.dest(sassDist, { sourcemaps: '.' })); // save file to dist folder with sourcemaps saved as a seperate file
}

//----Handles optimizing images
function images() {
  return gulp
    .src(imgFiles) // targets images
    .pipe(image()) // sends images to the image dependency
    .pipe(gulp.dest(imgDist)); // outputs to the dist folder
}

//----Handles copying static files
function copyStatic() {
  return gulp.src([htmlFiles, iconsFiles], { base: './' }).pipe(gulp.dest(distRoot)); // targets static files, keeps folder structure, copies to dist folder
}

//----Deletes all files in dist folder
function clean() {
  return del(`${distRoot}/*`);
}

//----Sets dev webserver
function server() {
  // points server to the dist folder
  return gulp.src(distRoot).pipe(
    webserver({
      livereload: true, // enables live reload on file changes
      open: true // opens browser on load
    })
  );
}

//----Watches for file changes
function watch() {
  gulp.watch(sassFiles, styles); // Watches for sass file changes then starts the styles function
}

////////////////////////
//  Exporting Tasks  //
//////////////////////

exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.clean = clean;
exports.watch = watch;

// Variable to hold the build order for reuse
// Clean task is run first then the rest of the tasks are allowed to run in parallel
// since they do not depend on one another to run
const build = gulp.series([clean, gulp.parallel([scripts, styles, images, copyStatic])]);

exports.build = build;
exports.default = gulp.series([build, server, watch]); //Runs the build task then launches the server and file watch
