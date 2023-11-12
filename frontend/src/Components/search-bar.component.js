import React, { Component } from "react";
import axios from "axios";

const Medicine = (props) => (
  <tr>
    <td>{props.medicine.name}</td>
    <td>{props.medicine.price}</td>
    <td>{props.medicine.ingredients}</td>
    <td>{props.medicine.usage}</td>
    <td>{props.medicine.description}</td>
    <td>{props.medicine.picture}</td>
    <td>{props.medicine.amount}</td>
    <td>{props.medicine.sales}</td>
    <td></td>
  </tr>
);

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.searchFor = this.searchFor.bind(this);
    //this.show = this.show.bind(this);

    this.state = {
      name: "",
      medicine: [],
      searched: false,
    };
  }

  onChangeSearch(e) {
    this.setState({
      name: e.target.value,
    });
  }

  medicineList() {
    return this.state.medicine.map((currentmedicine) => {
      return <Medicine medicine={currentmedicine} key={currentmedicine._id} />;
    });
  }
  searchFor(e) {
    e.preventDefault();
    let name = this.state.name;

    axios
      .get("http://localhost:8000/pharma/pharmacist/viewMedicine/" + name)
      .then((response) => {
        this.setState({ medicine: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ searched: true });
  }

  render() {
    return (
      <>
        <form onSubmit={this.searchFor}>
          <input
            className="form-control"
            placeholder="Search..."
            onChange={this.onChangeSearch}
          />
          <input type="submit" value="Search" className="btn btn-primary" />
        </form>
      </>
    );
  }
}
