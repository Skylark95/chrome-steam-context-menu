var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /^gulp(-|\.)/
});

gulp.task('default', ['js', 'css', 'fonts']);
gulp.task('js', function() {
  return gulp.src(plugins.mainBowerFiles('**/*.min.js'))
    .pipe(plugins.concat('vendor.min.js'))
    .pipe(gulp.dest('./src/js/'));
});
gulp.task('css', function() {
  return gulp.src(plugins.mainBowerFiles('**/*.min.css'))
    .pipe(plugins.concat('vendor.min.css'))
    .pipe(gulp.dest('./src/css/'));
});
gulp.task('fonts', function() {
  return gulp.src(plugins.mainBowerFiles('**/fonts/**'))
    .pipe(gulp.dest('./src/fonts/'));
});
