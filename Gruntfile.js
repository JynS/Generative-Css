// ----------------------------------------------------------------------------
// Terminology:
// expand: Set to true to enable these options
// cwd: All src matches are relative to (but don't include) this path.
// src: Pattern(s) to match, relative to the cwd.
// dest: Destination path prefix.
// ----------------------------------------------------------------------------
module.exports = function(grunt) {
    "use strict";

    require('time-grunt')(grunt); // Tells me how long it took to build the app

    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
    });

    // part of what makes livereload work
    // var appConfig = {
    //     app: 'src',
    //     dist: 'dist'
    // };

    // the settings for all the plugins
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        autoprefixer: {
            options: {
                browsers: [
                    'Android 2.3',
                    'Android >= 4',
                    'Chrome >= 35',
                    'Firefox >= 31',
                    'Explorer >= 9',
                    'iOS >= 7',
                    'Opera >= 12',
                    'Safari >= 7.1'
                ]
            },
            server: {
                options: {
                    map: true,
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ["es2015"]
            },
            dist: {
                files: [{
                    "expand": true,
                    "cwd": '.tmp/concat/scripts',
                    "src": ["*.js"],
                    "dest": '.tmp/concat/scripts'
                }]
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            'dist/{,*/}*',
                            'dist/.git{,*/}*'
                        ]
                    }
                ]
            },
            // server: '.tmp'
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'src',
                        dest: 'dist/',
                        src: [
                            '*.html',
                            // 'images/*.png',
                            '*.json',
                            '*.png',
                            '*.svg',
                            '*.xml',
                            "*.ico",
                            "*.txt"
                        ]
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: 'src/styles/',
                src: '{,*/}*.css',
                dest: '.tmp/styles/',
            },
            images: {
                expand: true,
                cwd: 'src/images/',
                src: '{,*/}*.png',
                dest: 'dist/images'
            }
        },
        filerev: {
            dist: {
                src: [
                    'dist/styles/{,*/}*.css',
                    'dist/scripts/{,*/}*.js',
                    'dist/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true,
                    collapseBooleanAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: [
                    {
                        expand: true,
                        cwd: "dist/",
                        src: ["*.html"],
                        dest: "dist/"
                    }
                ]
            }
        },
        // note: usemin doesn't have this plugin, which is why it needs to be set up here
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/images/',
                        src: ['{,*/}*.{png,jpg,jpeg,gif}'],
                        dest: 'dist/images'
                    }
                ]
            }
        },

        // shell: {
        //     multiple: {
        //         command: [
        //             'cp -R dist package.json Gruntfile.js ../personal-website-deploy',
        //             'cd ../personal-website-deploy',
        //             'git add .',
        //             'git commit -m "new build"',
        //             'git push heroku master',
        //             'heroku open',
        //             'cd ../personal-website',
        //             'ls -l'
        //         ].join('&&')
        //     }
        // },

        /*
        prepares the configuration to transform specific blocks in the
        scrutinized file into a single line, targeting an optimized version of
        the files. This is done by generating subtasks called generated for each
        of the optimization steps handled by the Grunt plugins listed below.
        - concat, uglify, cssmin, filerev
        */
        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: 'dist',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        /*
        replaces the blocks by the file they reference, and replaces all
        references to assets by their revisioned version if it is found on the
        disk. This target modifies the files it is working on.
        */
        usemin: {
            html: 'dist/{,*/}*.html',
            css: 'dist/styles/{,*/}*.css',
            js: 'dist/scripts/{,*/}*.js',
            json: 'dist/{,*/}*.json',
            options: {
                assetsDirs: [
                    'dist',
                    'dist/images',
                    'dist/styles'
                ],
                patterns: {
                    js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
                }
            }
        },
    });
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('build', [
        // clean out the .tmp and dist folders
        'clean:dist',

        // note: useminPrepare prepares the instructions for cssmin, uglify, etc.. you still need to register the tasks themselves
        /* instructions:
            concat all the js code
            minify the js code
            minify the css code
                all of these are in the dist folder

            // note: Since useminPrepare configs concat, uglify, etc... its own way, I won't find it in this Gruntfile. All comments on these tasks are from what I can glean from what IS written in this Gruntfile
        */
        // FIXME: not an error yet, but usemin is currently unmaintained, so I might need to move away from it soon. If that's the case I will need to configure these tasks myself, as useminPrepare did that for me.
        'useminPrepare',

        // add correct prefixes to css in .tmp folder
        'autoprefixer',

        // usemin
        // concat js code
        'concat',

        // copy index.html and any json files to dist folder
        // copy images from .tmp into dist/images
        // copy css to .tmp
        'copy:dist',
        'copy:styles',

        // usemin
        'cssmin',

        // optimize images from src and place generated images in dist/images
        'imagemin',

        // use babel (hopefully get rid of es6 error in uglify)
        'babel:dist',

        // usemin
        'uglify', // minify javascript
        'filerev', // causes those numbers to appear in the file name

        // Replace references to js, css, and html
            // note: usemin does not minify any code, it replaces the references
        'usemin',

        // minify the html in dist
        'htmlmin',
    ]);

    grunt.registerTask('build --no-imagemin', [
        'clean:dist',

        'useminPrepare',

        'autoprefixer',

        'concat',

        'copy:dist',
        'copy:styles',
        'copy:images',

        'cssmin',

        'babel:dist',

        'uglify',
        'filerev',

        'usemin',

        'htmlmin',
    ]);

    grunt.registerTask('deploy', [
        'build',
        // 'shell'
    ]);

};
