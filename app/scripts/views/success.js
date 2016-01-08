/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/success.html'
], function ($, _, Backbone, Handlebars, template) {
  'use strict';

  var SuccessView = Backbone.View.extend({
    tagName: "div",

    template: Handlebars.compile(template),

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.html(this.template);
    }
  });

  return SuccessView;
});
