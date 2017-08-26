var gulp = require('gulp'),
  iosSim = require('ios-sim'),
 electron = require('electron-connect').server.create(),
    cordova = require('cordova-lib').cordova.raw,
    browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
 sass = require('gulp-sass');

    // function compile() {
    //   var bundler = browserify('app/index.js', {
    //     debug: true
    //   });
    //
    //   return bundler
    //     .plugin(pathmodify, {
    //       mods: [function(rec) {
    //         if(rec.id[0] === '/' && !rec.id.startsWith(__dirname)) {
    //           return { id: path.join(__dirname, rec.id.substr(1)) };
    //         }
    //
    //         return {};
    //       }]
    //     })
    //     .transform('babelify', { presets: ['es2015', 'react', 'stage-0'] })
    //     .bundle()
    //     .pipe(source('app.js'))
    //     .pipe(buffer())
    //     .pipe(sourcemaps.init({ loadMaps: true }))
    //     .pipe(uglify())
    //     .pipe(sourcemaps.write('.'))
    //     .pipe(gulp.dest(BUILD_DIR));
    // }
    function compile() {
      var bundler = browserify('src/js/index.js');

      return bundler
        .transform('babelify', { presets: ['es2015', 'stage-0'] })
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(gulp.dest("build/js"));
    }

    gulp.task('build:js', function() {
  return compile();
});

gulp.task('build:css', function() {
  return gulp.src('src/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'));
});

gulp.task('build:html', function () {
  return gulp.src(['src/**/*.html','src/**/*.png','src/**/*.ttf','src/**/*.woff2']).pipe(gulp.dest("build"));
});

gulp.task('build', gulp.parallel('build:html', 'build:js', 'build:css'));

gulp.task('electron:start', gulp.series('build', function () {

  // Start browser process
  electron.start();
}));

gulp.task('cordova:prep', gulp.series('build',function () {
  return gulp.src('build/**').pipe(gulp.dest("www"));
}))

gulp.task('cordova:build', gulp.series('cordova:prep', function(cb) {
    //process.chdir(__dirname + '/cordova');
    cordova
        .build()
        .then(function() {
      ///      process.chdir('../');
            cb();
        });
}));

gulp.task('cordova:start:ios', gulp.series('cordova:build' , function() {
  iosSim.launch("./platforms/ios/Build/emulator/HelloCordova.app")
    // cordova
    //     .run({ platforms: [ 'ios' ], target : 'iPhoneSE' })
    //     .then(function() {
    //         cb();
    //     });
}));
