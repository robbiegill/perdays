module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      options: {
        configFile: 'config/karma.conf.js'
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

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('test',['jasmine_node', 'karma:unit']);
};