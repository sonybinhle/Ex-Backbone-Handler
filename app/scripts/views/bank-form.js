/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/bank-form.html'
], function ($, _, Backbone, Handlebars, template) {
  'use strict';

  var BankFormView = Backbone.View.extend({
    tagName: "div",

    className: "bank-data-form",

    template: Handlebars.compile(template),

    events: {
      'click [data-js="delete"]':	'deleteHandler',
    },

    initialize: function (attributes, options) {
      this.banks = options.banks;
      this.error = new Backbone.Model();

      this.listenTo(this.error, 'change', this.render);
      this.listenTo(this.banks, 'remove', this.toggleDeleteButton);
      this.listenTo(this.banks, 'add', this.toggleDeleteButton);
      this.listenTo(this.banks, 'validate', this.validate);
      this.listenTo(this.model, 'destroy', this.remove);

      this.render();
    },

    render: function () {
      this.$el.html(this.template({
        error: this.error.toJSON(),
        bank: this.model.toJSON()
      }));

      this.$inputIban = this.$('[data-js="input-iban"]');
      this.$inputBic = this.$('[data-js="input-bic"]');
      this.$deleteButtion = this.$('[data-js="delete"]');

      this.toggleDeleteButton();

      return this;
    },

    bindInput: function() {
      this.model.set('iban', this.$inputIban.val());
      this.model.set('bic', this.$inputBic.val());
    },

    deleteHandler: function() {
      this.model.destroy();
    },

    toggleDeleteButton: function() {
      this.$deleteButtion.toggle(this.banks.length > 1);
    },

    validate: function() {
      this.bindInput();
      this.error.clear();
      if (!this.model.isValid()) {
        this.error.set(this.model.validationError);
      }
    }
  });

  return BankFormView;
});
