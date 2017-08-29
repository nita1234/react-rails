var AllItems = React.createClass({
  handleDelete(id) {
    this.props.handleDelete(id);
  },

  onUpdate(item) {
    this.props.onUpdate(item);
  },

  render() {
     var tableType={
     border: '1px solid black',
     'borderCollapse': 'collapse',
     'marginTop':'12px',
     'textAlign': 'center',
      width: '40%',
      color: 'orangered'
    }
    var tableType1={
      border: '1px solid black',
     'borderCollapse': 'collapse',
     'marginTop':'12px',
     'textAlign': 'center',
      marginLeft: '233px',
      width:'57%',
      height: '300px',
      overflowY: 'auto',
      overflowX: 'hidden',
      display: 'block'
    }
    var items= this.props.items.map((item) => {
      return (
        <tbody key={item.id}>
          <Item item={item}
            handleDelete={this.handleDelete.bind(this, item.id)}
            handleUpdate={this.onUpdate}/>
        </tbody>
      )
    });
    return(
      <table style={tableType1} class="table table-hover">
        <thead>
          <tr>
            <th style={tableType}>Name</th>
            <th style={tableType}>Description</th>
            <th style={tableType} >Action</th>
          </tr>
        </thead>
          {items}
      </table>
    
    )
  }
});
