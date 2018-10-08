import image from "assets/lazy_image.jpg";
import * as React from 'react';

export class Lazy extends React.Component {
  render() {

    return (
      <div>
        <img style={{height: "1000px", display: "block", margin: "auto"}} src={image}></img>
      </div>
    );
  }
}
