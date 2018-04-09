import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import { Home, Stock, Header } from "./components";
import { getAllAvailableStocks } from "./helpers";
import { setAllAvailableStocks } from "./actions";
import "./App.css";
import "izitoast/dist/css/iziToast.css";

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
      <ConnectedRouter history={this.props.history}>
        <div className="main-container">
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/stocks/:symbol/" component={Stock} />
        </div>
      </ConnectedRouter>
    );
  }
}

const App = connect(null, { setAllAvailableStocks })(UnconnectedApp);

export default App;
