import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import { Home, Stock } from "./components";
import { getAllAvailableStocks } from "./helpers";
import { setAllAvailableStocks } from "./actions";
import "./App.css";

class UnconnectedApp extends Component {
  async componentDidMount() {
    try {
      const allAvailableStocks = await getAllAvailableStocks();
      this.props.setAllAvailableStocks(allAvailableStocks);
    } catch (err) {
      console.log("**Could not get all available stock symbols", err);
    }
  }
  render() {
    return (
      <div className="main-container">
        <Route exact path="/" component={Home} />
        <Route exact path="/stocks/:symbol/" component={Stock} />
      </div>
    );
  }
}

const App = connect(null, { setAllAvailableStocks })(UnconnectedApp);

export default App;
