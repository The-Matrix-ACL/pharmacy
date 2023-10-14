import React, { Component } from "react";
import axios from "axios";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.searchFor = this.searchFor.bind(this);

    this.state = {
      name: "",
    };
  }
  onChangeSearch(e) {
    this.setState({
      name: e.target.value,
    });
  }

  searchFor(e) {
    e.preventDefault();
    const search = this.name.state;

    axios
      .post("http://localhost:3000/viewMedicine/:name", search)
      .then((res) => console.log(res.data));
  }

  render() {
    return (
      <>
        <form onSubmit={this.searchFor}>
          <label for="search">Search</label>
          <input
            className="form-control"
            value={this.state.search}
            placeholder="Search..."
            onChange={this.onChangeSearch}
          />
          <input type="submit" value="Search" className="btn btn-primary" />
        </form>
      </>
    );
  }
}
