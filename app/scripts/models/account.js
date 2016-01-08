/*global define*/

define([
  'underscore',
  'backbone',
  'backboneLocalstorage'
], function (_, Backbone, Store) {
  'use strict';

  var Account = Backbone.Model.extend({

    localStorage: new Backbone.LocalStorage("Account"),

    initialize: function() {
    },

    defaults: {
      firstname: '',
      lastname: '',
      birthday: ''
    },

    validate: function(attrs, options) {
      var error = {};
      var valid = true;

      //Validate Firstname
      if (! (/^[A-Za-z]+$/.test(attrs.firstname)) ) {
        valid = false;
        error.firstname = "First name must contain characters";
      }

      if (!attrs.firstname) {
        valid = false;
        error.firstname = "First name is empty";
      }

      //Validate Lastname
      if (! (/^[A-Za-z]+$/.test(attrs.lastname)) ) {
        valid = false;
        error.lastname = "Last name must contain characters";
      }

      if (!attrs.lastname) {
        valid = false;
        error.lastname = "Last name is empty";
      }

      //Validate Birthday
      if (! (/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(attrs.birthday))) {
        valid = false;
        error.birthday = "Birthday should have correct format(DD/MM/YYYY)";
      }

      if (!attrs.birthday) {
        valid = false;
        error.birthday = "Birthday is empty";
      }

      if (!valid) {
        return error;
      }
    }

  });

  return Account;
});
