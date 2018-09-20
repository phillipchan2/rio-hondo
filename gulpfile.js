const gulp = require('gulp');
const sass = require('gulp-sass');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');

gulp.task('sass', function() {
	return gulp
		.src('src/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('app.min.css'))
		.pipe(gulp.dest('dist/css'));
});

// Watch for changes
gulp.task('watch', function() {
	// watch html files
	// gulp.watch('client/**/*.html', ['refresh']);

	// Watch .scss files
	gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task('default', function(callback) {
	runSequence('sass', 'watch');
});
