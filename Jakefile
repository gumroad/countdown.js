desc('This is the default task.');
task('default', [], function (params) {
  console.log("Default Task")
});

desc("Run all the tests")
task("test", function() {
  jake.exec('mocha test/', {printStdout: true}, function() {
    console.log("Tests passed");
    complete();
  });
});
