import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Koji from '@withkoji/core';

const Container = styled.button`
  position: absolute;
  height: 100%;
  padding: 0 16px;
  bottom: 0;
  left: 0;

  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -0.24px;
  color: white;
`;

class UploadButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.uploadRef = React.createRef();
  }

  render() {
    const { onUpload } = this.props;

    return (
      <Container
        onClick={() => {
          this.uploadRef.current.click();
        }}
      >
        Upload
        <input
          ref={this.uploadRef}
          style={{
            visibility: 'hidden',
            width: 0,
            height: 0,
            position: 'absolute',
          }}
          type="file"
          name="UploadInput"
          accept="video/*"
          onChange={(e) => onUpload(e.target.files[0])}
          onClick={(e) => e.stopPropagation()}
        />
      </Container>
    );
  }
}

UploadButton.propTypes = {
  onUpload: PropTypes.func,
};

export default UploadButton;
