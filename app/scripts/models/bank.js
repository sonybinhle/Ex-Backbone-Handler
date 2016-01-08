/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var Bank = Backbone.Model.extend({

    initialize: function() {
    },

    defaults: {
      iban: '',
      bic: ''
    },

    validate: function(attrs, options) {
      var error = {};
      var valid = true;

      //Validate Iban
      if (! (/^[A-Za-z0-9]+$/.test(attrs.iban)) ) {
        valid = false;
        error.iban = "Iban must contain characters and numbers";
      }

      if (!attrs.iban) {
        valid = false;
        error.iban = "Iban is empty";
      }

      //Validate Bic
      if (! (/^[A-Za-z0-9]+$/.test(attrs.bic)) ) {
        valid = false;
        error.bic = "Bic must contain characters and numbers";
      }

      if (!attrs.bic) {
        valid = false;
        error.bic = "Bic is empty";
      }

      if (!valid) {
        return error;
      }
    }

  });

  return Bank;
});
