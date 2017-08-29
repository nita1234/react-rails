var Item = React.createClass({
  getInitialState() {
    return {editable: false}
  },
  handleEdit() {
    if(this.state.editable) {
      var name = this.name.value;
      var id = this.props.item.id;
      var description = this.description.value;
      var item = {id: id , name: name , description: description};
      this.props.handleUpdate(item);
    }
    this.setState({ editable: !this.state.editable })
  },

  render() {
    var inputType =
    {
      height: '30px',
      width: '250px',
      marginRight: '12px',
      paddingLeft: '12px'
    }
    var myColor = 
    {
      fontWeight:'bold',
      height:'30px',
      color: '#fff',
      backgroundColor: '#5cb85c',
      borderColor: '#4cae4c',
      border: '1px solid transparent',
      borderRadius: '4px'
    }
    var dangerType={
      fontWeight:'bold',
      height:'30px',
      border: '1px solid transparent',
      borderRadius: '4px',
      marginRight:'12px',
      color: '#fff',
      backgroundColor: '#d9534f',
      borderColor: '#d43f3a'
    }
    var divType = {
      marginTop:'12px'
    }
    var spanType={
      marginRight:'12px'
    }
    var tableType={
     border: '1px solid black',
     'borderCollapse': 'collapse',
      padding: '15px'
    }
    var name = this.state.editable ? <input type='text' ref={(name) => this.name = name} defaultValue={this.props.item.name} style={inputType}/> : <span style={spanType}>{this.props.item.name}</span>;
    var description = this.state.editable ? <input type='text' ref={(description) => this.description = description} defaultValue={this.props.item.description} style={inputType} />: <span style={spanType}>{this.props.item.description}</span>;
    return (
      <tr>
        <td style={tableType}>{name}</td>
        <td style={tableType}>{description}</td>
        <td style={tableType}>
          <button onClick={this.props.handleDelete} style={dangerType} >Delete</button>
          <button onClick={this.handleEdit} style={myColor}> {this.state.editable ? 'Update' : 'Edit' } </button>
        </td>
      </tr>
    )
  }
});