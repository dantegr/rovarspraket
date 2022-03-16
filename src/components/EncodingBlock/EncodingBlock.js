import React from "react";
import "./EncodingBlock.css";

export default class EncodingBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      encodingTextAreaValue: "",
      resultEncodingTextAreaValue: "",
      jokeLoading: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      encodingTextAreaValue: event.target.value,
    });
  };

  handleEncode = () => {
    const consonant = /[bcdfghjklmnpqrstvwxz]/gi;
    this.setState(
      {
        resultEncodingTextAreaValue: this.state.encodingTextAreaValue.replace(
          consonant,
          (char) => `${char}o${char.toLowerCase()}`
        ),
      },
      () => {
        this.props.setEncodedResult(this.state.resultEncodingTextAreaValue);
      }
    );
  };

  handleJoke = () => {
    if (!this.state.jokeLoading) {
      this.setState(
        {
          jokeLoading: true,
        },
        () => {
          fetch("https://v2.jokeapi.dev/joke/Any?type=single")
            .then((response) => response.json())
            .then((data) => {
              this.setState({
                jokeLoading: false,
                encodingTextAreaValue: data.joke,
                resultEncodingTextAreaValue: "",
              });
              console.log(data);
            })
            .catch((error) => {
              this.setState({
                jokeLoading: false,
              });
              console.error("There was an error!", error);
            });
        }
      );
    }
  };

  render() {
    return (
      <div className="encodingBlockWrapper">
        <label className="encodingLabel">Encoding Block</label>
        <textarea
          className="encodingTextArea"
          value={this.state.encodingTextAreaValue}
          onChange={this.handleChange}
          rows={4}
        />
        <div className="buttonWrapper">
          <div className="actionButton" onClick={this.handleEncode}>
            Encode
          </div>
          <div className="actionButton" onClick={this.handleJoke}>
            {this.state.jokeLoading ? (
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <>Tell me a joke!</>
            )}
          </div>
        </div>
        <textarea
          className="resultTextArea"
          value={this.state.resultEncodingTextAreaValue}
          rows={4}
          readOnly
        />
      </div>
    );
  }
}
