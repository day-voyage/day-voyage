require('react');
require('babelify');
require('babel-preset-es2015');
require('babel-preset-react');

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
               // if the source file has an extension of es6 then
               // we change the name of the source file accordingly.
               // The result file's extension is always .js
               "./client/bundle.js": ["./client/main.js"]
            }
         }
      },
      watch: {
         scripts: {
            files: ["./client/*"],
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