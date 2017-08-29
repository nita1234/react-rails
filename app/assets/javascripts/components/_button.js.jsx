var Button  = React.createClass({
  getInitialState:function(){
    return {signup:false,login:true}
  },
  switch:function(word){
    var signup,login;
    if(word == "signup"){signup = true;login = false;}
    else{login = true; signup = false;}
    return this.setState({login:login,signup:signup})
    
  },
  render:function(){
    return (
      <div>
        <div id="buttons">
          <p id="signupButton" onClick={this.switch.bind(null,"signup")} className={this.state.signup ? "yellow":"blue"}>Sign In</p>           
          <p id="loginButton" onClick={this.switch.bind(null,"login")} className={this.state.login ? "yellow":"blue"}> Login</p>   
        </div>
        {this.state.signup?<Signup/> : null}
        {this.state.login?<Login/>:null}
      </div>
            
    )
  }
});



