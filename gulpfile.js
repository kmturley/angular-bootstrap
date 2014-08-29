/**
 * Gulp tasks
 * @file gulpfile
 */

/*globals require, console*/

var gulp = require('gulp'),
    karma = require('gulp-karma'),
    jsdoc = require('gulp-jsdoc'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rebaseUrls = require('gulp-css-rebase-urls'),
    minifyCSS = require('gulp-minify-css'),
    del = require('del'),
    rename = require('gulp-rename');

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
                'app/modules/**/*.js',
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
    return gulp.src(['app/modules/**/*.js', 'app/modules/**/*.css', 'README.md'])
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

gulp.task('compile', ['clean'], function () {
    'use strict';
    
    gulp.src('./app/index-build.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./build'));
    
    gulp.src('./app/modules/**/*.html')
        .pipe(gulp.dest('./build/modules'));
    
    gulp.src('./app/data/**/*')
        .pipe(gulp.dest('./build/data'));
    
    gulp.src('./app/img/**/*')
        .pipe(gulp.dest('./build/img'));
    
    gulp.src('./app/libs/**/*')
        .pipe(gulp.dest('./build/libs'));
    
    gulp.src('./app/modules/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify()) // angular module have to been written in the correct format https://docs.angularjs.org/tutorial/step_05
        .pipe(gulp.dest('./build/modules'));

    gulp.src('./app/modules/**/*.css')
        .pipe(rebaseUrls({root: './app/css'}))
        .pipe(concat('app.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/modules'));
});

gulp.task('clean', function (cb) {
    'use strict';
    del(['./build/'], cb);
});

gulp.task('watch', function () {
    'use strict';
    return gulp.watch(['app/js/**/*.js', 'test/unit/**/*.js'], function () {
        gulp.run('test');
    });
});

gulp.task('default', ['test', 'docs']);