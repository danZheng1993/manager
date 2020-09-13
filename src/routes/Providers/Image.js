import React from 'react';

export default class Image extends React.Component {
  state = {
    failed: false
  }

  render() {
    const { src, ...restProps } = this.props;
    const { failed } = this.state;
    const { width, height } = restProps;
    return failed ? (
      <div style={{ ...styles.error, width, height }}>
        <div style={styles.errorMessage}>
          {restProps.alt ? restProps.alt : '无法加载图片'}
        </div>
      </div>
    ) : (
      <img src={src} onError={() => this.setState({ failed: true })} {...restProps} />
    )
  }
}

const styles = {
  error: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#9c9c9c',
    color: '#666666',
    textAlign: 'center',

  }
}