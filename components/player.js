import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';

const Wrapper = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e1e5f0;
  box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, 0.05);
`;

const Artist = styled.div`
  background: red;
`;
const Line = styled.div`
  width: 100%;
  height: 5px;
  background: gray;
  position: relative;
`;
const CurrentTime = styled.div`
  background: blue;
  height: inherit;
  left: 0;
  position: absolute;
  width: ${props => props.width}%;
`;

class Player extends Component {
  static propTypes = {
    preview_url: PropTypes.string.isRequired,
  }
  state = {
    duration: 0,
    currentTime: 0,
  }
  handleTogglePlay = (event) => {
    event.preventDefault();
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
  onProgress = (event) => {
    console.log('onProgress', event);
  }
  onLoadedMetadata = (event) => {
    console.log('onLoadedMetadata', event);
    this.setState({
      duration: event.target.duration,
    });
  }
  handlePause = (event) => {
    console.log('pause', event);
  }
  onDurationChange = (event) => {
    console.log('onDurationChange', event);
  }
  onPlay = (event) => {
    console.log('onPlay', event);
  }
  onTimeUpdate = (event) => {
    console.log('onTimeUpdate', event);
    this.setState({
      currentTime: event.currentTarget.currentTime,
      progress: (event.currentTarget.currentTime * 100) / event.currentTarget.duration,
    });
  }
  leftPad(number) {
    const pad = '00';
    return pad.substr(0, pad.length - number.length) + number;
  }
  formattedTime(totalSeconds) {
    const minutes = parseInt(totalSeconds / 60, 10);
    const seconds = parseInt(totalSeconds % 60, 10);
    return `${minutes}:${this.leftPad(seconds.toString())}`;
  }
  render() {
    return (
      <Wrapper>
        <Grid>
          <Row>
            <Col xs={5}>
              <Row>
                <Col xs={3}>
                  <img
                    src={this.props.album.images[0].url}
                    alt={this.props.name}
                    width="70"
                    height="70"
                  />
                </Col>
                <Col xs={9}>
                  <p>{this.props.name}</p>
                  <p>{this.props.album.name}</p>
                </Col>
              </Row>
            </Col>
            <Col xs={7}>
              <audio
                src={this.props.preview_url}
                ref={(audio) => { this.audio = audio; }}
                onProgress={this.onProgress}
                onTimeUpdate={this.onTimeUpdate}
                onLoadedMetadata={this.onLoadedMetadata}
                onPause={this.handlePause}
                onPlay={this.onPlay}
                onDurationChange={this.onDurationChange}
              />
              <button>anterior</button>
              <button onClick={this.handleTogglePlay}>play</button>
              <button>siguiente</button>
              <div>
                {this.formattedTime(this.state.currentTime)}
              </div>
              <div>
                {this.formattedTime(this.state.duration)}
              </div>
              <Line>
                <CurrentTime width={this.state.progress} />
              </Line>
            </Col>
          </Row>
        </Grid>
      </Wrapper>
    );
  }
}

export default Player;
