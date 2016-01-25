/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react')
var SubmitActions = require('../actions/SubmitActions')

var Footer = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    var allProducts = this.props.allProducts
    var total = Object.keys(allProducts).length

    if (total === 0) {
      return null;
    }
    
    var itemsLeftPhrase = ' mã '
      
    //clear items
    var clearButton =
        <button
          className="submit-button"
          onClick={this._onClearClick}>
          Xoá Hết
        </button>;
    

  	return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {total}
          </strong>
          {itemsLeftPhrase}
        </span>
        {clearButton}
      </footer>
    );
  },

  /**
   * Event handler to delete all products
   */
  _onClearClick: function() {
    SubmitActions.destroyAll()
  }

});

module.exports = Footer;
