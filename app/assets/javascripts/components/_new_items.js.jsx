var NewItem = React.createClass({
  handleClick() { 
    var name = this.name.value; 
    var description = this.description.value;
     $.ajax({
      url: '/api/v1/items', 
      type: 'POST', 
      data: { item: { name: name, description: description } }, 
      success: (item) => {
        this.props.handleSubmit(item);
         ReactDOM.findDOMNode(this.name).value = "";
         ReactDOM.findDOMNode(this.description).value = "";
        },
      error: function(xhr, status, error) {
        alert('Cannot add a new record: ', error);
      }
    })
  },
 
  render: function(){
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
    return(
      <div style={{marginLeft: '460px'}}>
       <input type="text" ref={(name) => this.name = name} placeholder='Enter the name of the item' style={inputType} />
       <input type="text" ref={(description) => this.description = description} placeholder='Enter the description of the item' style={inputType} />
       <button onClick={this.handleClick} style={myColor}>Add</button>
      </div>
    )
  }
});