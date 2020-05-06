// 'use strict'

// const { src, dest, watch } = require('gulp');
// const sass = require('gulp-sass');
// const cleanCss = require('gulp-clean-css');
// const sourcemaps = require('gulp-sourcemaps');
// const browserSync = require('browser-sync').create()

// function compileSass(done) {
//   src('src/css/app.scss')
//   .pipe(sourcemaps.init())
//   .pipe(sass())
//   .pipe(
//       cleanCss({
//           compatibility: 'ie8'
//       })
//     )
//   .pipe(sourcemaps.write())
//   .pipe(dest("dist"))
//   .pipe(browserSync.stream())
//  done();
// }

// function html(done) {
//     return gulp.src("src/index.html")
//         .pipe(gulp.dest("dist"))
//     done();
// }

// function watchSass() {
//     browserSync.init({
//         server: {
//             baseDir: "dist"
//         }
//     });
//     watch('src/index.html', html);
//     watch('src/css/app.scss', compileSass);
//  }

// exports.watchSass = watchSass;



// const gulp = require('gulp')
// const sass = require('gulp-sass')
// const cleanCss = require('gulp-clean-css')
// const imagemin = require('gulp-imagemin')
// const sourcemaps = require('gulp-sourcemaps')

// const browserSync = require('browser-sync').create()

// const ghpages = require('gh-pages')

// sass.compiler = require('node-sass')

// // Compiles CSS
// gulp.task("sass", function () {
//     // Inital sass file to grab for compile
//     return gulp.src("src/css/app.scss")
//         .pipe(sourcemaps.init())
//         .pipe(sass())
//         // Creates minifed CSS file with ie8 compatible syntax
//         .pipe(
//             cleanCss({
//                 compatibility: 'ie8'
//             })
//         )
//         // Writes sourcemap to properly debug minified CSS and identify line location of any errors
//         .pipe(sourcemaps.write())

//         // Saves compiled CSS to chosen folder
//         .pipe(gulp.dest("dist/css"))

//         // Reload live server to reflect new code
//         .pipe(browserSync.stream())
// })
// // Move any html files to dist folder for deploy
// gulp.task("html", function () {
//     return gulp.src("src/*.html")
//         .pipe(gulp.dest("dist"))
// })
// // Move any files in js foler to dist folder for deploy
// gulp.task("js", function () {
//     return gulp.src("src/js/*.js")
//         .pipe(gulp.dest("dist/js"))
// })
// // Move any files in font foler to dist folder for deploy
// gulp.task("fonts", function () {
//     return gulp.src("src/fonts/*")
//         .pipe(gulp.dest("dist/fonts"))
// })
// // Move any files in image folder to dist folder for deploy
// gulp.task("images", function () {
//     return gulp.src("src/img/*")
//         .pipe(imagemin())
//         .pipe(gulp.dest("dist/img"))
// })
// // Watches files for changes
// gulp.task("watch", function () {
//     // While "watch"ing files - loads live server with website preview coming from "dist" folder
//     browserSync.init({
//         server: {
//             baseDir: "dist"
//         }
//     })
//     // If any ".html" file is updated then reruns gulp html task to move files to dist folder and also updates live server
//     gulp.watch("src/*.html", gulp.series("html")).on("change", browserSync.reload)
//     // If js folder is updated then reruns fonts task and move files to dist folder
//     gulp.watch("src/js/*", gulp.series("js"))
//     // If fonts folder is updated then reruns fonts task and move files to dist folder
//     gulp.watch("src/fonts/*", gulp.series("fonts"))
//     // If images folder is updated then reruns fonts task and move files to dist folder
//     gulp.watch("src/img/*", gulp.series("images"))
//     // If "scss" is updated then reruns sass compiler and move compile files to dist folder
//     gulp.watch("src/css/*.scss", gulp.series("sass"))
// })

// gulp.task("deploy", function () {
//     ghpages.publish("dist")
// })

// // Runs all the following tasks on "gulp" command
// const build = gulp.series(["html", "sass", "fonts", "images", "watch"])
// gulp.task('default', build)

const gulp = require('gulp')
const postcss = require('gulp-postcss')
const cleanCss = require('gulp-clean-css')
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')

const browserSync = require('browser-sync').create()

const ghpages = require('gh-pages')


// Compiles CSS
gulp.task("css", function () {
    // Inital sass file to grab for compile
    return gulp.src([
        "src/css/reset.css",
        "src/css/typography.css",
        "src/css/app.css"
    ])
        .pipe(sourcemaps.init())
        .pipe(
            postcss([
                require("autoprefixer"),
                require("postcss-preset-env")({
                    stage: 1,
                    browsers: ["IE 11", "last 2 versions"]
                })
            ])
            )
        .pipe(concat("app.css"))
        // Creates minifed CSS file with ie8 compatible syntax
        .pipe(
            cleanCss({
                compatibility: 'ie8'
            })
        )
        // Writes sourcemap to properly debug minified CSS and identify line location of any errors
        .pipe(sourcemaps.write())

        // Saves compiled CSS to chosen folder
        .pipe(gulp.dest("dist/css"))

        // Reload live server to reflect new code
        .pipe(browserSync.stream())
})
// Move any html files to dist folder for deploy
gulp.task("html", function () {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
})
// Move any files in js foler to dist folder for deploy
gulp.task("js", function () {
    return gulp.src("src/js/*.js")
        .pipe(gulp.dest("dist/js"))
})
// Move any files in font foler to dist folder for deploy
gulp.task("fonts", function () {
    return gulp.src("src/fonts/*")
        .pipe(gulp.dest("dist/fonts"))
})
// Move any files in image folder to dist folder for deploy
gulp.task("images", function () {
    return gulp.src("src/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))
})
// Watches files for changes
gulp.task("watch", function () {
    // While "watch"ing files - loads live server with website preview coming from "dist" folder
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    })
    // If any ".html" file is updated then reruns gulp html task to move files to dist folder and also updates live server
    gulp.watch("src/*.html", gulp.series("html")).on("change", browserSync.reload)
    // If js folder is updated then reruns fonts task and move files to dist folder
    gulp.watch("src/js/*", gulp.series("js"))
    // If fonts folder is updated then reruns fonts task and move files to dist folder
    gulp.watch("src/fonts/*", gulp.series("fonts"))
    // If images folder is updated then reruns fonts task and move files to dist folder
    gulp.watch("src/img/*", gulp.series("images"))
    // If "scss" is updated then reruns sass compiler and move compile files to dist folder
    gulp.watch("src/css/*.css", gulp.series("css"))
})

// gulp.task("deploy", function () {
//     ghpages.publish("dist")
// })

gulp.task('deploy', done => {
    ghpages.publish("dist")
    done();
  });

// Runs all the following tasks on "gulp" command
const build = gulp.series(["html", "css", "fonts", "images", "watch"])
gulp.task('default', build)