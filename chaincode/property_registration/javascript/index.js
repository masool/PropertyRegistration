/*
 * SPDX-License-Identifier: Apache-2.0
 */


'use strict';

const UserContract = require('./lib/UserContract');
// const RegistrarContract = require('./lib/RegistrarContract');

module.exports.UserContract = UserContract;
//module.exports.RegistrarContract = RegistrarContract;

module.exports.contracts = [UserContract];
//module.exports.contracts = [RegistrarContract];