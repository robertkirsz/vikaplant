const { src, dest, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')

// Static server + watching files
const serve = () => {
  browserSync.init({ server: '.' })
  watch('css/*.scss', css)
  watch('index.html', browserSync.reload)
  watch('js/*.js', browserSync.reload)
}

// Compile SCSS into CSS and auto-inject into browsers
const css = () =>
  src('css/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(dest('css/'))
    .pipe(browserSync.stream())

exports.default = serve
exports.build = css
