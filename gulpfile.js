var gulp = require('gulp'),
  iosSim = require('ios-sim'),
    cordova = require('cordova-lib').cordova.raw;

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
