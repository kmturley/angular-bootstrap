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
    gulp compile
    gulp watch
    
If you are wanting to add/change icons, you can find a nice visual list here:

    http://glyphicons.bootstrapcheatsheets.com

## Running the app during development

Go to the folder and open the first page in your web browser

    app/index.html
    
## Running unit tests

We are using [jasmine](http://pivotal.github.com/jasmine/) and
[Karma](http://karma-runner.github.io) for unit tests.

The task runner requires [node.js](http://nodejs.org/), [Grunt](http://gruntjs.com/), [Karma](http://karma-runner.github.io/) and a browser. To run the test run the following command:

    gulp test

## Directory Layout

    app/                --> all of the files to be used in production
      data/             --> json data files
      index.html        --> app layout file (the main html template file of the app)
      libs/             --> external libraries and fonts
      modules/          --> modules grouped by functionality
        app/            --> main application module
        item/           --> view/edit item
        item-new/       --> new item
        items/          --> list of items
        overlay/        --> popup overlay
    test/               --> test source files and libraries
      e2e/              --> end-to-end test runner (open in your browser to run)
      unit/             --> unit level specs/tests

## Contact

For more information on AngularJS please check out `http://angularjs.org/`