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
        src: ['jreiher/static/images/images_build'],
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
    }

  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-imagemin')
  grunt.registerTask('img', ['clean', 'mkdir','responsive_images']);
  grunt.registerTask('min', ['imagemin'])

};