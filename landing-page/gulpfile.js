// Defining variables
const gulp = require('gulp');
const sass = require('gulp-sass');
const html = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();

//// FUNCTIONS
// HTML
function htmlMin() {
    return gulp
        .src('./src/index.html')
        .pipe(html(
            {
                collapseWhitespace: true,
                removeComments: true
            }
        ))
        .pipe(gulp.dest('./dist/'));
}

// SASS
function compileSass() {
    return gulp
        .src('./src/assets/sass/**/*.scss')
        .pipe(sass(
            {
                outputStyle: 'compressed'
            }
        ).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
}

// WATCH
function watch() {
    browserSync.init({
      server: {
          baseDir: './dist'
      }  
    });

    gulp.watch('./src/index.html', htmlMin);
    gulp.watch('./src/index.html').on('change', browserSync.reload);
    gulp.watch('./src/assets/sass/**/*.scss', compileSass);
}

// Exporting tasks
exports.htmlMin = htmlMin;
exports.compileSass = compileSass;
exports.w = watch;