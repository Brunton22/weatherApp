module.exports = function(grunt) {

	grunt.initConfig({

		watch: {
  			options: {
    				livereload: true
  			},
  			express: {
    				files:  [ 'server.js' ],
    				tasks:  [ 'express:server' ],
    				options: {
      					spawn: false
   				}
 		 	},
 		 	js: {
 		 		files: ['public/js/**/*.js'],
 		 		tasks: ['uglify']
 		 	},
 		 	css: {
 		 		files: ['public/css/*.css'],
 		 		tasks: ['cssmin']
 		 	},
 		 	views: {
 		 		files: ['public/index.html', 'public/views/*.html']
 		 	}
 		},

		express: {
			server: {
      				options: {
        					script: 'server.js'
      				}
			}
		},

		uglify: {
    			target: {
      				files: [{
      					expand: true,
      					cwd: 'public/js/',
      					src: '**/*.js',
      					dest: 'build/public/js/',
      					ext: '.min.js'
      				}]
    			}
  		},

  		cssmin: {
  			target: {
  				files: [{
  					expand: true,
  					cwd: 'public/css',
  					src: '*.css',
  					dest: 'build/public/css/',
  					ext: '.min.css'
  				}]
  			}
  		},

  		copy: {
  			main: {
    				files: [{
    					expand: true, 
    					src: ['public/imgs/*', 'public/libs/**', 'public/views/**', 'public/index.html'], 
    					dest: 'build/'
      				}]
      			}
      		}
	});

	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', ['copy', 'express', 'watch']);
	grunt.registerTask('start-min', ['uglify', 'cssmin', 'express', 'watch']);
};