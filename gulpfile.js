const gulp = require('gulp');
const browserify = require('gulp-browserify');
const concat = require('gulp-concat');
const styl = require('gulp-styl');
const refresh = require('gulp-livereload');
const lr = require('tiny-lr');
const server = lr();

gulp.task('scripts', function() {
    gulp.src(['src/**/*.js'])
        .pipe(browserify())
        .pipe(concat('dest.js'))
        .pipe(gulp.dest('build'))
        .pipe(refresh(server))
});

gulp.task('styles', function() {
    gulp.src(['css/**/*.css'])
        .pipe(styl({compress : true}))
        .pipe(gulp.dest('build'))
        .pipe(refresh(server))
});

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
});

gulp.task('default', function(){
    gulp.run('lr-server','scripts','styles');

    gulp.watch('src/**', function(event) {
        gulp.run('scripts');
    });

    gulp.watch('css/**', function(event) {
        gulp.run('styles');
    });
});
