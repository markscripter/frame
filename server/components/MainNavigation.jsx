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

var items = [{
  "href" : "/",
  "text" : "Home"
},{
  "href" : "/article",
  "text" : "Articles"
}];

React.render(
  <MenuBar items={items} />,
  document.getElementById('mainNav')
);