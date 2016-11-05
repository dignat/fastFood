//Code example 01-minify
module.exports = function(grunt) {
    require('time-grunt')(grunt);
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-build');

// Project configuration.
    grunt.initConfig({
        uglify: {
            target1: {
                src: 'js/stage.js',
                dest: 'js/stage.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true
            },
            target2: ['Gruntfile.js', 'src/**/*.js']
        },
        copy:{
            build:{
                src: ['js/app.js'],
                dest: 'build/',
                expand: true,
                flatten: true,
                filter: 'isFile'
            }

        },
        clean :{
            build: {
                src: ['build']
            }
        },
        concat: {
            dist:{
                src: ['js/staged.js','js/controllers/*.js', 'js/services/*.js', 'js/models/*.js','js/filters/*.js'],
                dest: 'build/app.js',
            },
        },

        watch: {
            scripts:{
                files: ['js/**/*.js', 'partials/**/*.html', 'css/**/*.css', 'index.html'],
                tasks: ['jshint', 'uglify','clean', 'concat'],
                options: {
                    livereload: true
                }
            }
        },

    });


// Define the default task
    //grunt.registerTask('default', ['uglify', 'jshint']);
    grunt.registerTask('build', ['clean', 'copy', 'concat']);
    grunt.event.on('watch', function(action,filepath, target) {
        grunt.log.writeln(target + ':' + filepath + ' has ' +action);
    });
};

