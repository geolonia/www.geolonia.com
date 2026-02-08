module.exports = {
  default: {
    require: ['features/step_definitions/**/*.cjs', 'features/support/**/*.cjs'],
    format: ['progress', 'html:test-results/cucumber-report.html'],
    publishQuiet: true,
  }
};
