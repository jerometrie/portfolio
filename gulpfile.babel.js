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

// Copy all HTML files from src/ to .tmp/
gulp.task("copyhtml", function() {
	gulp.src("src/**/*.html")
		.pipe(gulp.dest(".tmp"))
		.pipe(sync.reload({
			stream: true
		}));
});




// Watch task:
// Will only begin after sync, sass, copyhtml, and bundlejs has finished
gulp.task("watch", ["sync", "sass", "copyhtml", "bundlejs"], function() {
	// Watch all scss files in src/scss, then execute "sass"
	gulp.watch("src/scss/**/*.scss", ["sass"]);
	// Watch all js files in src/js, then execute "bundlejs"
	gulp.watch("src/js/**/*.js", ["bundlejs"]);
	// Watch all HTML files in src/, then execute "copyhtml"
	gulp.watch("src/**/*.html", ["copyhtml"]);
});

// Start a server, initialization of browser sync by showing what is in .tmp
gulp.task("sync", function() {
	sync.init({
		server: {
			baseDir: ".tmp"
		},
		browser: "google chrome"
	});
});



