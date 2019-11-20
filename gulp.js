const gulp = require('gulp');
const babel= require('gulp-babel');
const jshint=require('gulp-jshint'); 
const browser=require('browser-sync').create(); 


gulp.task('htmlTask',(callback)=>{
        callback();
    gulp.src('public/index.html').pipe(gulp.dest('assets'));
    
});