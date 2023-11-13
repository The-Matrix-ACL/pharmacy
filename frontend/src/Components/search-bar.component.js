import React, { Component } from "react";
import axios from "axios";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.searchFor = this.searchFor.bind(this);

    this.state = {
      name: [],
    };
  }
  onChangeSearch(e) {
    this.setState({
      name: e.target.value,
    });
  }

  searchFor(e) {
    e.preventDefault();
    const name = this.state.name;

    axios.get(`http://localhost:8000/viewMedicine/${name}`).then((response) => {
      this.state({ name: response.data });
      console.log(response);
    });
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

