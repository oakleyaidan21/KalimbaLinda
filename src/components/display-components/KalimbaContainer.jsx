//contains every component that has to do with inputting notes into the kalimba's song
import React, { Component } from "react";
import NoteContainer from "./NoteContainer";
import TineContainer from "./TineContainer";

class KalimbaContainer extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      tineNotes: this.props.tineNotes
    };
  }

  handleTopLevelPlay = () => {
    this.refs.noteChild.goThroughEachTotalNote();
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ curTime: nextProps.curTime });
    this.setState({ tineNotes: nextProps.tineNotes });
  };

  render() {
    return (
      <div
        id="holder"
        style={{
          width: "545px",
          margin: "0 auto",
          height: 600,
          background: "#D4D4D4",
          borderRadius: "0 0 25px 25px",
          overflow: "auto",
          position: "relative"
        }}
      >
        <TineContainer
          amountOfTNotes={this.props.amountOfTNotes}
          tineNotes={this.props.tineNotes}
        />
        <NoteContainer
          onHolderPassUp={this.handleHolderPassUp}
          amountOfTNotes={this.props.amountOfTNotes}
          tineNotes={this.state.tineNotes}
          kalimba={this.props.kalimba}
          playing={this.props.playing}
          ref="noteChild"
          tempo={this.props.tempo}
          curTime={this.props.curTime}
        />
      </div>
    );
  }
}

export default KalimbaContainer;
