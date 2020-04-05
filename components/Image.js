import React, {Component} from 'react';

class Image extends Component {
  constructor(props) {
    super(props);
    this.fileName = "./static/" + props.fileName;
    this.size = props.size + "px";
  }

  render() {
    return (
      <img width={this.size} border="1" src={this.fileName}/>
    );
  }
}

export default Image;