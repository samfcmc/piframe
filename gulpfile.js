// get the dependencies
const gulp = require('gulp');
const childProcess = require('child_process');
const electron = require('electron-prebuilt');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const sass = require('gulp-sass');

const tscConfig = require('./tsconfig.json');

const config = {
    build: {
        path: 'build',
        app: 'build/app',
        lib: 'build/lib',
		style: 'build/style'   
    },
    src: {
		scripts: 'app/**/*.ts',
        app: 'app',
        html: 'app/**/*.html',
		style: 'app/main.scss',
		styles: 'app/**/*.scss'
    }
};

// create the gulp task
gulp.task('run', ['build'], function () { 
  childProcess.spawn(electron, ['--debug=5858','.'], { stdio: 'inherit' }); 
}); 

gulp.task('compile:script', function () {
  return gulp
    .src([
		config.src.scripts,
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
    .pipe(gulp.dest(config.build.path));
});

// Reload
gulp.task('reload:scripts', ['compile:script'], function() {

});

gulp.task('reload:html', ['copy:assets'], function() {

});

gulp.task('reload:style', ['compile:style'], function() {

});

// SASS
gulp.task('compile:style', function() {
	return gulp.src(config.src.style)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(config.build.style));
});

// Watch
gulp.task('watch', ['run'], function() {
	gulp.watch(config.src.scripts, ['reload:scripts']);
	gulp.watch([config.src.html, 'index.html'], ['reload:html']);
	gulp.watch([config.src.styles], ['reload:style']);
});

gulp.task('build', ['copy:libs', 
	'copy:assets', 'copy:systemjs', 
	'compile:script', 'compile:style']);

gulp.task('dev', ['watch']);

gulp.task('default', ['dev']);
