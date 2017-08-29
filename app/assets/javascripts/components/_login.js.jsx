var Login = React.createClass({
  getInitialState: function() {
    return {
      loginUnsuccessful: false
    };
  },
  handleLogin(e) { 
    e.preventDefault();
    var email= this.email.value;
    var password = this.password.value;
     $.ajax({
      url: '/users/sign_in', 
      type: 'POST', 
      dataType: "json",
      data: {user: { email: email, password: password} }, 
      success: (user) => {
        console.log('it worked!', user);
        ReactDOM.findDOMNode(this.email).value = "";
        ReactDOM.findDOMNode(this.password).value = "";
        this.props.changePage("edit");
        this.props.updateCurrentUser(user.email);
        },
      error: function(xhr, status, error) {
        this.updateLoginError();
      }
    })
  },
    updateLoginError() {
      this.setState({
        loginUnsuccessful: true
      });
    },
  render:function(){
    var errorClass = this.state.loginUnsuccessful ? "" : "hidden"
    return (
      <center>
        <div id="login">
          <h1 id="login_page">Login</h1>
          <div className="form-group emailInput has-feedback">
            <label for="email">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Email" ref={(email)=> this.email = email} autocomplete="off"/>
          </div> 
          <div className="form-group passewordInput has-feedback">
            <label for="password">Password</label>
            <input type="password" id="password" className="form-control" placeholder="Password" ref={(passowrd)=> this.password = password} autocomplete="off"/>
          </div> 
            <button id="send" onClick={this.handleLogin}>Login</button>
          <p className={errorClass}>There was an error with your login details</p>
          <p className="loginbottomtext">Still don't have an account? <a onClick={() => this.props.changePage("signup")} className="Sign_up">Register</a></p>
          <p className="text-muted loginbottomtext">©Bestpeers</p> 
        </div>
      </center>
    )
  }
});
