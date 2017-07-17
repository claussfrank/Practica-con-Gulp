var gulp = require("gulp");
var uglify = require("gulp-uglify");
var obfuscate = require("gulp-obfuscate");
var sass = require("gulp-sass");
var browserSync = require ('browser-sync').create();
var fileExist= require('files-exist');


//ponemos  las  rutas donde  vamos a  jalar nuestros archivos internos 

var rutas ={
	rutaJS:'./src/assets/js/main.js',
	rutaSCSS:'./src/assets/scss/*.scss',
	rutaHTML:'./src/*.html'
};

//funciones  que  se  ejecutan.

gulp.task('prepararJS',function(){
	return gulp.src(fileExist(rutas.rutaJS))
	.pipe(uglify())
	.pipe(obfuscate())
	.pipe(gulp.dest('./public'))
});

gulp.task('prepararHTML',function(){
	return gulp.src(rutas.rutaHTML)
	.pipe(gulp.dest('./public'))
});


gulp.task('prepararCSS',function(){
	return gulp.src(rutas.rutaSCSS)//le  puedes  poner  return  para  hacelos asincronas. 
	.pipe(sass({outputStyle:'compressed'})
	.on('error',sass.logError))
	.pipe(gulp.dest('./public'))
});

gulp.task('watchChanges',function(){
	browserSync.init({
		server:{
			baseDir:"./public"
		}
	});
	gulp.watch(rutas.rutaSCSS,['sass-watch']);
	gulp.watch(rutas.rutaJS,['sass-watch']);
	gulp.watch(rutas.rutaHTML,['sass-watch']);
});

gulp.task('sass-watch',['prepararCSS','prepararJS','prepararHTML'],function(){
	browserSync.reload();
});

