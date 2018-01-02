var gulp = require('gulp');
var webserver = require('gulp-webserver');
var compilesass = require('gulp-sass');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename =require('gulp-rename');
gulp.task('server',function(){
     connect.server({
         port:8080,
         livereload:true
     })
})
gulp.task('reloadLog',function(){
    gulp.src('./')
    .pipe(connect.reload())
})
gulp.task('watch',function(){
    gulp.watch(['./index.html','./css/style.css','./date_format.js'],['reloadLog'])
})

gulp.task('copy',function(){
    gulp.src('./style.css')
       .pipe(gulp.dest('./copy/css/'))
})
gulp.task('copysass',function(){
    gulp.src('./style.sass')
       .pipe(compilesass())
       .pipe(gulp.dest('./css/'))

})
gulp.task('concatcss',function(){
    gulp.src(['./css/style.css','./css/style1.css'])
       .pipe(concat('style.css'))
       .pipe(gulp.dest('./css/'))

})
    gulp.task('uglifys',function(){
        gulp.src('./date_format.js')
       .pipe(uglify())
       .pipe(rename('date_format.min.js'))
       .pipe(gulp.dest('./js/'))

    })
    gulp.task('default',['server','watch','copy','copysass','concatcss','uglifys'])