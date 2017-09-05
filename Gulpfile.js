var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var mainNpmFiles = require('gulp-main-npm-files');

gulp.task('sass', function() {
    return gulp.src([
            './node_modules/materialize-css/sass/materialize.scss',
            'sass/**/*.sass'
        ])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 major versions'],
        }))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'))
})

gulp.task('vendorjs', function() {
    return gulp.src(mainNpmFiles())
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('js'))
});

gulp.task('watch', function(){
    gulp.watch('sass/**/*.sass', ['sass']);
    gulp.watch('package.json', ['vendorjs']); 
})
