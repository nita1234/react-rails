var Edit = React.createClass({
  getInitialState: function() {
    return {
      editSuccessful: null,
      deleteUnsuccessful: false,
      items: [] 
    };
  },
   componentDidMount() {
    $.getJSON('/api/v1/items.json', (response) => { this.setState({ items: response }) });
  },

  handleSubmit: function(item) {
    var newState = this.state.items.concat(item);
    this.setState({ items: newState })
  },
  handleSearch: function(items) {
    this.setState({ items: items });
  },
  handleDelete: function(id) {
    $.ajax({
      url: `/api/v1/items/${id}`,
      type: 'DELETE',
      success:() => {
         this.removeItemClient(id);
      }
    });
  },

  removeItemClient: function(id) {
    var newItems = this.state.items.filter((item) => {
      return item.id != id;
    });

    this.setState({ items: newItems });
  },

  handleUpdate: function(item) {
    $.ajax({
      url: '/api/v1/items/${item.id}',
      type: 'PUT',
      data: { item: item },
      success: () => {
          this.updateItems(item);

      }
    }
  )},

  updateItems: function(item) {
    var items = this.state.items.filter((i) => { return i.id != item.id });
    items.push(item);
    this.setState({items: items });
  },

  // handleUpdate(e) {
  //   e.preventDefault();
  //   var that = this
  //   var userInfo = {
  //     user: {
  //       email: that.props.currentUser,
  //       password: document.getElementById("newPassword").value,
  //       password_confirmation: document.getElementById("confirmNewPassword").value,
  //     }
  //   }
  //   $.ajaxSetup({
  //      headers:
  //      { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content') }
  //   });
  //   $.ajax({
  //     type: "PUT",
  //     url: "/users",
  //     dataType: "json",
  //     data: userInfo,
  //     error: function (error) {
  //       that.updateEdit("false");
  //     },
  //     success: function (res) {
  //       that.updateEdit("true");
  //     },
  //   });
  // },

  // updateEdit(string) {
  //   this.setState({
  //     editSuccessful: string
  //   });
  // },

  updateDeleteError() {
    this.setState({
      deleteUnsuccessful: true
    });
  },

  // getEditData() {
  //   var customClass = "hidden";
  //   var message = "";
  //   switch(this.state.editSuccessful) {
  //     case "true":
  //       message = "Password successfully updated";
  //       customClass = "";
  //       break;
  //     case "false":
  //       message = "There was an error updating your password";
  //       customClass = "";
  //       break;
  //   };
  //   return {message: message, customClass: customClass};
  // },

  render: function() {
    var errorClass = this.state.deleteUnsuccessful ? "" : "hidden"
    // var editData = this.getEditData()
    return (
      <div>
        <h2>Search Item & Create New Item</h2>
        <Logout changePage={this.props.changePage}/>
        <SearchForm handleSearch={this.handleSearch} />
        <NewItem handleSubmit={this.handleSubmit}/>
        <AllItems  items={this.state.items}  handleDelete={this.handleDelete} onUpdate={this.handleUpdate}/> 
      </div>
    )
  }
})