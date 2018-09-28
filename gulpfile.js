const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const gulp = require('gulp');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');

gulp.task('sass', () => {
	return gulp
		.src('src/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('app.min.css'))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('js', () => {
	return gulp
		.src(['src/**/*.js'])
		.pipe(
			minify({
				ext: {
					min: '.min.js'
				},
				noSource: true,
				exclude: ['tasks'],
				ignoreFiles: ['.combo.js', '-min.js']
			})
		)
		.pipe(gulp.dest('dist'));
});

gulp.task('pages', () => {
	return gulp
		.src('src/pages/**/*html')
		.pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true }))
		.pipe(gulp.dest('dist/pages'));
});

// Watch for changes
gulp.task('watch', () => {
	// watch html files
	gulp.watch(['src/**/*.html', 'src/**/*.scss'], () => {
		runSequence('sass', 'pages');
	});

	gulp.watch(['src/**/*.js'], () => {
		runSequence('js');
	});
});

gulp.task('default', function(callback) {
	runSequence('sass', 'pages', 'watch');
});
