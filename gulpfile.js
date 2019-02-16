const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

// compile sass
gulp.task("sass", function () {
    return gulp.src(["css/*.scss"])
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src('js/*.js')
        //.pipe(uglify())
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.stream());
});

// watch & serve
gulp.task("serve", gulp.series(["sass", "scripts"], function () {
    browserSync.init({
        server: "./"
    });

    gulp.watch(["css/*.scss"], gulp.series(["sass", "scripts"]));
    gulp.watch(["*.html"]).on("change", browserSync.reload);
}));

// default task
gulp.task("default", gulp.series(["serve"]));
