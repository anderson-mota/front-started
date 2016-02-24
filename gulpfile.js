'use strict';

var gulp    = require('gulp');
var compass = require('gulp-compass');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var include = require('gulp-include');
var livereload = require('gulp-livereload');

var src = './resource/';
var app_assets = './app/assets/';
var app_views = './app/views/';

gulp.task('style', function() {
    return gulp.src(src + 'sass/**.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: app_assets + 'css',
            sass: src + 'sass'
        }))
        .on('error', function(error) {
            console.log(error);
            this.emit('end');
        })
        .pipe(gulp.dest(app_assets + 'css'));
});

gulp.task('compress', function() {
    return gulp.src([src + 'js/main.js'])
        .pipe(include())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(app_assets + 'js'));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch([src + 'js/**.js', src + 'js/**/*.js'], ['compress']);
    gulp.watch(src + 'sass/**.scss', ['style']);
    gulp.watch(app_assets + 'js/**.js').on('change', livereload.changed);
    gulp.watch(app_assets + 'css/**.css').on('change', livereload.changed);
    gulp.watch(app_views + '**.html').on('change', livereload.changed);
});