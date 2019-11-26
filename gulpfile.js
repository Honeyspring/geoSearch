const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const autoprefixer= require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('processHTML', (done) => {
    done();
    gulp.src('public/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('processCSS', (done) => {
    done();
    gulp.src('public/css/main.css')
    .pipe(autoprefixer({cascade:false}))
        .pipe(gulp.dest('dist/css/'));
         

});
gulp.task('processIMG', (done) => {
    done();
    gulp.src('public/images/**/*')
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('processJS', (done) => {
    done();
    gulp.src('public/js/script.js')
    .pipe(jshint({
        esversion: 8
    }))
    .pipe(jshint.reporter('default'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('babelPolyfill', (done) => {
    done();
    gulp.src('node_modules/babel-polyfill/browser.js')
    .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
});

gulp.task('browserSync', () => {
    browserSync.init({
      server: './dist',
      port: 8080,
      ui: {
        port: 8081
      }
    });
    // gulp.watch('*.js', ['processJS']);
    // gulp.watch('*.html', ['processHTML']);

    gulp.watch('dist/*.js').on('change',browserSync.reload);
    gulp.watch('dist/*.html').on('change',browserSync.reload);
    gulp.watch('dist/*.css').on('change',browserSync.reload);
  });

  gulp.task('default', gulp.series('processHTML','processCSS','processJS','processIMG','babelPolyfill','browserSync',(callback) => {
    callback();

}));
