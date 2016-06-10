"use strict";

import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";

gulp.task("bundlejs", function() {
	return browserify("src/js/app.js")
		.transform("babelify")
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(gulp.dest(".tmp/js"));
});