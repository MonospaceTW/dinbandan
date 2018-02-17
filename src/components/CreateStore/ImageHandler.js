import React from "react";
import propTypes from "prop-types";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import ReactLoading from "react-loading";
import { white, grey500 } from "material-ui/styles/colors";

const ImageItem = styled.img`
  width: 100%;
  height: 100%;
`;

const StyleDropzone = styled(Dropzone)`
  border: 0px solid ${white};
  width: 25vw;
  height: 40vh;
`;

const ImageHandler = props => {
  let content = <ImageItem src={props.image} />;
  
  if (props.isLoading) {
    content = (
      <ReactLoading type="spin" color={grey500} height="100%" width="100%" />
    );
  }

  return (
    <StyleDropzone onDrop={files => props.uploadImage(files[0])}>
      {content}
    </StyleDropzone>
  );
};

ImageHandler.propTypes = {
  image: propTypes.string,
  isLoading: propTypes.bool.isRequired,
  isFetching: propTypes.bool.isRequired,
  uploadImage: propTypes.func.isRequired
};

ImageHandler.defaultProps = {
  image:
    "https://ostarmotorsports.com/images/Unavailable/256px-No_image_available.svg.png"
};

export default ImageHandler;
