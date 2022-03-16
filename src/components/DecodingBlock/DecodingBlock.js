import React from "react";
import "./DecodingBlock.css";

export default class DecodingBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      decodingTextAreaValue: "",
      resultDecodingTextAreaValue: "",
      jokeLoading: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      decodingTextAreaValue: event.target.value,
    });
  };

  handleDecode = () => {
    const consonant = /([bcdfghjklmnpqrstvwxz])o\1/gi;
    this.setState({
      resultDecodingTextAreaValue: this.state.decodingTextAreaValue.replace(
        consonant,
        (char) => char.substring(0, 1)
      ),
    });
  };

  handleCopyEncoded = () => {
    console.log(this.props);
    this.setState({
      decodingTextAreaValue: this.props.encodedResult,
    });
  };

  render() {
    return (
      <div className="decodingBlockWrapper">
        <label className="decodingLabel">Decoding Block</label>
        <textarea
          className="decodingTextArea"
          value={this.state.decodingTextAreaValue}
          onChange={this.handleChange}
          rows={4}
        />
        <div className="buttonWrapper">
          <div className="actionButton" onClick={this.handleDecode}>
            Decode
          </div>
          <div className="actionButton" onClick={this.handleCopyEncoded}>
            Copy encoded
          </div>
        </div>
        <textarea
          className="resultDecodingTextArea"
          value={this.state.resultDecodingTextAreaValue}
          rows={4}
          readOnly
        />
      </div>
    );
  }
}
