var gulp = require('gulp');
var del = require('del');
var paths = require('./gulp.config.json');
var plug = require('gulp-load-plugins')();

gulp.task('analyze', function () {
    return gulp
        .src(paths.js)
        .pipe(plug.jshint('./.jshintrc'))
        .pipe(plug.jshint.reporter('jshint-stylish'));
});

gulp.task('templatecache', function () {
    return gulp
        .src(paths.htmltemplates)
        .pipe(plug.minifyHtml({
            empty: true
        }))
        .pipe(plug.angularTemplatecache('templates.js', {
            module: 'app.core',
            standalone: false,
            root: 'app/'
        }))
        .pipe(gulp.dest(paths.build + 'js'));
});

gulp.task('js', ['analyze', 'templatecache'], function () {
    var templates = paths.build + 'js/templates.js';
    var source = [].concat(paths.js, templates);
    
    return gulp
        .src(source)
        .pipe(plug.wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
        .pipe(plug.concat('all.min.js'))
        .pipe(plug.uglify({
            mangle: true
        }))
        .pipe(gulp.dest(paths.build + 'js'))
        .on('end', function () {
            del(templates);
        });
});

gulp.task('vendorjs', function () {
    return gulp.src(paths.vendorjs)
        .pipe(plug.concat('vendor.min.js'))
        .pipe(plug.uglify())
        .pipe(gulp.dest(paths.build + 'js'));
});

gulp.task('css', function () {
    return gulp.src(paths.scss)
        .pipe(plug.sass({outputStyle: 'compressed'}))
        .pipe(plug.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.build + 'css'));
});

gulp.task('vendorcss', function () {
    return gulp.src(paths.vendorcss)
        .pipe(plug.concat('vendor.min.css'))
        .pipe(plug.minifyCss({}))
        .pipe(gulp.dest(paths.build + 'css'));
});

gulp.task('copy', function () {
    return gulp.src(paths.copy)
               .pipe(gulp.dest(paths.build));
});

gulp.task('clean', function(cb) {
    del(paths.build).then(function (paths) {
        cb();
    });
});

gulp.task('build', ['js', 'vendorjs', 'css', 'vendorcss', 'copy'], function () {
    return gulp.src('').pipe(plug.notify({
        onLast: true,
        message: 'Deployed!'
    }));
});