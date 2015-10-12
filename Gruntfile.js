/*
 After you have changed the settings under responsive_images
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            /* Change these */
            width: 800,
            suffix: '_large',
          },{
            width: 400,
            suffix: '_medium',
          },{
            width: 200,
            suffix: '_small',
          },{
            width: 32,
            suffix: '_icon'
          },{
            width: 16,
            suffix: '_icon'
          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{png,svg}'],
          cwd: 'jreiher/static/images/images_src/',
          dest: 'jreiher/static/images/images_build/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['jreiher/static/images/images_build','jreiher/static/css/build','jreiher/static/js/build']
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['jreiher/static/images/images_build']
        },
      },
    },
    imagemin: {
      dev: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          src: ['*.{png, svg}'],
          cwd: 'jreiher/static/images/images_build',
          dest: 'jreiher/static/images/images_dest'
        }]
      }
    },
    concat: {
        css: {
          src: ['jreiher/static/css/bootstrap.css', 'jreiher/static/css/jcarousel.responsive.css','jreiher/static/css/styles.css'],
          dest: 'jreiher/static/css/build/build.css'
        },
        js: {
          src: ['jreiher/static/js/jquery-1.11.3.js','jreiher/static/js/bootstrap.js','jreiher/static/js/jquery.jcarousel.js', 'jreiher/static/js/jcarousel.responsive.js', 'jreiher/static/js/menu.js'],
          dest: 'jreiher/static/js/build/build.js'
        }
    },
    cssmin: {
        compress: {
            files: {
                'jreiher/static/css/build/build.min.css': ['jreiher/static/css/build/build.css'],
            }
        }
    },
    uglify: {
        compress: {
            files: {
                'jreiher/static/js/build/build.min.js': ['jreiher/static/js/build/build.js'],
            }
        }
    },
    watch: {
        options: {
            livereload: true,
        },
        css: {
            files: ['jreiher/static/css/bootstrap.css', 'jreiher/static/css/jcarousel.responsive.css','jreiher/static/css/styles.css'],
            tasks: ['clean', 'concat:css', 'cssmin']
        },
        js: {
            files: ['jreiher/static/js/jquery-1.11.3.js','jreiher/static/js/bootstrap.js','jreiher/static/js/jquery.jcarousel.js', 'jreiher/static/js/jcarousel.responsive.js', 'jreiher/static/js/menu.js'],
            tasks: ['clean', 'concat:js', 'uglify']
        }   
    }
  
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('img', ['clean', 'mkdir','responsive_images']);
  grunt.registerTask('min', ['imagemin']);
  grunt.registerTask('build',['clean', 'concat', 'cssmin', 'uglify']);
  // grunt.registerTask('ss', ['uglify']);

};