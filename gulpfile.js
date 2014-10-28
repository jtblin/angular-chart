(function () {
  var gulp = require('gulp');
  var less = require('gulp-less');
  var uglify = require('gulp-uglify');
  var csso = require('gulp-csso');
  var jshint = require('gulp-jshint');
  var stylish = require('jshint-stylish');
  var tar = require('gulp-tar');
  var gzip = require('gulp-gzip');
  var bump = require('gulp-bump');

  gulp.task('less', function () {
    gulp.src('./*.less')
      .pipe(less())
      .pipe(csso())
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('lint', function () {
    return gulp.src('./*.js')
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
  });

  gulp.task('bump-major', function () {
    return gulp.src(['./package.json', './bower.json'])
      .pipe(bump({type:'major'}))
      .pipe(gulp.dest('./'));
  });
  gulp.task('bump-minor', function () {
    return gulp.src(['./package.json', './bower.json'])
      .pipe(bump({type:'minor'}))
      .pipe(gulp.dest('./'));
  });

  gulp.task('bump-patch', function () {
    return gulp.src(['./package.json', './bower.json'])
      .pipe(bump({type:'patch'}))
      .pipe(gulp.dest('./'));
  });

  gulp.task('js', ['lint'], function () {
    gulp.src('./angular-chart.js')
      .pipe(uglify())
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('build', ['js', 'less'], function () {
    return gulp.src(['dist/*', '!./dist/*.tar.gz'])
      .pipe(tar('angular-chart.js.tar'))
      .pipe(gzip({ gzipOptions: { level: 9 } }))
      .pipe(gulp.dest('dist/'));
  });

  gulp.watch('./*.js', ['js']);
  gulp.watch('./*.less', ['less']);
  gulp.task('default', ['build']);

})();