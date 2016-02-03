var gulp = require('gulp');
var jade = require('gulp-jade');

gulp.task('default',['watch']);

gulp.task('watch',['views'],function(){
  gulp.watch('./source/views/*.jade',['views']);
});

gulp.task('views',function(){
  gulp.src('./source/views/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('.'))
})
