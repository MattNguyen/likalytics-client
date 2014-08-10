'use strict';

var UserSessionService = function() {
  this.create = function(res) {
    this.fid       = res.data.id;
    this.email     = res.data.email;
    this.firstName = res.data.first_name;
    this.lastName  = res.data.last_name;
    this.gender    = res.data.gender;
  };

  this.destroy = function() {
    this.fid       = null;
    this.email     = null;
    this.firstName = null;
    this.lastName  = null;
    this.gender    = null;
  };

  return this;
};

module.exports = UserSessionService;
