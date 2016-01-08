/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/account-form.html'
], function ($, _, Backbone, Handlebars, template) {
  'use strict';

  var AccountFormView = Backbone.View.extend({
    tagName: "div",

    className: "personal-data-form",

    template: Handlebars.compile(template),

    events: {
      'click [data-js="nextStep"]':	'nextStep'
    },

    initialize: function () {
      this.error = new Backbone.Model();
      this.listenTo(this.error, 'change', this.render);
      this.render();
    },

    render: function () {
      this.$el.html(this.template({
        error: this.error.toJSON(),
        account: this.model.toJSON()
      }));

      this.$inputFirstname = this.$('[data-js="input-firstname"]');
      this.$inputLastname = this.$('[data-js="input-lastname"]');
      this.$inputBirthday = this.$('[data-js="input-birthday"]');
      return this;
    },

    bindInput: function() {
      this.model.set('firstname', this.$inputFirstname.val());
      this.model.set('lastname', this.$inputLastname.val());
      this.model.set('birthday', this.$inputBirthday.val());
    },

    nextStep: function() {
      this.bindInput();
      this.error.clear();
      if (!this.model.isValid()) {
        this.error.set(this.model.validationError);
      } else {
        this.trigger('nextStep');
      }
    }
  });

  return AccountFormView;
});
