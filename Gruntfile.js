var babelify = require("babelify");

module.exports = function(grunt) {
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
 
  grunt.initConfig({
    connect: {
      all: {
        options:{
          port: 9000, // keepalive server is 8000
          hostname: "localhost",
          keepalive: true
        },
      },
      keepalive: true,
    },
    browserify: {
      options: {
        transform: [ babelify ]
      },
      app: {
        src: "src/jsx/application.jsx",
        dest: "assets/js/application.js"
      }
    },
    react: {
      combined_file_output: {
        files: {
          "assets/js/application.js": [
            "src/jsx/application.jsx"
          ]
        }
      },
    },
    less: {
      development: {
        options: {
          paths: ["./assets/"],
          yuicompress: true
        },
        files: {
          "./assets/css/application.css": "./src/less/application.less",
          "./assets/css/navigation.css": "./src/less/navigation.less"
        },
      },
    },
    uglify: {
      my_target: {
        files: {
          "assets/js/application.min.js": "assets/js/application.js"
        }
      }
    },
    watch: {
      files: ["./src/**/*"],
      tasks: ["browserify", "less"],
    },
  });

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-react");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.event.on("watch", function(action, filepath, target) {
    grunt.log.writeln(target + ": " + filepath + " has " + action);
  });

  grunt.registerTask("server",[
    "connect:keepalive",
    "watch"
  ]);
};
