/**
 * Gulp tasks
 * @file gulpfile
 */

/*globals require, console*/

var gulp = require('gulp'),
    karma = require('gulp-karma'),
    jsdoc = require('gulp-jsdoc');

gulp.task('test', function () {
    'use strict';
    return gulp.src(['test/client/*.js'])
        .pipe(karma({
            action: 'run',
            files: [
                'app/lib/angular/angular.js',
                'app/lib/angular/angular-resource.js',
                'app/lib/angular/angular-route.js',
                'app/lib/angular/angular-mocks.js',
                'app/js/**/*.js',
                'test/unit/**/*.js'
            ],
            frameworks: ['jasmine'],
            browsers: ['Chrome'],
            plugins: [
                'karma-chrome-launcher',
                'karma-firefox-launcher',
                'karma-jasmine',
                'karma-junit-reporter'
            ],
            junitReporter : {
                outputFile: 'test/unit.xml',
                suite: 'unit'
            }
        }))
        .on('error', function (err) {
            console.log('error', err);
        });
});

gulp.task('docs', function () {
    'use strict';
    return gulp.src(['app/js/**/*.js', 'app/css/**/*.css', 'README.md'])
        .pipe(jsdoc.parser())
        .pipe(jsdoc.generator('docs', {
            path: 'ink-docstrap',
            systemName      : 'Documentation',
            footer          : 'Angular Bootstrap',
            copyright       : 'Copyright kmturley 2014',
            navType         : 'vertical',
            theme           : 'cerulean', // cerulean, cosmo, simplex, united
            linenums        : true,
            collapseSymbols : false,
            inverseNav      : false
        }));
});

gulp.task('watch', function () {
    'use strict';
    return gulp.watch(['app/js/**/*.js', 'test/unit/**/*.js'], function () {
        gulp.run('test');
    });
});

gulp.task('default', ['test', 'docs']);