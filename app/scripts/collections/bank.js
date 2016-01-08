/*global define*/

define([
  'underscore',
  'backbone',
  '../models/bank'
], function (_, Backbone, BankModel) {
  'use strict';

  var BankCollection = Backbone.Collection.extend({
    model: BankModel
  });

  return BankCollection;
});
