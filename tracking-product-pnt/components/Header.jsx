/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var SubmitActions = require('../actions/SubmitActions')


//components
var ErrorMessage = require('./ErrorMessage.jsx');
var DateInput = require('./DateInput.jsx');
var ProductTextInput = require('./ProductTextInput.jsx');
var DataHelper = require('../helpers/DataHelper')


var Header = React.createClass({

  getInitialState: function(){
    return {date : DataHelper.formatDate(new Date(),'dd/mm/yy')}
  },

  /**
   * @return {object}
   */
  render: function() {


    return (
      <div id="header">

        <div id="submit-container">
            <DateInput
              id="date-input"
              ref="dateInput"
              placeholder="ngày/tháng/năm"
              tabIndex="1"
              value={this.state.date}
              onNextFocus={this._onNextFocus}
              onSaveDate={this._onSaveDate}
            />
            <div>       
              <button className="submit-btn" onClick={this._onExport}>Import</button>
       
              <button className="submit-btn" onClick={this._onSubmit}>Export</button>
            </div>
       </div>

        <ProductTextInput
          id="new-todo"
          onSave={this._onSave}
          suggestedMode={true}
          sugNames={this.props.sugNames}
          date={this.state.date}
          ref="productTextInput"
        />

      </div>
    );
  },

  /**
   * Event handler called within ProductInput.
   * Defining this here allows ProductInput to be used in multiple places
   * in different ways.
   * @param {'string',int} data
   */
  _onSave: function(data) {
      SubmitActions.createProduct(data);   
  },

  _onSaveDate: function(date){
    if(date.trim()){
      this.setState({date: date})
    }
  },

  /*
    Envent handler called here

  */
  _onSubmit: function(f){
    //var date = this.props.date;
    var data = this.props.allProducts;
    //if date is not empty and data is not empty
    if(Object.keys(data).length !== 0){
      SubmitActions.postProducts(data);      
    }
  },
  _onExport: function(){
    var data = this.props.allProducts
    if(Object.keys(data).length !== 0){

      for(var i in data){
        data[i].quantity = -Math.abs(data[i].quantity)
      }

      SubmitActions.postProducts(data);  

    }
  },

  _onNextFocus: function(name) {  
     this.refs.productTextInput.onFocusInput(name);      
  }

});


module.exports = Header;
