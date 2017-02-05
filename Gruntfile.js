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
 		 		files: ['prod/js/**/*.js'],
 		 		tasks: ['uglify']
 		 	},
 		 	css: {
 		 		files: ['prod/css/*.css'],
 		 		tasks: ['cssmin']
 		 	},
 		 	views: {
 		 		files: ['prod/index.html', 'prod/views/*.html'],
                      tasks: ['htmlmin']
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
      					cwd: 'prod/js/',
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
  					cwd: 'prod/css',
  					src: '*.css',
  					dest: 'build/public/css/',
  					ext: '.min.css'
  				}]
  			}
  		},

          htmlmin: {                              
                dist: {                                
                      options: {                                 
                            removeComments: true,
                            collapseWhitespace: true
                      },
                      files: [{
                            expand: true,
                            cwd: 'prod/',
                            src: '**/*.html',
                            dest: 'build/public/',
                            ext: '.html'
                      }]
                }
          }
	});

	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.registerTask('default', ['express', 'watch']);
	grunt.registerTask('start-min', ['uglify', 'cssmin', 'htmlmin', 'express', 'watch']);
};