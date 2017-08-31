var gulp = require("gulp"),
  iosSim = require("ios-sim"),
  electron = require("electron-connect").server.create(),
  cordova = require("gulp-cordova"),
  browserify = require("browserify"),
  source = require("vinyl-source-stream"),
  buffer = require("vinyl-buffer"),
  sass = require("gulp-sass"),
  webserver = require("gulp-webserver");
const eslint = require("gulp-eslint");
const gulpIf = require("gulp-if");

function isFixed(file) {
  // Has ESLint fixed the file contents?
  return file.eslint != null && file.eslint.fixed;
}
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
  var bundler = browserify("src/js/index.js");

  return bundler
    .transform("babelify", { presets: ["es2015", "stage-0"] })
    .bundle()
    .pipe(source("index.js"))
    .pipe(buffer())
    .pipe(gulp.dest("build/js"));
}

gulp.task("build:js", function() {
  return compile();
});

gulp.task("js:lint", () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(["*.js","src/**/*.js","!node_modules/**"], {base : "."})
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
    .pipe(eslint({fix: true}))
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
  //.pipe(eslint.failAfterError());

    .pipe(gulpIf(isFixed, gulp.dest(".")));
});

gulp.task("build:css", function() {
  return gulp.src("src/sass/**/*.scss")
    .pipe(sass({includePaths : ["node_modules"] }))
    .pipe(gulp.dest("build/css"));
});

gulp.task("build:html", function () {
  return gulp.src(["src/**/*.html","src/**/*.png","src/**/*.ttf","src/**/*.woff2"]).pipe(gulp.dest("build"));
});


gulp.task("build", gulp.parallel("build:html", "build:js", "build:css"));

gulp.task("webserver", gulp.series("build", function () {
  gulp.src("build")
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
}));

gulp.task("electron:start", gulp.series("build", function () {

  // Start browser process
  electron.start();
}));

gulp.task("cordova:copy", gulp.series("build",function () {
  return gulp.src("build/**").pipe(gulp.dest("www"));
}));

gulp.task("cordova:prepare", function () {
  return gulp.src("./package.json")
    .pipe(cordova(["prepare"]));
});

gulp.task("cordova:build", gulp.series("cordova:copy", "cordova:prepare", function() {
  //process.chdir(__dirname + '/cordova');
  return gulp.src("./package.json")
    .pipe(cordova(["build"]));
}));

gulp.task("cordova:start:ios", gulp.series("cordova:build" , function() {
  iosSim.launch("./platforms/ios/Build/emulator/HelloCordova.app");
}));
