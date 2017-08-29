var Signup = React.createClass({
 getInitialState: function() {
    return {
      signupUnsuccessful: false
    };
  },
  handleClick(e) { 
    e.preventDefault();
    var email= this.email.value;
    var password = this.password.value;
    var password_confirmation = this.password_confirmation.value
     $.ajax({
      url: ' /users', 
      type: 'POST',
      dataType: "json", 
      data: {user: { email: email, password: password, password_confirmation: password_confirmation} }, 
      success: (user) => {
        ReactDOM.findDOMNode(this.email).value = "";
        ReactDOM.findDOMNode(this.password).value = "";
        ReactDOM.findDOMNode(this.password_confirmation).value = "";
        this.props.changePage("edit");
        this.props.updateCurrentUser(user.email);
        },
      error: function(xhr, status, error) {
       // this.updateSignupError()
      }
    })
  },
  updateSignupError() {
    this.setState({
      signupUnsuccessful: true
    });
  },
  render:function(){
    var errorClass = this.state.signupUnsuccessful ? "" : "hidden"
    return (
      <center>
        <div id="login">
          <h1 id="login_page">Sign Up</h1>
          <div className="form-group emailInput has-feedback">
            <label for="email">Email</label>
            <input type="email" id="email" className="form-control" placeholder="Email" ref={(email)=> this.email = email} autocomplete="off"/>
          </div>
          <div className="form-group passewordInput has-feedback">
            <label for="password">Password</label>
            <input type="password" id="password" className="form-control" placeholder="Password" ref={(password) => this.password=password} autocomplete="off"/>
          </div> 
          <div className="form-group passewordInput has-feedback">
            <label for="password">Confirm Password</label>
            <input type="password" id="confirm" placeholder="Confirm Password" className="form-control" ref={(password_confirmation)=>this.password_confirmation = password_confirmation} autocomplete="off"/>
          </div> 
          <button id="send" onClick={this.handleClick} >Sign Up</button>
          <p className={errorClass}>There was an error with your signup details</p>
          <p className="loginbottomtext">Already have an account? <a onClick={() => this.props.changePage("login")} className="Sign_up">Login</a></p>
          <p className="text-muted loginbottomtext">©Bestpeers</p> 
        </div>
      </center>
    )
  }
})
