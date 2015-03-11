var ListItem = React.createClass({displayName: "ListItem",
  render: function () {
    return (
      React.createElement("li", {role: "menuitem"}, 
        React.createElement("a", {href: this.props.href}, this.props.text)
      )
    );
  }
});

var MenuBar = React.createClass({displayName: "MenuBar",
  render: function () {
    var listItems = this.props.items.map(function (item) {
      return (
        React.createElement(ListItem, {href: item.href, text: item.text})
      );
    });

    return (
      React.createElement("ul", {role: "menu"}, 
        listItems
      )
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
  React.createElement(MenuBar, {items: items}),
  document.getElementById('mainNav')
);