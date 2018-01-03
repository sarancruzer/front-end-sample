// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-spec-reporter'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-phantomjs-launcher'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: './src/assets/js/jquery-3.1.1.min.js', watched: false },
      { pattern: './src/assets/js/jquery-ui.min.js', watched: false },
      { pattern: './src/assets/js/bootstrap.min.js', watched: false },
      { pattern: './src/assets/js/material.min.js', watched: false },
      { pattern: './src/assets/js/perfect-scrollbar.jquery.min.js', watched: false },
      { pattern: './src/assets/js/jquery.tagsinput.js', watched: false },
      { pattern: './src/assets/js/jquery.select-bootstrap.js', watched: false },
      { pattern: './src/assets/js/moment.min.js', watched: false },
      { pattern: './src/assets/js/bootstrap-datetimepicker.js', watched: false },
      { pattern: './src/assets/js/jquery.datatables.js', watched: false },
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['@angular/cli']
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly', 'text-summary' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    specReporter: {
      maxLogLines: 5,              // limit number of lines logged per test
      suppressErrorSummary: false, // do not print error summary
      suppressFailed: false,       // do not print information about failed tests
      suppressPassed: false,       // do not print information about passed tests
      suppressSkipped: false,      // do not print information about skipped tests
      showSpecTiming: false,       // print the time elapsed for each spec
      failFast: true               // test would finish with error when a first fail occurs.
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['spec', 'coverage-istanbul']
              : ['spec', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
