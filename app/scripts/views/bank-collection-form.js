/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/bank-collection-form.html',
  './bank-form',
  '../models/bank'
], function ($, _, Backbone, Handlebars, template, BankFormView, Bank) {
  'use strict';

  var BankCollectionFormView = Backbone.View.extend({
    tagName: "div",

    className: "bank-data-collection-form",

    template: Handlebars.compile(template),

    events: {
      'click [data-js="save"]':	'saveHandler',
      'click [data-js="add"]':	'addHandler'
    },

    initialize: function () {
      this.render();
      this.model.each(this.addAccountView, this);
      this.listenTo(this.model, 'add', this.addAccountView);
    },

    render: function () {
      this.$el.html(this.template);
      this.$bankAccountList = this.$('[data-js="list-form"]');

      return this;
    },

    addHandler: function() {
      var bankAccount = new Bank();
      this.model.add(bankAccount);
    },

    addAccountView: function(bankAccount) {
      var view = new BankFormView({ model: bankAccount }, { banks: this.model});
      this.$bankAccountList.append(view.el);
    },

    saveHandler: function() {
      this.model.trigger('validate');
      var isValid = true;

      if (this.model.length < 1) {
        isValid = false;
      }

      this.model.each(function(bank) {
        isValid = isValid && bank.isValid();
      });

      if (isValid) {
        this.trigger('save');
      }
    }
  });

  return BankCollectionFormView;
});
