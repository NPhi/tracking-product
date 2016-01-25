/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

var keyMirror = require('keymirror');

module.exports = keyMirror({
  SUBMIT_CREATE : null,
  SUBMIT_DESTROY : null,
  SUBMIT_UPDATE : null,
  SUBMIT_DESTROY_ALL : null,
  SUBMIT_SUGGEST: null,
  SUBMIT_SELECTED: null,
  SUBMIT_UNSELECTED: null
});
