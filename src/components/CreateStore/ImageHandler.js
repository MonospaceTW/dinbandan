import React from "react";
import propTypes from "prop-types";
import Dropzone from "react-dropzone";
import Image from "react-image";
import styled from "styled-components";

const ImageItem = styled(Image)`
  width: 100%;
  height: 100%;
`;

const ImageHandler = props => {
  return (
    <Dropzone onDrop={files => props.uploadImage(files[0])}>
      <ImageItem
        src={props.image}
      />
    </Dropzone>
  );
};

ImageHandler.propTypes = {
  image: propTypes.string,
  isLoading: propTypes.bool.isRequired,
  isFetching: propTypes.bool.isRequired,
  uploadImage: propTypes.func.isRequired
};

ImageHandler.defaultProps = {
  image: "https://ostarmotorsports.com/images/Unavailable/256px-No_image_available.svg.png"
};

export default ImageHandler;
