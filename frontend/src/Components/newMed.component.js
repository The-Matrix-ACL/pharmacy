import React, { Component } from "react";
import axios from "axios";

export default class AddMed extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeIngredients = this.onChangeIngredients.bind(this);
    this.onChangeUsage = this.onChangeUsage.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePicture = this.onChangePicture.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeSales = this.onChangeSales.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      price: "",
      ingredients: "",
      usage: "",
      description: "",
      picture: "",
      amount: 0,
      sales: 0,
      //users: []
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeIngredients(e) {
    this.setState({
      ingredients: e.target.value,
    });
  }

  onChangeUsage(e) {
    this.setState({
      usage: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangePicture(e) {
    this.setState({
      picture: e.target.value,
    });
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  onChangeSales(e) {
    this.setState({
      sales: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const medicine = {
      name: this.state.name,
      price: this.state.price,
      ingredients: this.state.ingredients,
      usage: this.state.usage,
      description: this.state.description,
      picture: this.state.picture,
      amount: this.state.amount,
      sales: this.state.sales,
    };

    console.log(medicine);

    axios
      .post("http://localhost:8000/pharma/pharmacist/addMed", medicine)
      .then((res) => console.log(res.data));
  }

  render() {
    return (
      <div>
        <h3>Add new medication</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>

          <div className="form-group">
            <label>Price: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </div>

          <div className="form-group">
            <label>Ingredients: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.ingredients}
              onChange={this.onChangeIngredients}
            />
          </div>

          <div className="form-group">
            <label>Usage: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.usage}
              onChange={this.onChangeUsage}
            />
          </div>

          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label>Picture: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.picture}
              onChange={this.onChangePicture}
            />
          </div>

          <div className="form-group">
            <label>Amount: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.amount}
              onChange={this.onChangeAmount}
            />
          </div>
          <div className="form-group">
            <label>Sales: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.sales}
              onChange={this.onChangeSales}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Add medication"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
