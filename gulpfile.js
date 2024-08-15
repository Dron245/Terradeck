import { src, dest, watch, series, parallel } from "gulp";
import fileinclude from "gulp-file-include";
import gulpSass from "gulp-sass";
import * as cssSass from "sass";
import cleanFunc from "gulp-clean";
import fs from "fs";
import ugl from "gulp-uglify-es";
import svgSprite from "gulp-svg-sprite";
import imagemin from "gulp-imagemin";
import concat from "gulp-concat";
import gulpCheerio from "gulp-cheerio";
import browserSync from "browser-sync";
import newer from "gulp-newer";
import rename from "gulp-rename";
const uglify = ugl.default;

export function clean() {
  if (fs.existsSync("dist/")) {
    return src("dist", { read: false }).pipe(cleanFunc({ force: true }));
  }
}

export function scripts() {
  return src(["node_modules/swiper/swiper-bundle.js",'./node_modules/imask/dist/imask.js', "src/js/main.js",])
   //  .pipe(uglify())
    .pipe(concat("main.js"))
    .pipe(src(["src/js/**/*.js",'!src/js/main.js']))
   //  .pipe(uglify())
	 .pipe(concat("main.js"))
    .pipe(rename({extname: '.min.js'}))
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
}

const sass = gulpSass(cssSass);
const fileIncludeSettings = {
  prefix: "@@",
  basepath: "@file",
};

export function html() {
  return src(["src/*.html", "src/admin/*.html"])
    .pipe(fileinclude(fileIncludeSettings))
    .pipe(dest("./dist/"))
	 .pipe(browserSync.stream());
	 
}

export const styles = (done) => {
  src("src/scss/main.scss", {sourcemaps: true })
   //  .pipe(sass({ outputStyle: "compressed" }))
    .pipe(sass({ outputStyle: "expanded" }))
   //  .pipe(concat("main.min.css"))
	.pipe(rename({extname: '.min.css'}))
    .pipe(dest("./dist/css"))
    .pipe(browserSync.stream());

	 done();
}

export function images() {
  return src(["src/image/**/*.*", "!src/image/**/*.svg"], {
    encoding: false,
  })
  .pipe(newer('dist/image'))
    .pipe(
      imagemin({
        progressive: true,
      })
    )
    .pipe(dest("./dist/image"));
}

// export function start() {
//   return src("./dist").pipe(
//     server({
//       livereload: true,
//       open: true,
//     })
//   );
// }

export function sprite() {
  return src("src/image/icons/*.svg")
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../icons.svg",
            example: true,
          },
        },
      })
    )
    .pipe(
      gulpCheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(dest("dist/image"));
}

function browserSyncFunc() {
  browserSync.init({
    server: {
      baseDir: "./dist/",
    },
	 notify: false,
	 port: 3000,
  });
}

export function watching() {
  watch(["src/scss/**/*.scss"], styles)
  watch(["src/js/**/*.js"], scripts);
  watch(["src/image/icons/*.svg"], sprite);
  watch(["src/image/**/*.*"], images);
  watch(["src/**/*.html"], html)
}

export default series(
  clean,
  parallel(html, styles, sprite, scripts, images),
  parallel(browserSyncFunc, watching)
);
