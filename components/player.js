import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import PlayerArtist from './player-artist';

const Wrapper = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e1e5f0;
  box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, 0.05);
`;


const Line = styled.div`
  width: 100%;
  height: 5px;
  background: #e1e5f0;
  position: relative;
  margin-top: 1em;
`;
const CurrentTime = styled.div`
  background: #5179ff;
  height: inherit;
  left: 0;
  position: absolute;
  width: ${props => props.width}%;
`;

const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  font-size: 20px;
  color: ${props => props.theme.color.grayB};
  outline: 0;
`;
const Play = styled(Button)`
  font-size: 50px;
`;

const Timer = styled.span`
  color: ${props => props.theme.color.grayB};
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  /*padding: 1em 0;*/
`;
const PlayerUI = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 0;
`;

class Player extends Component {
  static propTypes = {
    preview_url: PropTypes.string.isRequired,
  }
  state = {
    duration: 0,
    currentTime: 0,
    paused: true,
  }
  handleTogglePlay = (event) => {
    event.preventDefault();
    if (this.audio.paused) {
      this.setState({
        paused: false,
      });
      this.audio.play();
    } else {
      this.setState({
        paused: true,
      });
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
  handleExpandClick = (event) => {

  }
  render() {
    return (
      <Wrapper>
        <Grid>
          <button onClick={this.handleExpandClick}>expandir</button>
          <Row bottom="xs">
            <Col xs={5}>
              <PlayerArtist {...this.props} />
            </Col>
            <Col xs={7}>
              <PlayerUI>
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
                <Buttons>
                  <Timer>
                    {this.formattedTime(this.state.currentTime)}
                  </Timer>
                  <div>
                    <Button className="icon-previous" />
                    <Play
                      className={this.state.paused ? 'icon-play' : 'icon-pause'}
                      onClick={this.handleTogglePlay}
                    />
                    <Button className="icon-next" />
                  </div>
                  <Timer>
                    {this.formattedTime(this.state.duration)}
                  </Timer>
                </Buttons>
                <Line>
                  <CurrentTime width={this.state.progress} />
                </Line>
              </PlayerUI>
            </Col>
          </Row>
        </Grid>
      </Wrapper>
    );
  }
}

export default Player;
