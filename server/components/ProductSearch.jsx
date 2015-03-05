var ProductCategoryRow = React.createClass({
  render: function () {
    return (
      <tr><th colSpan="2">{this.props.category}</th></tr>
    );
  }
});

var ProductRow = React.createClass({
  render: function () {
    var name = this.props.product.stocked ? this.props.product.name : <span style={{color: 'red'}}>{this.props.product.name}</span>;
    return (
      <tr>
        <td>{name}</td>
        <td>${this.props.product.price}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function () {
    var rows = [];
    var lastCategory = null;

    this.props.products.forEach(function (product) {
      if(product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)){
        return;
      }
      if(product.category !== lastCategory) {
        lastCategory = product.category;
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
    }.bind(this));

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
  handleChange: function () {
    this.props.onUserInput(
      this.refs.filterTextInput.getDOMNode().value,
      this.refs.inStockOnlyInput.getDOMNode().checked
    );
  },
  render: function () {
    return (
      <form>
       <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange}/>
       <p>
        <input type="checkbox" checked={this.props.inStockOnly} ref="inStockOnlyInput" onChange={this.handleChange}/>
        {' '} Only show products in stock;
       </p>
      </form>
    );
  }
});

var FilterProductTable = React.createClass({
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
      <div>
        <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onUserInput={this.handleUserInput}/>
        <ProductTable products={this.state.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
      </div>
    );
  }
});

React.render(<FilterProductTable url="/api/products" interPol={5000} />, document.getElementById('products'));