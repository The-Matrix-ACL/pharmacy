import React, { Component } from "react";
import axios from "axios";
import medicineModel from "../../backend/src/Models";

export default class ViewMeds extends Component {
  constructor(props) {
    super(props);

    this.show = this.show.bind(this);

    this.state = {
      name: "",
      price: 0.0,
      ingredients: "",
      usage: "",
      description: "",
      picture: "",
      amount: 0,
      sales: 0,
    };
  }

  showMeds(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3000/AvailableMedicine/")
      .then((res) => (this.show = medicineModel.find()));
  }
  render() {
    return <div>{this.medicineModel.map()}</div>;
  }
}
