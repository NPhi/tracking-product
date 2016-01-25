
var React = require('react');
var SubmitActions = require('../actions/SubmitActions');
var ProductTextInput = require('./ProductTextInput.jsx');

var classNames = require('classnames');

var move = false;

var TodoItem = React.createClass({

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    React.initializeTouchEvents(true)

    var product = this.props.product;
    var idStr = '(' + this.props.id + ')'

    var input;
    if (this.state.isEditing) {
      input =
        <ProductTextInput
          className="edit"
          onSave={this._onSave}
          value={product.name}
          suggestedMode={false}
          quantity={product.quantity}
        />;
    }

    // List items should get the class 'editing' when editing
    // This differentiation between classification and state becomes important
    return (
      <li
        className={classNames({
          'editing': this.state.isEditing
        })}
        key={product.id}>
        <span id="product-order">{idStr}</span>
        <div className="view">
          <label style={{cursor: 'pointer'}} onTouchStart={this._onTouchStart} onTouchMove={this._onTouchMove} onTouchEnd={this._onTouchEnd} onDoubleClick={this._onDoubleClick}>
            <span id="quantity">{product.quantity}</span>
            <span id="name">{product.name}</span> 
          </label>
          <button className="destroy" onClick={this._onDestroyClick}/>
        </div>
        {input}
      </li>
    );
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  // /**
  //  * Event handler called within ProductTextInput.
  //  * Defining this here allows ProductTextInput to be used in multiple places
  //  * in different ways.
  //  * @param  {string} text
  //  */
  _onSave: function(data) {
    SubmitActions.updateProduct(this.props.product.id, data);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    SubmitActions.destroy(this.props.product.id);
  },
  // _onTouchMove: function(e){
  //   move = true;
  // },
  // _onTouchEnd: function(e){
  //     if(!move){
  //       this.setState({isEditing: true});
  //     }
  //     else{
  //       move = false;
  //     }
  // }

});

module.exports = TodoItem;
