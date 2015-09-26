/*tasks runner file*/
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sequence = require('gulp-sequence'),
    inject = require('gulp-inject'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    sourcemaps = require('gulp-sourcemaps'),/*jshint ignore:line*/
    environments = require('gulp-environments'),/*jshint ignore:line */
    prod = environments.make('prod'),
    dev = environments.make('dev');

gulp.task('bundle', function () {
    'use strict';
    return gulp.src([
        'source/vendor/angular/angular.min.js',
        'source/vendor/angular-ui-router/release/angular-ui-router.min.js',
        'source/local/main/main.js',
        'source/local/config/main.config.js',
        'source/local/controllers/homeController.js'
    ])
        .pipe(dev(sourcemaps.init())) /*uncomment this for dev*/
        .pipe((concat('file.js')))
        .pipe(prod(uglify()))
        .pipe(rename('file.min.js'))
        .pipe(dev(sourcemaps.write('maps/')))
        .pipe(gulp.dest('build/dev/js/'));
});
gulp.task('inject', function () {
    'use strict';
    return gulp
        .src('source/index.html')
        .pipe(inject(gulp.src('build/dev/js/file.min.js', {
            read: false
        }), {
            relative: true
        }))
        .pipe(gulp.dest('source/'));
});

gulp.task('default', function (cb) {
    'use strict';
    sequence('bundle', 'inject')(cb);
});
gulp.task('lint', function () {
    'use strict';
    return gulp
        .src([
        'source/local/main/main.js',
        'source/local/config/main.config.js',
        'source/local/controllers/homeController.js'
    ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));

});
gulp.task('test', function () {
    'use strict';
    return gulp.src('tests/spec.js')
        .pipe(mocha());
});

gulp.task('coverage', function (cb) {
    'use strict';
    gulp.src(['tests/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(['tests/*.js'])
                .pipe(mocha())
                .pipe(istanbul.writeReports())
                .pipe(istanbul.enforceThresholds({
                    thresholds: {
                        global: 90
                    }
                }))
                .on('end', cb);
        });
});

gulp.task('testCoverage', function (cb) {
    'use strict';
    gulp.src(['tests/*.js'])
        .pipe(istanbul()) // Covering files
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function () {
            gulp.src(['tests/*.js'])
                .pipe(mocha())
                .pipe(istanbul.writeReports()) // Creating the reports after tests ran
                .pipe(istanbul.enforceThresholds({
                    thresholds: {
                        global: 90
                    }
                })) // Enforce a coverage of at least 90%
                .on('end', cb);
        });
});