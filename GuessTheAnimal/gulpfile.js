/// <binding BeforeBuild='copy, min' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    rimraf = require("rimraf"),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify');


var path = require('path'), fs = require('fs');

var paths = {
    webroot: "./wwwroot/"
};


// Stylesheets
var cssFilePaths = [
    "./bower_components/font-awesome/css/font-awesome.css", // Font Awesome
    "./bower_components/bootstrap/dist/css/bootstrap.min.css",  // Bootstrap Min
    "./bower_components/angular-ui-select/dist/select.min.css", // Angular UI Select
    "./bower_components/angular-loading-bar/src/loading-bar.css", // Angular Loading Bar
    "./bower_components/angular-ui-notification/dist/angular-ui-notification.min.css" // Angular UI Notification
];


// JavaScript
var jsFilePathsHeader = [
    "./bower_components/jquery/dist/jquery.min.js", // jQuery
    "./bower_components/angular/angular.min.js", // Angular JS
];



// JavaScript
var jsFilePathsBody = [
    "./bower_components/bootstrap/dist/js/bootstrap.min.js", // Bootstrap
    "./bower_components/angular-animate/angular-animate.min.js", // Angular Animate
    "./bower_components/angular-local-storage/dist/angular-local-storage.min.js", // Angular Local Storage
    "./bower_components/angular-ui-notification/dist/angular-ui-notification.min.js", // Angular UI Notification
    "./bower_components/angular-loading-bar/build/loading-bar.min.js", // Angular Loading Bar
    "./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js", // Angular Bootstrap UI 
    "./bower_components/angular-ui-router/release/angular-ui-router.min.js", // Angular UI Router
];


// Fonts
var fontFilePaths = ["./bower_components/font-awesome/fonts/*",
    "./bower_components/bootstrap/dist/fonts/*"];


// Destination directories
paths.jsDest = paths.webroot + "js";
paths.cssDest = paths.webroot + "css/vendor";
paths.fontDest = paths.webroot + "css/fonts";



var filePaths = [];

function fromDir(startPath, filter) {

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter); //recurse
        }
        else if (filename.indexOf(filter) >= 0) {
            //console.log('-- found: ',filename);
            filePaths.push(filename);
        };
    };
};


fromDir(paths.webroot + 'app', '.js');


gulp.task("min:js-app", function () {
    return gulp.src(filePaths)
        .pipe(concat(paths.jsDest + "/min/site.min.js"))
        //.pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:js-header", function () {
    return gulp.src(jsFilePathsHeader)
        .pipe(concat(paths.jsDest + "/min/bundle-header.min.js"))
        //.pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:js-body", function () {
    return gulp.src(jsFilePathsBody)
        .pipe(concat(paths.jsDest + "/min/bundle-body.min.js"))
        //.pipe(uglify())
        .pipe(gulp.dest("."));
});


gulp.task("copy:js-header", function () {
    return gulp.src(jsFilePathsHeader)
        .pipe(gulp.dest(paths.jsDest));
});


gulp.task("copy:js-body", function () {
    return gulp.src(jsFilePathsBody)
        .pipe(gulp.dest(paths.jsDest));
});

gulp.task("copy:css", function () {
    return gulp.src(cssFilePaths)
        .pipe(gulp.dest(paths.cssDest));
});


gulp.task("copy:fonts", function () {
    return gulp.src(fontFilePaths)
        .pipe(gulp.dest(paths.fontDest));
});

gulp.task("min", ["min:js-app", "min:js-header", "min:js-body"]);
gulp.task("copy", ["copy:js-header", "copy:js-body", "copy:css", "copy:fonts"]);