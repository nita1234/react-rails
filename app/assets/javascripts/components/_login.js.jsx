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
      <div>
        <h1 id="login_page">Login Form</h1>
        <div id="login">
          <input type="email" id="email" placeholder="Email" ref={(email)=> this.email = email} autocomplete="off"/>
          <input type="password" id="password" placeholder="Password" ref={(passowrd)=> this.password = password} autocomplete="off"/>
          <button id="send" onClick={this.handleLogin}>Login</button>
        </div>
        <p className={errorClass}>There was an error with your login details</p>
        <button onClick={() => this.props.changePage("signup")} className="Sign_up">Sign Up</button>
      </div>
    )
  }
});