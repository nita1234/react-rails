var SearchForm = React.createClass({
  handleSearch: function() {
    var query = ReactDOM.findDOMNode(this.query).value;
    var self = this;
    $.ajax({
      url: '/api/v1/items/search',
      data: { query: query },
      success: function(data) {
        self.props.handleSearch(data);
      },
      error: function(xhr, status, error) {
        alert('Search error: ', error);
      }
    });
  },
  render: function() {
    var serachType={
      marginLeft: '163px',
      position: 'relative',
      top: '30px',
      height: '30px',
      width: '217px',
      marginRight: '12px',
      paddingLeft: '12px'
    }
    return(
      <input onChange={this.handleSearch} type="text" placeholder="Type a search item here..." ref={(query) => this.query = query} style={serachType} />
    )
  }
});