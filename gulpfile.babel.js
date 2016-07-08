import _nodemon from 'gulp-nodemon'
import eslint from 'gulp-eslint'
import gulp from 'gulp'
import gutil from 'gulp-util'
import { resolve } from 'path'
import plumber from 'gulp-plumber'
import prefixer from 'gulp-autoprefixer'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import svgo from 'gulp-svgo'
import uglify from 'gulp-uglify'

import babelify from 'babelify'
import browserify from 'browserify'
import bs from 'browser-sync'
import buffer from 'vinyl-buffer'
import del from 'del'
import normalize from 'node-normalize-scss'
import source from 'vinyl-source-stream'

const _browserSync = bs.create()
const reload = _browserSync.reload

const THIRD_PARTY_MODULES = [
  'codemirror',
  'lru-memoize',
  'marked',
  'meta-marked',
  'moment',
  'react-codemirror',
  'react-dom',
  'react-helmet',
  'react-redux',
  'react-router-scroll',
  'react-router',
  'react',
  'redux-form',
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

  // THIRD_PARTY_MODULES.forEach(module => bundler.external(module))

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


export const copyStatic = () =>
  gulp.src(`${SRC_DIR}/static/**/*`)
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(_browserSync.stream())


export const images = () =>
  gulp.src(PATHS.images.src)
    .pipe(gulp.dest(PATHS.images.dest))
    .pipe(_browserSync.stream())


export const icons = () =>
  gulp.src('./icons/src/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('./icons/dist'))


export const styles = () =>
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


export const uglifyJs = () =>
  gulp.src(`${PATHS.scripts.dest}/**/*`)
    .pipe(uglify())
    .pipe(gulp.dest(PATHS.scripts.dest))


export const lint = () =>
  gulp.src([
    resolve(__dirname, 'app', 'src', '**', '*.js'),
    resolve(__dirname, 'api', '**', '*.js')
  ]).pipe(eslint())
    .pipe(eslint.format())


export const browserSync = () =>
  _browserSync.init(null, {
    proxy: 'http://localhost:3000',
    port: 8080,
    open: false,
    notify: false
  })


export const nodemon = (callback, called = false) =>
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


export const watch = () => {
  gulp.watch(PATHS.styles.src, styles)
  gulp.watch(resolve(__dirname, 'app', 'src', '**', '*.js'), gulp.parallel(bundleApp, lint))
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
  images,
  styles,
  lint
)

export const serve = gulp.parallel(nodemon, browserSync)


export default gulp.series(clean, buildDev, gulp.parallel(watch, serve))

process.on('SIGINT', process.exit)
