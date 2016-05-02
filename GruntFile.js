module.exports = function (grunt) {
   grunt.initConfig({
      browserify: {
         dist: {
            options: {
               transform: [
                  ["babelify", {
                     presets: ["es2015", "react"]
                  }]
               ]
            },
            files: {
               "client/bundle.js": ["client/main.js"]
            }
         }
      },
      watch: {
         scripts: {
            files: ["client/**/*.js", "!client/bundle.js"],
            tasks: ["browserify"]
         },
         options: {
            livereload: true
         }
      }
   });

   grunt.loadNpmTasks("grunt-browserify");
   grunt.loadNpmTasks("grunt-contrib-watch");

   grunt.registerTask("w", ["watch"]);
   grunt.registerTask("build", ["browserify"]);
};