/*global define*/

define([
  'jquery',
  'backbone',
  'views/registration',
  'views/success'
], function ($, Backbone, Registration, Success) {
  'use strict';

  var RegistrationRouter = Backbone.Router.extend({
    routes: {
      '': 'registration',
      'success': 'success'
    },

    registration: function() {
      var registration = new Registration();
      $('#main').html(registration.el);
    },

    success: function() {
      var success = new Success();
      $('#main').html(success.el);
    }

  });

  return RegistrationRouter;
});
