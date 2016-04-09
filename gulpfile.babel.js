let gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    path = require('path'),
    watch = require('gulp-watch'),
    source = require('vinyl-source-stream'),
    notify = require('gulp-notify'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    babel = require('gulp-babel'),
    babelify = require('babelify');

let src = path.join(__dirname, 'src');
let dist = path.join(__dirname, 'dist');

// initiates the scripts bundler
function compileScripts(watch) {
  let entryFile = path.join(src, 'app.js');

  // we use browserify to bundle node style modules into a
  // script ready for the browser
  let bundler = browserify(entryFile, {
    cache: {},
    packageCache: {},
    debug: true,
    paths: [
      './node_modules/',
      src
    ],
    extensions: ['.js'],
    fullPaths: true,
    sourceMaps: true,
    ignore: ['electron']
  });

  // browserify transforms
  bundler.transform(babelify, { presets: ['es2015', 'react'] });

  function rebundle() {
    let stream = bundler.bundle();
    return stream
      .on("error", notify.onError({
        message: "Error: <%= error.message %>",
        title: "Error building scripts"
      }))
      .on('end', function() { gutil.log("Done building scripts"); })
      .pipe(source(entryFile))
      .pipe(rename('index.js'))
      .pipe(gulp.dest(path.join(dist, 'scripts')));
  };

  if(watch) {
    bundler = watchify(bundler);

    // make sure we rebundle on update events
    bundler.on('update', rebundle);
  }

  return rebundle();
}

gulp.task('build:main', function() {
	return gulp.src('src/main.js')
		.pipe(babel({presets: ['es2015']}))
		.pipe(gulp.dest('dist'));
});

gulp.task('build:style', function() {
  gulp.src('./src/style/app.sass')
    .pipe(sass({
      includePaths : [
        path.join(src, 'style/sass'), // sass
        path.join(src, 'style/css'),  // css
        path.join(__dirname, 'node_modules/')    // libs
      ]
    }).on('error', sass.logError))
    .pipe(gulp.dest(path.join(dist, 'style')));
});

gulp.task('build:watch', function() {
  function initWatch(files, task) {
    gulp.start(task);
    gulp.watch(files, [task]);
  }

  compileScripts(true);
  initWatch(['./src/**/*.sass', './src/**/*.css'], 'build:style');
});

gulp.task('build:assets', function() {
  return gulp.src([
    path.join(src, 'index.html'),
    path.join(src, '.credentials/**/*.json'),
    path.join(src, 'style/fonts/**/*')], {base: src})
    .pipe(gulp.dest(dist));
});

gulp.task('build:app', function() {
  compileScripts(false);
});

gulp.task('build', function() {
  gulp.start('build:style');
  gulp.start('build:assets');
  gulp.start('build:main');
  gulp.start('build:app');
});

// run the tasks and start watching by default
gulp.task('default', function() {
  gutil.log(">> Building & standing watch for changes...");
  gulp.start('build');
  gulp.start('watch');
});
