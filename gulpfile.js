const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    
    // css
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    cssbeautify = require('gulp-cssbeautify'),
    postCss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),

    pug = require('gulp-pug'),

    // js
    uglify = require('gulp-uglify'),

    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    log = require('gulplog'),
    buffer = require('vinyl-buffer');


const srcPath = {
    watch: {
        scss: ['src/scss/**/*.scss', 'src/blocks/**/*.scss'],
        pug: ['src/*.pug', 'src/blocks/**/*.pug'],
        js: ['src/js/**/*.js', 'src/blocks/**/*.js', 'src/scripts/**/*.js']
    },
    entry: {
        scss: 'src/scss/main.scss',
        pug: 'src/*.pug',
        js: 'src/js/index.js'
    },
    build: {
        css: 'docs/css',
        html: 'docs',
        js: 'docs/js',
        serverDir: 'docs/'
    }
};


gulp.task('scss', () => {
    const plugins = [
        autoprefixer()
    ];

   return gulp.src(srcPath.entry.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postCss(plugins))
        .pipe(cssbeautify())
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(srcPath.build.css))
        
        // MIN CSS
        // .pipe(sourcemaps.init())
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(rename('main.min.css'))
        .pipe(sourcemaps.write('./'))

        .pipe(gulp.dest(srcPath.build.css))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('pug', () => {
    return gulp.src(srcPath.entry.pug)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(srcPath.build.html))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', () => {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: srcPath.entry.js,
        debug: true
      }).transform('babelify', {presets: ["@babel/preset-env"]});

  return b.bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(srcPath.build.js))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: srcPath.build.serverDir
        }
    });
});

gulp.task('watch', () => {
    gulp.watch(srcPath.watch.scss, gulp.parallel('scss'));
    gulp.watch(srcPath.watch.pug, gulp.parallel('pug'));
    gulp.watch(srcPath.watch.js, gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('browser-sync', 'pug', 'scss', 'js', 'watch'));
