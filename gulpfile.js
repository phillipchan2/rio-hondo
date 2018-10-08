const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const insert = require('gulp-insert');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');
const styleInject = require('gulp-style-inject');
const injectScripts = require('gulp-inject-scripts');
const sass = require('gulp-sass');

gulp.task('sass', () => {
	return gulp
		.src('src/styles/app.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('app.min.css'))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('js', () => {
	return gulp
		.src(['src/**/*.js'])
		.pipe(
			babel({
				presets: ['@babel/env']
			})
		)
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
		.pipe(
			insert.prepend(`<!-- inject-style src="./dist/css/app.min.css" -->`)
		)
		.pipe(insert.prepend(`<script src="./dist/js/app.min.js"></script>`))
		.pipe(styleInject())
		.pipe(injectScripts({ baseDir: './' }))
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist/pages'));
});

// Watch for changes
gulp.task('watch', () => {
	// watch html files
	gulp.watch(['src/**/*.html', 'src/**/*.scss'], () => {
		runSequence('sass', 'pages');
	});

	gulp.watch(['src/**/*.js'], () => {
		runSequence('js', 'pages');
	});
});

gulp.task('default', function(callback) {
	runSequence('sass', 'js', 'pages', 'watch');
});
