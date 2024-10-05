module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: ['**/*.scss'],
        tasks: ['sass']
      }
    },
    postcss: {
      dev: {
        options: {
          map: true
        },
        src: ['css/base.css']
      },
      dist: {
        options: {
          map: false
        },
        src: ['css/base.css']
      }
    },
    sass: {
      dist: {
        options: {
          style: 'nested'
        },
        files: [
          {
            expand: true,
            cwd: 'scss/',
            src: ['public/scss/base.scss'],
            dest: 'css/',
            ext: '.css'
          },
          {src: 'scss/base.scss', dest: 'css/base.css'}
        ]
      }
    },
    csscomb: {
      all: {
        expand: true,
        src: ['css/base.css'],
        ext: '.css'
      },
      dist: {
        expand: true,
        files: {
          'css/base.css' : 'css/base.css'
        },
      }
    },
    cmq: {
      options: {
        log: false
      },
      all: {
        files: [
          {
            expand: true,
            src: ['css/base.css'],
            cwd: 'css/',
            dest: 'css/'
          }
        ]
      },
      dist: {
        files: {
          'css/base.css' : 'css/base.css'
        },
      }
    },
    jsbeautifier: {
      files: ["css/*.css"],
      options: {
        config: "./jsbeautifyrc",
        css: {
          indentSize: 2
        }
      }
    },
    clean: {
      options: { force: true },
      src: ['css/*.map', '.sass-cache']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.registerTask('default',['sass:dist','watch']);
  grunt.registerTask('cssbeauty',['sass:dist','cmq:dist','postcss:dist','csscomb:dist']);
  grunt.registerTask('dist',['cssbeauty','jsbeautifier','clean']);
}