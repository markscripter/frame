var ProductCategoryRow = React.createClass({displayName: "ProductCategoryRow",
  render: function () {
    return (
      React.createElement("tr", null, React.createElement("th", {colSpan: "2"}, this.props.category))
    );
  }
});

var ProductRow = React.createClass({displayName: "ProductRow",
  render: function () {
    var name = this.props.product.stocked ? this.props.product.name : React.createElement("span", {style: {color: 'red'}}, this.props.product.name);
    return (
      React.createElement("tr", null, 
        React.createElement("td", null, name), 
        React.createElement("td", null, "$", this.props.product.price)
      )
    );
  }
});

var ProductTable = React.createClass({displayName: "ProductTable",
  render: function () {
    var rows = [];
    var lastCategory = null;

    this.props.products.forEach(function (product) {
      if(product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)){
        return;
      }
      if(product.category !== lastCategory) {
        lastCategory = product.category;
        rows.push(React.createElement(ProductCategoryRow, {category: product.category, key: product.category}));
      }
      rows.push(React.createElement(ProductRow, {product: product, key: product.name}));
    }.bind(this));

    return (
      React.createElement("table", null, 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null, "Name"), 
            React.createElement("th", null, "Price")
          )
        ), 
        React.createElement("tbody", null, 
          rows
        )
      )
    );
  }
});

var SearchBar = React.createClass({displayName: "SearchBar",
  handleChange: function () {
    this.props.onUserInput(
      this.refs.filterTextInput.getDOMNode().value,
      this.refs.inStockOnlyInput.getDOMNode().checked
    );
  },
  render: function () {
    return (
      React.createElement("form", null, 
       React.createElement("input", {type: "text", placeholder: "Search...", value: this.props.filterText, ref: "filterTextInput", onChange: this.handleChange}), 
       React.createElement("p", null, 
        React.createElement("input", {type: "checkbox", checked: this.props.inStockOnly, ref: "inStockOnlyInput", onChange: this.handleChange}), 
        ' ', " Only show products in stock;"
       )
      )
    );
  }
});

var FilterProductTable = React.createClass({displayName: "FilterProductTable",
  loadProducts: function () {
    $.ajax({
      url: this.props.url,
      success: function (data){
        this.setState({products: data});
      }.bind(this),
      error: function(err) {
        console.log(this.props.url, err);
      }.bind(this)
    })
  },
  componentDidMount: function() {
    this.loadProducts();
    setInterval(this.loadProducts, this.props.interPol);
  },
  getInitialState: function (){
    return {
      filterText: '',
      inStockOnly: false,
      products: []
    }
  },
  handleUserInput: function (filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement(SearchBar, {filterText: this.state.filterText, inStockOnly: this.state.inStockOnly, onUserInput: this.handleUserInput}), 
        React.createElement(ProductTable, {products: this.state.products, filterText: this.state.filterText, inStockOnly: this.state.inStockOnly})
      )
    );
  }
});

React.render(React.createElement(FilterProductTable, {url: "/api/products", interPol: 5000}), document.getElementById('products'));