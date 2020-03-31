// Big help from this video https://www.youtube.com/watch?v=LYbt50dhTko&t=1128s
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat-css');

gulp.task('buildCss', () => {
  return gulp.src('public/css/*.css')
    .pipe(concat('style.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/css/minified'));
});

gulp.task('watch', function(){
    gulp.watch('public/css/*.css', gulp.series('buildCss'))
});