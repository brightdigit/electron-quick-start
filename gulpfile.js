var gulp = require('gulp'),
  iosSim = require('ios-sim'),
 electron = require('electron-connect').server.create(),
    cordova = require('cordova-lib').cordova.raw;

gulp.task('electron', function () {

  // Start browser process
  electron.start();
});
gulp.task('build', function(cb) {
    //process.chdir(__dirname + '/cordova');
    cordova
        .build()
        .then(function() {
      ///      process.chdir('../');
            cb();
        });
});

gulp.task('emulate', gulp.series('build' , function() {
  iosSim.launch("./platforms/ios/Build/emulator/HelloCordova.app")
    // cordova
    //     .run({ platforms: [ 'ios' ], target : 'iPhoneSE' })
    //     .then(function() {
    //         cb();
    //     });
}));
