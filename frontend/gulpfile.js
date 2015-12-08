var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var modRewrite  = require('connect-modrewrite');

var reload = browserSync.reload;


var config = {
  outputDir: './dist/',
  entryFile: './app/main.js',
  styleEntryFile: './styles/main.scss'
};


// HANDLE ERRORS
function handleErrors(err) { 
  console.log('Error: ' + err.message); 
  this.emit('end');
}

// BROWSERIFY INIT
var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(
        browserify(config.entryFile, _.extend({ debug: true }, watchify.args))
          .transform("babelify", {presets: ["es2015", "react"]})
      );
  }
  return bundler;
};

// TRIGGER BROWSERIFY
function bundle() {
  return getBundler()
    .bundle()
    .on('error', handleErrors)
    .pipe(source('app.js'))
    .pipe(gulp.dest(config.outputDir + 'scripts/'))
    .pipe(reload({ stream: true }));
}

gulp.task('js', function() {
  return bundle();
});

// BUILD CSS
gulp.task('sass', function() {
  gulp.src(config.styleEntryFile)
    .pipe(sass({includePaths: ['node_modules']}))
    .on('error', handleErrors)
    .pipe(rename('app.css'))
    .pipe(gulp.dest(config.outputDir + "styles/"))
    .pipe(reload({ stream: true }));
});

// MOVE HTML

gulp.task('html', function() {
  gulp.src('./app/index.html')
    .pipe(gulp.dest(config.outputDir))
    .pipe(reload({ stream: true }));
});

gulp.task('assets', ['js', 'sass', 'html']);

// BUILD, SERVE, WATCH
gulp.task('watch', ['assets'], function() {

  browserSync({
    server: {
      baseDir: config.outputDir,
      middleware: [
        modRewrite([
          '!\\.\\w+$ /index.html [L]'
        ])
      ]
    }
  });

  getBundler().on('update', function() {
    gulp.start('js')
  });

  gulp.watch('./app/styles/**/*.scss', function () {
    gulp.start('sass');
  });

  gulp.watch('./app/index.html', function() {
    gulp.start('html');
  });
});

// BUILD FOR PROD
gulp.task('build', ['assets'], function() {
  process.exit(0);
});

// WEB SERVER
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: config.outputDir
    }
  });
});

gulp.task('default', ['watch']);
