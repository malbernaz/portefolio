import path from 'path'
import gulp from 'gulp'
import prefixer from 'gulp-autoprefixer'
import plumber from 'gulp-plumber'
import sass from 'gulp-sass'
import eslint from 'gulp-eslint'
import gutil from 'gulp-util'
import _nodemon from 'gulp-nodemon'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'

import del from 'del'
import bs from 'browser-sync'
import babelify from 'babelify'
import browserify from 'browserify'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'
import normalize from 'node-normalize-scss'

const _browserSync = bs.create()
const reload = _browserSync.reload

const THIRD_PARTY_MODULES = [
  'react',
  'react-dom',
  'react-router',
  'react-router-scroll',
  'react-redux',
  'react-helmet',
  'redux',
  'superagent',
  'underscore'
]

const BUILD_DIR = './app/dist/public'
const SRC_DIR = './app/src'

const PATHS = {
  styles: {
    src: `${SRC_DIR}/static/scss/**/*.scss`,
    dest: `${BUILD_DIR}/css`
  },
  images: {
    src: `${SRC_DIR}/static/img/**/*.{jpg,png,svg,ico}`,
    dest: `${BUILD_DIR}/img`
  },
  scripts: {
    src: {
      entry: `${SRC_DIR}/client.js`,
    },
    dest: `${BUILD_DIR}/scripts`
  }
}


export function bundleApp() {
  const bundler = browserify({
    entries: PATHS.scripts.src.entry,
    transform: [babelify]
  })

  THIRD_PARTY_MODULES.forEach(module => bundler.external(module))

  return bundler.bundle()
    .on('error', function bundleError(error) {
      gutil.log('Babelify error:', error.message)
      this.emit('end')
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATHS.scripts.dest))
    .pipe(_browserSync.stream())
}


export function bundleThirdParty() {
  const bundler = browserify()

  THIRD_PARTY_MODULES.forEach(module => bundler.require(module))

  return bundler.bundle()
    .on('error', function bundleError(error) {
      gutil.log('Babelify error:', error.message)
      this.emit('end')
    })
    .pipe(source('vendor.bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .on('error', gutil.log)
    .pipe(gulp.dest(PATHS.scripts.dest))
}


export const clean = () => del(BUILD_DIR)


export const images = () => (
  gulp.src(PATHS.images.src)
    .pipe(gulp.dest(PATHS.images.dest))
    .pipe(_browserSync.stream())
)


export const styles = () => (
  gulp.src(PATHS.styles.src)
    .pipe(plumber())
    .pipe(sass({
      includePaths: normalize.includePaths
    }).on('error', sass.logError))
    .pipe(prefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(PATHS.styles.dest))
    .pipe(_browserSync.stream())
)


export const uglifyJs = () => (
  gulp.src(`${PATHS.scripts.dest}/**/*`)
    .pipe(uglify())
    .pipe(gulp.dest(PATHS.scripts.dest))
)


export const lint = () => (
  gulp.src([
    path.resolve(
      __dirname, 'app', 'src', '**', '*.js'
    ), path.resolve(
      __dirname, 'api', 'src', '**', '*.js'
    )])
    .pipe(eslint())
    .pipe(eslint.format())
)


export const browserSync = () => (
  _browserSync.init(null, {
    proxy: 'http://localhost:3000',
    port: 8080,
    open: false,
    notify: false
  })
)


export const nodemon = (callback, called = false) => (
  _nodemon({
    script: './bin',
    ignore: [
      'gulpfile.babel.js',
      './node_modules',
      BUILD_DIR
    ]
  }).on('start', () => {
    if (!called) {
      called = true // eslint-disable-line
      callback()
    }
  }).on('restart', () => {
    setTimeout(() => {
      reload({
        stream: false
      })
    }, 500)
  })
)


export const watch = () => {
  gulp.watch(PATHS.styles.src, styles)
  gulp.watch(path.resolve(__dirname, 'app', 'src', '**', '*.js'),
    gulp.parallel(bundleApp, lint))
  gulp.watch(PATHS.images.src, images)
}


export const build = gulp.series(
  gulp.parallel(
    bundleApp,
    bundleThirdParty,
    images,
    styles
  ),
  uglifyJs
)


export const buildDev = gulp.parallel(
  bundleApp,
  bundleThirdParty,
  images,
  styles,
  lint
)

export const serve = gulp.parallel(nodemon, browserSync)


export default gulp.series(clean, buildDev, gulp.parallel(watch, serve))

process.on('SIGINT', process.exit)
