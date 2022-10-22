const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
// const imagemin = require("gulp-imagemin");  // currently need update and does not work
const htmlmin = require('gulp-htmlmin');


// we will set gulp to take all the files from src then process them and put inside dist folder

gulp.task('server', function() {   // this for browsersync to work and reload page after style/html changes

   browserSync({
      server: {
         baseDir: "dist"      // we will start server from dist folder(already processed file)            
      }
   });

   gulp.watch("src/*.html").on('change', browserSync.reload);  // we still work inside SRC folder
});

   /* compile ALL files that end on .scss or sass from src/sass folder (usuall there is only 1 file
         to compile like style.scss) files that has "_" prefix does not compile, you need to import them
         inside styles.scss file to work properly
    * then compress them, or log error 
    * then add suffix min (bcz we compressed files)
    * add autoprefixer to set wendor prefixes
    * clean css file 
    * set destination to save, we will save it to dist
    * reload the browser
    * */

gulp.task('styles', function() {                  
   return gulp.src("src/sass/**/*.+(scss|sass)")         
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename({suffix: '.min', prefix: ''}))
      .pipe(autoprefixer())
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest("dist/css"))
      .pipe(browserSync.stream());
});


   /** with watch task we WATCH for the changes of some files
    * example: if any file from preprocessors will be changed 
    * we will restart task with the names style
    */

gulp.task('watch', function() {
   gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
   gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

   /** logic on how this tasks work :
    *    with watch task we search for any changes in .html file inside src folder we will start "html" task
    *    inside "html" task we get .html file insde src folder then process it with "htmlmin" pagin and 
    *    save it inside dist folder
    *    besides inside "server" task we also set page to reload on change of .html inside src folder 
    * 
    * so basically now on src/.html file change it will automatically save inside dist folder
    * and reload page inside browser
    */
   
gulp.task('html', function() {
   return gulp.src("src/*.html")  // we will get any .html file iside src folder
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist/'));
});

   /** all other tasks work with the same logig as "html" task;
    *    we will pit all files from src folder to dist (but still will work inside src folder)
    */

   // curently we will not compress js files and combine it in to one, we will just put them as is
    gulp.task('scripts', function() {   
      return gulp.src("src/js/**/*.js") // **/*.js - search any folder inide "JS" folder for files with .js
         .pipe(gulp.dest('dist/js'));
   });

   gulp.task('fonts', function() {   
      return gulp.src("src/fonts/**/*") 
         .pipe(gulp.dest('dist/fonts'));
   });
   
   gulp.task('icons', function() {   
      return gulp.src("src/icons/**/*") 
         .pipe(gulp.dest('dist/icons'));
   });
   
   // mailer folder you can put inside dist folder from the start
   gulp.task('mailer', function() {   
      return gulp.src("src/mailer/**/*") 
         .pipe(gulp.dest('dist/mailer'));
   });

   // compress img with plagin "imagemin"
   // currently does not work as it used to be
   // because of the update and needs to be connected in another way
   // dont use at the moment

   // gulp.task('images', function() {   
   //    return gulp.src("src/img/**/*") 
   //       .pipe(imagemin())
   //       .pipe(gulp.dest('dist/img'));
   // });

   // currently save and compress imgs manualy
   // you need to compress them manually




   /**
    *    make all those tasks run at the same time using one command in terminal - gulp
    */

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'icons', 'mailer'));