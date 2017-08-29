var Employees = React.createClass({
  getInitialState() {
    return {
      employees: this.props.employees,
      employee: {
        name: '',
        email: '',
        manager: false
      },
      errors: {}
    }
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

  handleHireEmployee() {
    var that = this;
    $.ajax({
      method: 'POST',
      data: {
        employee: that.state.employee,
      },
      url: '/employees.json',
      success: function(res) {
        var newEmployeeList = that.state.employees;
        newEmployeeList.push(res);
        that.setState({
          employees: newEmployeeList,
          employee: {
            name: '',
            email: '',
            manager: false
          },
          errors: {}
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors})
      }
    });
  },

  handleFireEmployee(employee) {
    var employeeList = this.state.employees.filter(function(item) {
      return employee.id !== item.id;
    });
    this.setState({employees: employeeList});
  },
  render() {
    var that = this;
    employees = this.state.employees.map( function(employee) {
      return (
        <Employee employee={employee} key={employee.id} onFireEmployee={that.handleFireEmployee} />
      );
    });
    var myStyle = 
    {
      fontSize: 50,
      color: '#FF0000'
    }
    var myColor = 
    {
      fontWeight:'bold',
      height:'30px',
      color: '#fff',
      'background-color': '#5cb85c',
      'border-color': '#4cae4c',
      border: '1px solid transparent',
      'border-radius': '4px'
    }
    var inputType =
    {
      height:'30px',
      width:'95%',
      'margin-right':'12px'
    }
    
    var CheckType = {   
      width: '27px',
      height: '40px',
      'margin-top': '3px'
    }
    
    return (
      <center>
        <div>
          <h1 style = {myStyle}>Employees</h1>
          <div id="employees">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Manager</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees}
                <tr>
                  <td>
                    <input type="text" value={this.state.employee.name} style={inputType} onChange={this.handleNameChange} /><br />
                    <span style={{color: 'red'}}>{this.state.errors.name}</span>
                  </td>
                  <td>
                    <input value={this.state.employee.email} type="text" style={inputType} onChange={this.handleEmailChange} /><br />
                    <span style={{color: 'red'}}>{this.state.errors.email}</span>
                  </td>
                  <td><input value={this.state.employee.manager} type="checkbox" style={CheckType} onChange={this.handleManagerChange} /></td>
                  <td><button onClick={this.handleHireEmployee} style={myColor}>New Employee</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </center>
    );
  }
});
