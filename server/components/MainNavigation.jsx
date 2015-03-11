var ListItem = React.createClass({
  render: function () {
    return (
      <li role="menuitem">
        <a href={this.props.href}>{this.props.text}</a>
      </li>
    );
  }
});

var MenuBar = React.createClass({
  render: function () {
    var listItems = this.props.items.map(function (item) {
      return (
        <ListItem href={item.href} text={item.text} />
      );
    });

    return (
      <ul role="menu">
        {listItems}
      </ul>
    );
  }
});

// var MainNavigation = React.createClass({
//   render : function () {
//     return (
//       <nav id="mainNav" role="menubar" aria-expanded="false" aria-hidden="true">
//         <MenuBar items={this.props.data} />
//       </nav>
//     )
//   }
// });

var items = [{
  "href" : "/",
  "text" : "Home"
},{
  "href" : "/article",
  "text" : "Articles"
}];

React.render(
  // <MainNavigation data={items} />,
  <MenuBar items={items} />,
  document.getElementById('mainNav')
);