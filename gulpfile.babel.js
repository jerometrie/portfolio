"use strict";

import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";

let sass = require("gulp-sass"),
	sync = require("browser-sync");

/********************************************
/	DEVELOPMENT TASKS	src/ -> .tmp/
/*******************************************/


// Transpile and bundle JS files into one single bundle.js, and refresh browser
gulp.task("bundlejs", function() {
	return browserify("src/js/app.js")
		.transform("babelify")
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(gulp.dest(".tmp/js"))
		.pipe(sync.reload({
			stream: true
		}));
});

// Compile all scss files into css and refresh browser
gulp.task("sass", function() {
	return gulp.src("src/scss/**/*.scss")
		.pipe(sass())
		.pipe(gulp.dest(".tmp/css"))
		.pipe(sync.reload({
			stream: true
		}));
});

// Watch task
// Before it's started, we run sync, sass, ans bundlejs
gulp.task("watch", ["sync", "sass", "bundlejs"], function() {
	// Watch all scss files in src/scss, then execute "sass"
	gulp.watch("src/scss/**/*.scss", ["sass"]);
	// Watch all js files in src/js, then execute "bundlejs"
	gulp.watch("src/js/**/*.js", ["bundlejs"]);
});

// Initialization of browser sync by showing what is in .tmp
gulp.task("sync", function() {
	sync.init({
		server: {
			baseDir: ".tmp"
		},
		browser: "google chrome"
	});
});



