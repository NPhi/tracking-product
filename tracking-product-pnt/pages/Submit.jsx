var React = require('react');

var Footer = require('../components/Footer.jsx');
var Header = require('../components/Header.jsx');
var MainSection = require('../components/MainSection.jsx');
var SubmitStore = require('../stores/SubmitStore');

/**
 * Retrieve the current TODO data from the SubmitStore*/
function getProductState() {
  return {
    allProducts: SubmitStore.getAll(),
    sugNames: SubmitStore.getSugNames()
 //   date : SubmitStore.getDate(),
  };
}

var Submit = React.createClass({

  getInitialState: function() {
    return getProductState();
  },

  componentDidMount: function() {
    SubmitStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SubmitStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <Header sugNames={this.state.sugNames} allProducts={this.state.allProducts} date={this.state.date}/>
        <MainSection allProducts={this.state.allProducts}/>
        <Footer allProducts={this.state.allProducts}/>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the SubmitStore
   */
  _onChange: function() {
    this.setState(getProductState());
  }

});

module.exports = Submit;
