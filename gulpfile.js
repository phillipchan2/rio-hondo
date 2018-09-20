const concat = require('gulp-concat');
const fs = require('fs');
const gulp = require('gulp');
const insert = require('gulp-insert');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const styleInject = require('gulp-style-inject');

gulp.task('sass', () => {
	return gulp
		.src('src/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('app.min.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('pages', () => {
	return gulp
		.src('src/pages/**/*html')
		.pipe(
			insert.prepend(`<!-- inject-style src="./dist/css/app.min.css" -->`)
		)
		.pipe(styleInject())
		.pipe(gulp.dest('dist/pages'));
});

// Watch for changes
gulp.task('watch', () => {
	// watch html files
	gulp.watch('src/**/*.html', ['pages']);

	// Watch .scss files
	gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task('default', function(callback) {
	runSequence('sass', 'pages', 'watch');
});
