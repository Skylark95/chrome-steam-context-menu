var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /^gulp(-|\.)/
});

gulp.task('default', ['js', 'css', 'fonts']);
gulp.task('js', function() {
  console.log(plugins.mainBowerFiles('**/*.min.js'));
  return gulp.src(plugins.mainBowerFiles('**/*.min.js'))
    .pipe(plugins.concat('vendor.min.js'))
    .pipe(gulp.dest('./js/'));
});
gulp.task('css', function() {
  return gulp.src(plugins.mainBowerFiles('**/*.min.css'))
    .pipe(plugins.concat('vendor.min.css'))
    .pipe(gulp.dest('./css/'));
});
gulp.task('fonts', function() {
  return gulp.src(plugins.mainBowerFiles('**/fonts/**'))
    .pipe(gulp.dest('./fonts/'));
});
