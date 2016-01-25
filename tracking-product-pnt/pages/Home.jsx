var React = require('react')

// var RouteHandler = require('react-router').RouteHandler
var SearchStore = require('../stores/SearchStore')
var SearchActions = require('../actions/SearchActions.js')

/*
	Home :
*/

//components
var SearchInput = require('../components/SearchInput.jsx')
var ProductTable = require('../components/ProductTable.jsx')


function getHomeState(){
    return {
        allProducts : SearchStore.getAll()
    }
}

var Home = React.createClass({

    /**
     *
     *NEED TO FIX THE UPLOADABLE SCROLLING TO MAKE IT MORE FLEXIABLE
     *
    */

    getInitialState: function(){
       return {
            allProducts : SearchStore.getAll(),
            uploadable : true,
            lastDistance: 0,
       }
    },

    componentDidMount: function() {
        window.addEventListener('scroll',this._onScroll)
        SearchStore.addChangeListener(this._onChange)
    },

    componentWillUnmount: function() {
        window.removeEventListener('scroll',this._onScroll)
        SearchStore.removeChangeListener(this._onChange)
    },

    render: function() {

    var allProducts = this.state.allProducts.length === 0 ?
                            this.props.allProducts : this.state.allProducts

    return (<div>

                <a href="/n">Add</a><br/>
                <a href="/history">History</a>
    			<SearchInput
    				id="new-todo"
    				className='search-input'
                    onChange = {this._onInputChange}
    				placeholder="Searching here"
    			/>
    			<ProductTable ref="productTable" allProducts={allProducts} />
    		   
            </div>);
    },
    _onChange: function(){

        this.setState(getHomeState())
    },
    _onInputChange : function(value){
        
        if(value.trim() === ''){
            SearchActions.loadProducts(this.props.allProducts)
            this.setState({uploadable: true})
        }           
        else{
            SearchActions.searchProducts(value)
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

                  SearchActions.getProducts(Object.keys(this.state.allProducts).length,15) // 15 is load numbers

              }
           this.setState({lastDistance : distance})    

        }
    }
});

module.exports = Home