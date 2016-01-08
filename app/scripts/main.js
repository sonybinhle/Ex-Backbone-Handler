/*global require*/
'use strict';

require.config({
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    backboneLocalstorage: {
      deps: ['backbone'],
      exports: 'Store'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/lodash/dist/lodash',
    bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
    handlebars: '../bower_components/handlebars/handlebars',
    text: '../bower_components/requirejs-text/text',
    backboneLocalstorage: '../bower_components/backbone.localstorage/backbone.localStorage'
  }
});

require([
  'backbone',
  'routes/registration'
], function (Backbone, Router) {
  var router = new Router();
  Backbone.history.start();
});
