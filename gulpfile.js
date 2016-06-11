// get the dependencies
const gulp = require('gulp');
const childProcess = require('child_process');
const electron = require('electron-prebuilt');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

const tscConfig = require('./tsconfig.json');

const config = {
    build: {
        path: 'build',
        app: 'build/app',
        lib: 'build/lib'   
    },
    src: {
        app: 'app',
        html: 'app/**/*.html'
    }
};

// create the gulp task
gulp.task('run', ['build'], function () { 
  childProcess.spawn(electron, ['--debug=5858','.'], { stdio: 'inherit' }); 
}); 

gulp.task('compile', function () {
  return gulp
    .src([
		'app/**/*.ts',
		'typings/browser.d.ts'
	])
    .pipe(sourcemaps.init())
    .pipe(ts(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.build.app));
});

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del(config.build.path);
});

// Copy SystemJS config
gulp.task('copy:systemjs', function() {
    return gulp.src([
        'systemjs.config.js'
    ])
    .pipe(gulp.dest(config.build.path));
});

// copy dependencies
gulp.task('copy:libs', function() {
  return gulp.src([
      'node_modules/core-js/client/shim.min.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/systemjs/dist/system.src.js',
    ])
    .pipe(gulp.dest(config.build.lib))
});

// Copy assets
gulp.task('copy:assets', function() {
  return gulp.src([
      'index.html',
      config.src.html
    ])
    .pipe(gulp.dest(config.build.path))
});

gulp.task('build', ['copy:libs', 'copy:assets', 'copy:systemjs', 'compile']);
gulp.task('default', ['run']);