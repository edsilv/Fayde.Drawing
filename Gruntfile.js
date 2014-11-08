var version = require('./build/version'),
    setup = require('./build/setup'),
    path = require('path'),
    connect_livereload = require('connect-livereload');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-nuget');

    var ports = {
        server: 8001,
        livereload: 15151
    };
    var meta = {
        name: 'Fayde.Drawing'
    };

    var dirs = {
        test: {
            root: 'test'
        },
        testsite: {
            root: 'testsite',
            build: 'testsite/.build'
        }
    };

    function mount(connect, dir) {
        return connect.static(path.resolve(dir));
    }

    grunt.initConfig({
        ports: ports,
        meta: meta,
        dirs: dirs,
        pkg: grunt.file.readJSON('./package.json'),
        clean: {
            bower: ['./lib'],
            test: ['<%= dirs.test.root %>/lib'],
            testsite: ['<%= dirs.testsite.root %>/lib']
        },
        setup: {
            fayde: {
                cwd: '.'
            }
        },
        typescript: {
            build: {
                src: [
                    'typings/*.d.ts',
                    'src/_Version.ts',
                    'src/**/*.ts',
                    'lib/minerva/minerva.d.ts',
                    'lib/fayde/fayde.d.ts'
                ],
                dest: '<%= meta.name %>.js',
                options: {
                    target: 'es5',
                    declaration: true,
                    sourceMap: true
                }
            },
            test: {
                src: [
                    'typings/*.d.ts',
                    '<%= dirs.test.root %>/**/*.ts',
                    '!<%= dirs.test.root %>/lib/**/*.ts',
                    'lib/minerva/minerva.d.ts',
                    'lib/fayde/fayde.d.ts'
                ],
                options: {
                    target: 'es5',
                    module: 'amd',
                    sourceMap: true
                }
            },
            testsite: {
                src: [
                    'typings/*.d.ts',
                    '<%= dirs.testsite.root %>/**/*.ts',
                    '!<%= dirs.testsite.root %>/lib/**/*.ts',
                    'lib/minerva/minerva.d.ts',
                    'lib/fayde/fayde.d.ts'
                ],
                dest: '<%= dirs.testsite.build %>',
                options: {
                    basePath: dirs.testsite.root,
                    target: 'es5',
                    module: 'amd',
                    sourceMap: true
                }
            }
        },
        symlink: {
            options: {
                overwrite: true
            },
            test: {
                files: [
                    { src: './lib/minerva', dest: '<%= dirs.test.root %>/lib/minerva' },
                    { src: './lib/fayde', dest: '<%= dirs.test.root %>/lib/fayde' },
                    { src: './lib/qunit', dest: '<%= dirs.test.root %>/lib/qunit' },
                    { src: './lib/requirejs', dest: '<%= dirs.test.root %>/lib/requirejs' },
                    { src: './lib/requirejs-text', dest: '<%= dirs.test.root %>/lib/requirejs-text' },
                    { src: './themes', dest: './test/lib/<%= meta.name %>/themes' },
                    { src: './<%= meta.name %>.js', dest: '<%= dirs.test.root %>/lib/<%= meta.name %>/<%= meta.name %>.js' },
                    { src: './<%= meta.name %>.d.ts', dest: '<%= dirs.test.root %>/lib/<%= meta.name %>/<%= meta.name %>.d.ts' },
                    { src: './<%= meta.name %>.js.map', dest: '<%= dirs.test.root %>/lib/<%= meta.name %>/<%= meta.name %>.js.map' },
                    { src: './src', dest: '<%= dirs.test.root %>/lib/<%= meta.name %>/src' }
                ]
            },
            testsite: {
                files: [
                    { src: './lib/minerva', dest: '<%= dirs.testsite.root %>/lib/minerva' },
                    { src: './lib/fayde', dest: '<%= dirs.testsite.root %>/lib/fayde' },
                    { src: './lib/requirejs', dest: '<%= dirs.testsite.root %>/lib/requirejs' },
                    { src: './lib/requirejs-text', dest: '<%= dirs.testsite.root %>/lib/requirejs-text' },
                    { src: './themes', dest: './test/lib/<%= meta.name %>/themes' },
                    { src: './<%= meta.name %>.js', dest: '<%= dirs.testsite.root %>/lib/<%= meta.name %>/<%= meta.name %>.js' },
                    { src: './<%= meta.name %>.d.ts', dest: '<%= dirs.testsite.root %>/lib/<%= meta.name %>/<%= meta.name %>.d.ts' },
                    { src: './<%= meta.name %>.js.map', dest: '<%= dirs.testsite.root %>/lib/<%= meta.name %>/<%= meta.name %>.js.map' },
                    { src: './src', dest: '<%= dirs.test.root %>/lib/<%= meta.name %>/src' }
                ]
            }
        },
        qunit: {
            all: ['<%= dirs.test.root %>/**/*.html']
        },
        connect: {
            server: {
                options: {
                    port: ports.server,
                    base: dirs.testsite.root,
                    middleware: function (connect) {
                        return [
                            connect_livereload({ port: ports.livereload }),
                            mount(connect, dirs.testsite.build),
                            mount(connect, dirs.testsite.root)
                        ];
                    }
                }
            }
        },
        watch: {
            src: {
                files: ['src/**/*.ts'],
                tasks: ['typescript:build']
            },
            testsitets: {
                files: ['<%= dirs.testsite.root %>/**/*.ts'],
                tasks: ['typescript:testsite']
            },
            testsitejs: {
                files: ['<%= dirs.testsite.root %>/**/*.js'],
                options: {
                    livereload: ports.livereload
                }
            },
            testsitefay: {
                files: ['<%= dirs.testsite.root %>/**/*.fap', '<%= dirs.testsite.root %>/**/*.fayde'],
                options: {
                    livereload: ports.livereload
                }
            }
        },
        open: {
            testsite: {
                path: 'http://localhost:<%= ports.server %>/default.html'
            }
        },
        version: {
            bump: {
            },
            apply: {
                src: './build/_VersionTemplate._ts',
                dest: './src/_Version.ts'
            }
        },
        nugetpack: {
            dist: {
                src: './nuget/<%= meta.name %>.nuspec',
                dest: './nuget/',
                options: {
                    version: '<%= pkg.version %>'
                }
            }
        },
        nugetpush: {
            dist: {
                src: './nuget/<%= meta.name %>.<%= pkg.version %>.nupkg'
            }
        }
    });

    grunt.registerTask('default', ['version:apply', 'typescript:build']);
    grunt.registerTask('test', ['version:apply', 'typescript:build', 'typescript:test', 'qunit']);
    grunt.registerTask('testsite', ['version:apply', 'typescript:build', 'symlink:testsite', 'typescript:testsite', 'connect', 'open', 'watch']);
    setup(grunt);
    version(grunt);
    grunt.registerTask('package', ['nugetpack:dist']);
    grunt.registerTask('publish', ['nugetpack:dist', 'nugetpush:dist']);
    grunt.registerTask('lib:reset', ['clean', 'setup', 'symlink:test', 'symlink:testsite']);
};