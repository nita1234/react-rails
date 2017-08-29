var Employee = React.createClass({
  getInitialState() {
    return {
      employee: this.props.employee,
      editMode: false,
      errors: {}
    }
  },

  setEditMode() {
    this.setState({editMode: true});
  },

  handleNameChange(e) {
    var newEmployee = this.state.employee
    newEmployee.name = e.target.value
    this.setState({employee: newEmployee});
  },

  handleEmailChange(e) {
    var newEmployee = this.state.employee
    newEmployee.email = e.target.value
    this.setState({employee: newEmployee});
  },

  handleManagerChange(e) {
    var newEmployee = this.state.employee
    newEmployee.manager = e.target.value
    this.setState({employee: newEmployee});
  },

  toggleManagerStatus: function () {
    var newEmployee = this.state.employee
    newEmployee.manager = !this.state.employee.manager 
    this.handleEmployeeUpdate();
  },

  handleEmployeeUpdate() {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        employee: that.state.employee,
      },
      url: '/employees/' + that.state.employee.id + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          employee: res,
          editMode: false
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },

  handleEmployeeFire() {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: '/employees/' + that.state.employee.id + '.json',
      success: function(res) {
        that.props.onFireEmployee(that.state.employee);
      }
    })
  },

  render() {
    var myStyle = {
      fontWeight:'bold',
      height:'30px',
      color: '#fff',
      'background-color': '#5cb85c',
      'border-color': '#4cae4c',
       border: '1px solid transparent',
      'border-radius': '4px',
      'margin-right':'16px'
    }

    var dangerType =
    {
      color: '#fff',
      'background-color': '#c9302c',
      'border-color': '#ac2925',
      fontWeight:'bold',
      height:'30px',
      border: '1px solid transparent',
     'border-radius': '4px'
    }
    var infoType={
     color: '#fff',
     'background-color': '#31b0d5',
     'border-color': '#269abc',
      border: '1px solid transparent',
     'border-radius': '4px',
     'margin-right':'16px',
     fontWeight:'bold',
     height:'30px'
    }
    if ( this.state.editMode ) {
      markup = (
        <tr>
          <td>
            <input
              type="text"
              value={this.state.employee.name}
              onChange={this.handleNameChange} />
            <span style={{color: 'red'}}>{this.state.errors.name}</span>
          </td> 
          <td>
            <input
              type="text"
              value={this.state.employee.email}
              onChange={this.handleEmailChange} />
            <br />
            <span style={{color: 'red'}}>{this.state.errors.email}</span>
          </td>
          <td>
            <input
              type="checkbox"
              value={this.state.employee.manager}
              onChange={this.handleManagerChange} />
          </td>
          <td>
            <button onClick={this.handleEmployeeUpdate}>Save</button>
          </td>
        </tr>
      );
    } else {
      markup = (
        <tr>
          <td>{this.state.employee.name}</td>
          <td>{this.state.employee.email}</td>
          <td>{this.state.employee.manager ? '✔' : ''}</td>
          <td>
            <button onClick={this.setEditMode} style={myStyle} > Edit of {this.state.employee.name}</button>
            <button onClick={this.toggleManagerStatus} style={infoType}>{this.state.employee.manager ? 'Demote' : 'Promote'}</button>
            <button onClick={this.handleEmployeeFire} style={dangerType}>Fire</button>
          </td>
        </tr>
      );
    }
    return markup;
  }
}); 

