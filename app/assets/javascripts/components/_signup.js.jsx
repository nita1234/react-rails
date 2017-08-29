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
    <div>
    <h1 id="login_page">Sign Up Form</h1>
      <div id="signup">
        <input type="email" id="email" placeholder="Email" ref={(email)=> this.email = email} autocomplete="off"/>
        <input type="password" id="password" placeholder="Password" ref={(password) => this.password=password} autocomplete="off"/>
        <input type="password" id="confirm" placeholder="Confirm Password" ref={(password_confirmation)=>this.password_confirmation = password_confirmation} autocomplete="off"/>
        <button id="send" onClick={this.handleClick} >Sign Up</button>
      </div>
      <p className={errorClass}>There was an error with your signup details</p>
      <button onClick={() => this.props.changePage("login")} className="Sign_in">Login</button>
    </div>
    
    )
  }
})