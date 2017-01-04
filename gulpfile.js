var gulp = require('gulp'),
gutil = require('gulp-util'),
gulpif = require('gulp-if'),
autoprefixer = require('gulp-autoprefixer'),
cssmin = require('gulp-cssmin'),
less = require('gulp-less'),
concat = require('gulp-concat'),
plumber = require('gulp-plumber'),
buffer = require('vinyl-buffer'),
source = require('vinyl-source-stream'),
babelify = require('babelify'),
webpack = require('webpack'),
WebpackDevServer = require("webpack-dev-server"),
webpackConfig = require("./webpack.config.js"),
watchify = require('watchify'),
uglify = require('gulp-uglify'),
sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function() {
    return gulp.src('./public/app/styles/less/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/app/styles/css'));
});

gulp.task('lib_styles', function() {
    return gulp.src('./public/app/styles/less/style.lib.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/app/styles/css/style.lib.css'));
});

gulp.task('watch', function() {
    gulp.watch('./public/app/styles/less/*.less', ['styles']);
});

gulp.task('default', ['styles', 'lib_styles', 'watch']);
