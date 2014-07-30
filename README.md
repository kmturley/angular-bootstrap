angular-bootstrap
===========
AngularJS and Twitter bootstrap combined
    AngularJS `http://angularjs.org/`
    Twitter bootstrap `http://getbootstrap.com/`
    
## Installation and running tasks

Install [node.js](http://nodejs.org/) then navigate to the site root within terminal and type:

    npm install

Once the node modules have installed you should now have access to run the task runner. In your terminal you should be able to use the following commands:

    gulp docs
    gulp test
    gulp watch

## Running the app during development

Go to the folder and open the first page in your web browser

    app/index.html
    
## Running unit tests

We are using [jasmine](http://pivotal.github.com/jasmine/) and
[Karma](http://karma-runner.github.io) for unit tests.

The task runner requires [node.js](http://nodejs.org/), [Grunt](http://gruntjs.com/), [Karma](http://karma-runner.github.io/) and a browser.

* start `scripts/test.sh` (on windows: `scripts\test.bat`)
  * a browser will start and connect to the Karma server (Chrome is default browser, others can be captured by loading the same url as the one in Chrome or by changing the `config/karma.conf.js` file)
* to run or re-run tests just change any of your source or test javascript files

## Directory Layout

    app/                --> all of the files to be used in production
      css/              --> css files
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      js/               --> javascript files
        app.js          --> application
        Controllers/    --> application controllers
        Directives/     --> application directives
        Filters/        --> custom angular filters
        Services/       --> custom angular services
      lib/              --> angular and 3rd party javascript libraries
        angular/        --> the latest angular js
      partials/         --> angular view partials (partial html templates)
    docs/               --> developer documentation
    test/               --> test source files and libraries
      e2e/              --> end-to-end test runner (open in your browser to run)
      unit/             --> unit level specs/tests

## Contact

For more information on AngularJS please check out `http://angularjs.org/` and angular seed `https://github.com/angular/angular-seed`