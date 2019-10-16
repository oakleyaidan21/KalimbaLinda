import React, { Component } from "react";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import SongSquare from "./components/home-components/SongSquare";
import Form from "react-bootstrap/Form";
import { Link } from "@reach/router";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songSquares: [],
      curLocalStorage: [],
      didConnect: false,
      user: this.props.location.state.userID
    };
  }

  parseText = data => {
    if (data != null) {
      var temp = [];
      this.setState({ didConnect: true });
      for (var i = 0; i < data.length; i++) {
        if (data[i].username === this.state.user) {
          temp.push({
            title: data[i].title,
            keySig: data[i].keysig,
            tempo: data[i].tempo,
            length: data[i].length,
            id: data[i].id,
            songString: data[i].songString
          });
        }
      }
      this.setState({ songSquares: temp });
    }
  };

  componentDidMount = () => {
    fetch("https://warm-inlet-29455.herokuapp.com/kalimba_songs")
      .then(
        data => {
          return data.json();
        },
        err => console.log(err)
      )
      .then(parsedData => this.parseText(parsedData), err => console.log(err));
  };

  render() {
    var squaresRendered = false;
    let squares;
    if (this.state.songSquares.length > 0) {
      squaresRendered = true;
    }

    if (squaresRendered) {
      squares = this.state.songSquares.map(songSquare => (
        <SongSquare
          title={songSquare.title}
          keySig={songSquare.keySig}
          tempo={songSquare.tempo}
          length={songSquare.length}
          id={songSquare.id}
          user={this.state.user}
          songString={songSquare.songString}
          onDelete={this.deleteSongSquare}
          onCopy={this.copySongSquare}
          reFetch={this.componentDidMount}
        ></SongSquare>
      ));
    } else {
      var text =
        "You don't have any songs. Click on '+ Create' to start one, or refresh the page to see your new ones!";
      if (this.state.didConnect === false) {
        text = "Could not connect to the database! Try refreshing?";
      }
      squares = (
        <div
          style={{
            height: 500,
            width: 600,
            fontSize: 20,
            textAlign: "center",
            margin: "0 auto",
            marginTop: 300,
            color: "grey"
          }}
        >
          {text}
        </div>
      );
    }

    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Kalimba Libre</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>Song Database</Nav.Link>
            <Nav.Link>About</Nav.Link>
            <Nav.Link
              href="https://github.com/oakleyaidan21/KalimbaLibre"
              target="_blank"
            >
              Github
            </Nav.Link>
          </Nav>
          <Form inline>
            <Link to="/">
              <Button variant="outline-primary">Logout</Button>
            </Link>
          </Form>
        </Navbar>
        <div className="home-page">
          <b>
            Your Songs{" "}
            <Link
              to={"/newtab/"}
              target="_blank"
              state={{ dbID: 0, userID: this.state.user }}
            >
              <Button variant="primary">+ Create</Button>
            </Link>
          </b>
          {/* just a line break */}
          <div style={{ height: 2, backgroundColor: "grey" }}></div>
          {squares}
        </div>
      </div>
    );
  }
}

export default HomePage;
