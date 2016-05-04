module.exports = function (grunt) {
   grunt.initConfig({
      browserify: {
         dist: {
            options: {
               transform: [
                  ["babelify", {
                     presets: ["es2015", "react", "stage-0"]
                  }]
               ]
            },
            files: {
               "client/bundle.js": ["client/main.js"]
            }
         }
      },
      nodemon: {
        dev: {
          script: 'server/server.js'
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
   grunt.loadNpmTasks("grunt-nodemon");

   grunt.registerTask("build", ["browserify"]);
   grunt.registerTask("default", function (target) {
     // Running nodejs in a different process and displaying output on the main console
     var nodemon = grunt.util.spawn({
       cmd: 'grunt',
       grunt: true,
       args: 'nodemon'
     });
     nodemon.stdout.pipe(process.stdout);
     nodemon.stderr.pipe(process.stderr);

     grunt.task.run(["watch"]);
   });
};