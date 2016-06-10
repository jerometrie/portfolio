"use strict";

import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";

let sass = require("gulp-sass");

/********************************************
/	DEVELOPMENT TASKS	src/ -> .tmp/
/*******************************************/


// Transpile and bundle JS files into one single bundle.js
gulp.task("bundlejs", function() {
	return browserify("src/js/app.js")
		.transform("babelify")
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(gulp.dest(".tmp/js"));
});

// Compile all scss files into css
gulp.task("sass", function() {
	return gulp.src("src/scss/**/*.scss")
		.pipe(sass())
		.pipe(gulp.dest(".tmp/css"));
});

// Watch task
gulp.task('watch', function() {
	// Watch all scss files in src/scss, then execute "sass"
	gulp.watch("src/scss/**/*.scss", ["sass"]);
	// Watch all js files in src/js, then execute "bundlejs"
	gulp.watch("src/js/**/*.js", ["bundlejs"]);
});