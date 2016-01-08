/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/registration.html',
  '../models/account',
  './account-form',
  '../models/bank',
  './bank-collection-form'
], function ($, _, Backbone, Handlebars, template, Account, AccountFormView, Bank, BankCollectionFormView) {
  'use strict';

  var RegistrationView = Backbone.View.extend({
    tagName: "div",

    template: Handlebars.compile(template),

    initialize: function () {
      this.account = new Account();
      this.accountView = new AccountFormView({model: this.account});

      this.banks = new Backbone.Collection();
      this.banks.add(new Bank());
      this.bankCollectionView = new BankCollectionFormView({model: this.banks});


      this.listenTo(this.accountView, 'nextStep', this.nextStep);
      this.listenTo(this.bankCollectionView, 'save', this.save);

      this.renderAccountForm();
    },

    renderAccountForm: function () {
      this.$el.html(this.template);
      this.$('[data-js="main-form"]').html(this.accountView.el);
    },

    renderBankAccountForm: function () {
      this.$el.html(this.template);
      this.$('[data-js="main-form"]').html(this.bankCollectionView.el);
    },

    nextStep: function() {
      this.renderBankAccountForm();
    },

    save: function() {
      this.account.set('bank', this.banks.toJSON());
      this.account.save(
        null,
        {
          success: function() {
            Backbone.history.navigate('#/success');
          }
        }
      );
    }
  });

  return RegistrationView;
});
