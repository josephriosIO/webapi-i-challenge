import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "./actions";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div className="App">
        {!this.props.fetching
          ? this.props.users.map(user => <div>{user.name}</div>)
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.userReducers.users,
  fetching: state.userReducers.fetching
});

export default connect(
  mapStateToProps,
  { getUsers }
)(App);
