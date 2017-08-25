var gulp = require('gulp'),
  iosSim = require('ios-sim'),
 electron = require('electron-connect').server.create(),
    cordova = require('cordova-lib').cordova.raw,
    browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer');

  var BUILD_DIR = 'build/';
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
        .pipe(gulp.dest(BUILD_DIR));
    }

    gulp.task('build:js', function() {
  return compile();
})

gulp.task('electron:start', function () {

  // Start browser process
  electron.start();
});

gulp.task('cordova:prep', function () {
  return gulp.src('src/**').pipe(gulp.dest("www"));
});

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
