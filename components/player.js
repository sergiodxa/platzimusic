import React, { Component, PropTypes } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { formattedTime } from '../utils/index';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import PlayerAlbum from './player-album';
import AlbumTrack from './album-track.js';

const bounceIn = keyframes`
  from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(.97, .97, .97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

const Wrapper = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e1e5f0;
  box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, 0.05);
  overflow: auto;
  &.is-expanded {
    /*top: 0;*/
    /*height: 100%;*/
  }
`;

const PlayerGrid = styled(Grid)`
  position: relative;
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

const Expand = styled.button`
  position: absolute;
  right: 0;
  top: 5px;
  border: none;
  background: none;
  outline: 0;
  cursor: pointer;
  color: ${props => props.theme.color.grayB};
  animation: ${bounceIn} 1s;
`;

class Player extends Component {
  static propTypes = {
    // preview_url: PropTypes.string.isRequired,
    currentTrack: PropTypes.number.isRequired,
    playlist: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  static defaultProps = {
    playlist: [],
  }
  state = {
    duration: 0,
    currentTime: 0,
    paused: true,
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
    // this.handleTogglePlay();
    this.setState({
      paused: false,
    });
  }
  onEnded = () => {
    this.handleNextTrack();
  }
  onTimeUpdate = (event) => {
    // console.log('onTimeUpdate', event);
    this.setState({
      currentTime: event.currentTarget.currentTime,
      progress: (event.currentTarget.currentTime * 100) / event.currentTarget.duration,
    });
  }
  // componentWillReceiveProps() {
  //   this.setState({
  //     paused: true,
  //   });
  // }
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
  handleExpandClick = (event) => {
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  // leftPad(number) {
  //   const pad = '00';
  //   return pad.substr(0, pad.length - number.length) + number;
  // }
  // formattedTime(totalSeconds) {
  //   const minutes = parseInt(totalSeconds / 60, 10);
  //   const seconds = parseInt(totalSeconds % 60, 10);
  //   return `${minutes}:${this.leftPad(seconds.toString())}`;
  // }
  handlePrevTrack = () => {
    const prevTrack = this.props.currentTrack - 1;
    this.props.dispatch({
      type: 'SET_CURRENT_TRACK',
      payload: {
        index: (this.props.playlist[prevTrack]) ? prevTrack : this.props.playlist.length - 1,
      },
    });
  }
  handleNextTrack = () => {
    const nextTrack = this.props.currentTrack + 1;
    this.props.dispatch({
      type: 'SET_CURRENT_TRACK',
      payload: {
        index: (this.props.playlist[nextTrack]) ? nextTrack : 0,
      },
    });
  }
  render() {
    if (this.props.playlist.length < 1) {
      return null;
    }
    const expandIcon = this.state.expanded ? 'icon-arrow-bottom' : 'icon-arrow-top';
    return (
      <Wrapper className={(this.state.expanded) ? 'is-expanded' : ''}>
        <PlayerGrid>
          {this.props.playlist.length > 1 &&
            <Expand
              onClick={this.handleExpandClick}
              className={expandIcon}
            />
          }
          <Row bottom="xs">
            <Col xs={5}>
              <PlayerAlbum {...this.props.playlist[this.props.currentTrack]} />
            </Col>
            <Col xs={7}>
              <PlayerUI>
                <audio
                  src={this.props.playlist[this.props.currentTrack].preview_url}
                  ref={(audio) => { this.audio = audio; }}
                  onProgress={this.onProgress}
                  onTimeUpdate={this.onTimeUpdate}
                  onLoadedMetadata={this.onLoadedMetadata}
                  onPause={this.handlePause}
                  onPlay={this.onPlay}
                  onEnded={this.onEnded}
                  onDurationChange={this.onDurationChange}
                  autoPlay
                />
                <Buttons>
                  <Timer>
                    {formattedTime(this.state.currentTime * 1000)}
                  </Timer>
                  <div>
                    <Button
                      className="icon-previous"
                      onClick={this.handlePrevTrack}
                    />
                    <Play
                      className={this.state.paused ? 'icon-play' : 'icon-pause'}
                      onClick={this.handleTogglePlay}
                    />
                    <Button
                      className="icon-next"
                      onClick={this.handleNextTrack}
                    />
                  </div>
                  <Timer>
                    {formattedTime(this.state.duration * 1000)}
                  </Timer>
                </Buttons>
                <Line>
                  <CurrentTime width={this.state.progress} />
                </Line>
              </PlayerUI>
            </Col>
          </Row>
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {(this.props.playlist.length > 1 && this.state.expanded) &&
              <Row key="album-tracks">
                {this.props.playlist.map((item, index) => (
                  <Col xs={12} mdOffset={5} md={7} key={item.id}>
                    <AlbumTrack
                      {...item}
                      number={index + 1}
                      active={this.props.currentTrack === index}
                    />
                  </Col>
                ))}
              </Row>
            }
          </CSSTransitionGroup>
        </PlayerGrid>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    // playlist: state.playlist,
    playlist: state.get('playlist').toJS(),
    // currentTrack: state.currentTrack,
    currentTrack: state.get('currentTrack'),
  };
}

export default connect(mapStateToProps)(Player);
