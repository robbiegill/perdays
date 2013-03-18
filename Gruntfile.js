module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    testacular: {
      options: {
        configFile: 'config/testacular.conf.js'
      },
      unit: {},
      continuous: {
        singleRun: true,
        browsers: ['ChromeCanary']
      }
    },
    jasmine_node: {
      specNameMatcher: '*\\.spec',
      projectRoot: './test/server'
    }
  });

  grunt.loadNpmTasks('gruntacular');
  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('test',['jasmine_node', 'testacular:unit']);
};