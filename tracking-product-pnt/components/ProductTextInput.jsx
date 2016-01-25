/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var KEY_CODE = require('../constants/Keys')
var DataHelper = require('../helpers/DataHelper')
var SubmitActions = require('../actions/SubmitActions')

//components
var QuantityInput = require('./QuantityInput.jsx');
var ErrorMessage = require('./ErrorMessage.jsx');
var AutoComplete = require('./AutoComplete.jsx');
var SugNameList = require('./SugNameList.jsx')


var ProductTextInput = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.value || '',
      quantity : this.props.quantity || '',
      error : ''
    };
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {

    var error = this.state.error !== '' ? <ErrorMessage className='error-text' message={this.state.error}/> : '';

    var sugName = this.getSelectedSlug()

    if(typeof sugName !== 'undefined' && sugName.name.indexOf(this.state.value) === 0){
        
        var autocomp = <AutoComplete id="auto-comp" value={sugName.name}/>

        var style = {background : "transparent"}
    }

    if(this.props.className !== 'edit')
      var list = <SugNameList onSave={this._save} sugNames={this.props.sugNames} className="autocomplete-list" />


    return (
      <div className={this.props.className}>
        <QuantityInput
          id='quant-input'
          placeholder="SL"
          ref="quantInput"
          autoFocus={true}
          className={this.props.className}
          value={this.state.quantity}
          onSaveQuantity={this._saveQuantity}
          onNextFocus={this.onFocusInput}
          onError= {this._onError}
          tabIndex = "2"
        />
        <input
          id="new-todo"
          style={style}
          placeholder={this.props.placeholder || 'Product name'}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          value={this.state.value}
          tabIndex="3"
          ref="textInput"
        />
        {autocomp}

        {list}

        {error}

      </div>
    );
  },

  /**
   *
   * save quantity of user's input from QuantityInput input
  * @param : int quant

  */

   _saveQuantity: function(quant){
      this.setState({
        quantity : quant
      })
   },

   /**
    *
    *THIS FUNCTION DO TOO MUCH
        - VALIDATION
        - SUBMIT

    * 
   */

  _save: function(e) {

    var name = this.state.value.trim().toLowerCase();

    var quantity = this.state.quantity;

    if(name === '' && typeof e === 'undefined'){//advoid error shows when blur event occurs
      
      this._onError("Product name is invalid ")

    }else if(quantity === '' || !DataHelper.isInt(quantity)){

      this._onError("SL is invalid")

    }else{ 
      
      quantity = parseInt(quantity,10)

      if(quantity === 0)  return this._onError("SL is empty");

      var selectedSug = this.getSelectedSlug();

      if(typeof selectedSug !== 'undefined'){
        name = selectedSug.name
      }
      
      this.props.onSave({name:name,quantity:quantity,date:this.props.date});

      this.setState({
        value: '',
        quantity: ''
      });

      SubmitActions.getSuggestNames('')

      this.onFocusInput('quantInput')
    }

  },

  _onError: function(message){
      this.setState({
        error : message
      })
  },

  _onFocus: function(){
    this.setState({error : ''})
  },

  /**
   * @param {object} event
   */
  _onChange: function(/*object*/ event) {
    
    var value = event.target.value;

    this.setState({
      value: value,
      error: ''
    });

    if(this.props.suggestedMode && typeof this.getSelectedSlug !== 'undefined')
    SubmitActions.getSuggestNames(value);
    
  },

  _onKeyDown: function(event){

    var selectedSug = this.getSelectedSlug()

    var id = typeof selectedSug === 'undefined' ? undefined : selectedSug.id

    if(this.props.suggestedMode){
      var lI = Object.keys(this.props.sugNames).length - 1
      var nI;
      id = isNaN(id) ? -1 : parseInt(id)
    }
    

    switch (event.keyCode){
      case KEY_CODE.enter     : this._save();
                                break;
      case KEY_CODE.backSpace : if(this.state.value == '' ){
                                  event.preventDefault();
                                  this.onFocusInput('quantInput')
                                };
                                break;
      case KEY_CODE.downArrow : if(id === lI){
                                  SubmitActions.undoSugSelected()
                                }
                                else{
                                  nI = id + 1
                                  SubmitActions.toggleSugNameSelected(nI)
                                  //this.setState({value : selectedSug.name})
                                }
                                break;
      case KEY_CODE.upArrow   : event.preventDefault();
                                if(id === 0){
                                  this.onFocusInput('textInput')
                                  SubmitActions.undoSugSelected()
                                }else if(lI !== -1){
                                  nI = id === -1 ? lI : id - 1
                                  SubmitActions.toggleSugNameSelected(nI)
                                }                               
                                break;
    } 
  },

  _onBlur: function(){
    if(this.props.className === 'edit'){
          this._save();
    }
  },
  onFocusInput: function(name){
    React.findDOMNode(this.refs[name]).focus();
  },

  getSelectedSlug: function(nextSugNames){

    var sugNames = typeof nextsugNames === 'undefined' ? this.props.sugNames : nextSugNames

    var selectedSug

    for(var i in sugNames){
      if(sugNames[i].selected){
        selectedSug = sugNames[i]
      }
    }
    return selectedSug
  }


});

module.exports = ProductTextInput;
