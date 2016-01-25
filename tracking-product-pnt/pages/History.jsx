var React = require('react');
var HistoryStore =require('../stores/HistoryStore')
var SearchActions = require('../actions/SearchActions')
/*
	History :
*/

//components
var SearchInput = require('../components/SearchInput.jsx')
var ProductTable = require('../components/ProductTable.jsx')


function updateAllProducts(){
	return {allProducts : HistoryStore.getAll()}
}

var History = React.createClass({

	getInitialState: function(){
		return {
			allProducts : HistoryStore.getAll(),
			uploadable : true,
            lastDistance: 0,
		}
	},

    componentDidMount: function() {
        window.addEventListener('scroll',this._onScroll)
        HistoryStore.addChangeListener(this._onChange)
    },

    componentWillUnmount: function() {
        window.removeEventListener('scroll',this._onScroll)
        HistoryStore.removeChangeListener(this._onChange)
    },

	render: function() {

		var allProducts = this.state.allProducts.length === 0 ?
		                        this.props.allProducts : this.state.allProducts

		return <div>

			<SearchInput
				id="new-todo"
				className='search-input'
		        onChange = {this._onInputChange}
				placeholder="Search here"
			/>
			<ProductTable ref='productTable' allProducts={allProducts} />
		</div>;
	},

	_onChange: function(){

        this.setState(updateAllProducts())
    },
    _onInputChange : function(value){
        
        if(value.trim() === ''){
        	SearchActions.loadHistory(this.props.allProducts)
            this.setState({uploadable: true})
        }
        else{
            SearchActions.searchHistory(value)
            this.setState({uploadable: false,lastDistance: 0})
        }
              
      
    },
  
    _onScroll : function(){
         if(!this.state.uploadable){ // when there is value in SearchInput, do nothing

          return
        }

        var lastDistance = this.state.lastDistance

        var node = React.findDOMNode(this.refs.productTable)
        
        var top = node.offsetTop

        var currentTop = node.getBoundingClientRect().top 
        
        var distance = Math.abs(currentTop - top)

        if(lastDistance < distance){
              
              if(parseInt(lastDistance/400) !== parseInt(distance/400) ){

                  SearchActions.getHistory(Object.keys(this.state.allProducts).length,15) // 15 is load numbers

              }
           this.setState({lastDistance : distance})    

        }
    }

});

module.exports = History