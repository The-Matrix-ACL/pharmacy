import React, { Component } from "react";
import SearchBar from "./search-bar.component";
import Filter from "./filter.component";

export default class Results extends Component {
  render() {
    if (SearchBar.state.searched) {
      Filter.setState({ filtered: false });
      return (
        <>
          <form onSubmit={SearchBar.searchFor}>
            <input
              className="form-control"
              placeholder="Search..."
              onChange={SearchBar.onChangeSearch}
            />
            <input type="submit" value="Search" className="btn btn-primary" />
          </form>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Ingredients</th>
                <th>Usage</th>
                <th>description</th>
                <th>Picture</th>
                <th>Amount</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody>{SearchBar.medicineList()}</tbody>
          </table>
        </>
      );
    }
    if (Filter.state.filtered) {
      SearchBar.setState({ searched: false });
      return (
        <>
          <form className="form-control" onSubmit={this.filter}>
            <label> Filter </label>
            <select onChange={this.onChangeFilter}>
              {Filter.usageList().map((usages) => (
                <option key={usages.usage} value={usages.usage}>
                  {usages.usage}
                </option>
              ))}
            </select>
          </form>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Ingredients</th>
                <th>Usage</th>
                <th>description</th>
                <th>Picture</th>
                <th>Amount</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody>{Filter.medicineList()}</tbody>
          </table>
        </>
      );
    }
  }
}
