const {
  src, dest, watch, parallel, series,
} = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const del = require("del");

function cleanDist() {
  return del("dist");
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "homework/hw39gulp/",
    },
  });
}

function styles() {
  return src("homework/hw39gulp/scss/style.scss")
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 10 version"],
      grid: true,
    }))
    .pipe(dest("homework/hw39gulp/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src([
    "node_modules/jquery/dist/jquery.js",
    "homework/hw39gulp/js/main.js",
  ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("homework/hw39gulp/js"))
    .pipe(browserSync.stream());
}

function images() {
  return src("homework/hw39gulp/images/**/*")
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false },
        ],
      }),
    ]))
    .pipe(dest("dist/images"));
}

function build() {
  return src([
    "homework/hw39gulp/css/style.min.css",
    "homework/hw39gulpp/fonts/**/*",
    "homework/hw39gulp/js/main.min.js",
    "homework/hw39gulp/*.html",
  ], { base: "homework/hw39gulp" })
    .pipe(dest("dist"));
}

function watching() {
  watch(["homework/hw39gulp/scss/**/*.scss"], styles);
  watch(["homework/hw39gulp/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["homework/hw39gulp/*.html"]).on("change", browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.cleanDist = cleanDist;
exports.images = images;

exports.default = parallel(styles, scripts, watching, browsersync);

exports.build = series(cleanDist, images, build);

/*
//для запуска с другого ПК, устанавливаем gulp глобально
//npm install -g gulp
//проверить, должно быть - CurrentUser:RemoteSigned
//Get-ExecutionPolicy -List
//если нет, присваиваем командой
//Set-ExecutionPolicy -Scope Curr
*/
