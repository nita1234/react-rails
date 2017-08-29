var Footer = React.createClass({
  render() {
    var style = {
    backgroundColor: "#DDD",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
  };

  var phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
  }
   return ( 
    <div>
      <div style={phantom} />
        <div style={style}>
          <span style={{color:'Black',fontWeight:'bold',fontSize: '21px'}}>@2017 Bestpeers Infosystem </span>
        </div>
      </div> 
    ) 
  }
});