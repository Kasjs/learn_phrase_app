var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var less = require('gulp-less');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

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
