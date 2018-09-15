import '@babel/polyfill';
import { h, Component } from 'preact';
import Navigation from './Navigation';
import RTCDetails from './RTCDetails';
import { Button } from './BasicElements';
import styled from 'styled-components';

const ShowWAButton = styled(Button)`
  display: ${props => (props.isVisible ? 'none' : 'block')};
  position: fixed;
  right: 0;
  bottom: 0;
`;

const WebRTCAnalyzer = styled.div`
  position: fixed;
  width: 0px;
  height: 0px;
  top: 0px;
  left: 0px;
  z-index: 99999999;
  font-family: monaco, Consolas, 'Lucida Console', monospace;
  font-size: 12px;
`;

const WAContent = styled.main`
  position: fixed;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 4px;
  background-color: #1e1f22;
  left: ${props => {
    if (props.isVisible === false && props.position === 'right') {
      return '100%';
    }

    if (props.isVisible === false && props.position === 'left') {
      return '-30%';
    }

    if (props.isVisible === true && props.position === 'left') {
      return '0%';
    }

    return '70%';
  }};
  top: 0px;
  width: 30%;
  height: 100%;
  transition: left 0.2s ease-out, top 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out;
  @media screen and (max-width: 768px) {
    width: 90%;
    left: ${props => {
      if (props.isVisible === false && props.position === 'right') {
        return '100%';
      }

      if (props.isVisible === false && props.position === 'left') {
        return '-90%';
      }

      if (props.isVisible === true && props.position === 'left') {
        return '0%';
      }

      return '10%';
    }};
  }
`;

const RTCDetailsHolder = styled.section`
  padding-top: 155px;
  box-sizing: border-box;
  height: 100%;
`;

class Analyzer extends Component {
  constructor(props) {
    super(props);

    if ((props.isVisible === true || props.isVisible === false) === false) {
      throw new Error('[WebRTC-Analyzer]: isVisible has to be a boolean (true or false).');
    }

    if (props.position !== 'left' && props.position !== 'right') {
      throw new Error('[WebRTC-Analyzer]: not available position (supported: left, right).');
    }

    this.state = {
      isVisible: this.props.isVisible,
      position: this.props.position,
      selectedPC: 0,
      rtcStats: []
    };

    this.opt = {};
    this.opt.isCTRLDown = false;
    this.onNavigationChange = this.onNavigationChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.refreshState = this.refreshState.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.setListeners();
    this.refreshState();
  }

  setListeners() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  removeListeners() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  async refreshState() {
    if (this.props.peerConnections.length > 0) {
      let rtcStatsReport = await this.props.peerConnections[this.state.selectedPC].getStats();

      let rtcStats = [];
      rtcStatsReport.forEach(report => {
        rtcStats.push(report);
      });
      this.setState({
        rtcStats: rtcStats
      });
    } else {
      this.setState({
        rtcStats: []
      });
    }
  }

  handleKeyDown({ keyCode }) {
    if (keyCode === 17) {
      this.opt.isCTRLDown = true;
    }
  }

  handleKeyUp({ keyCode }) {
    if (keyCode === 17) {
      this.opt.isCTRLDown = false;
    } else if (this.opt.isCTRLDown && keyCode === 72) {
      this.toggleVisibility();
    } else if (this.opt.isCTRLDown && keyCode === 87) {
      this.togglePosition();
    }
  }

  toggleVisibility() {
    this.setState({
      isVisible: !this.state.isVisible
    });
  }

  togglePosition() {
    this.setState({
      position: this.state.position === 'right' ? 'left' : 'right'
    });
  }

  componentWillReceiveProps(props) {
    let selectedState = this.state.selectedPC;
    if (this.state.selectedPC > props.peerConnections.length - 1) {
      selectedState = 0;
      this.setState({
        selectedPC: selectedState
      });
    }

    this.refreshState();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  onNavigationChange(key) {
    this.setState({ selectedPC: key });
    this.refreshState();
  }

  generateDirectionClass() {
    return this.state.position === 'right' ? '' : 'p-left';
  }

  generateVisibilityClass() {
    return this.state.isVisible ? '' : 'hidden';
  }

  render() {
    if (this.props.peerConnections.length > 0) {
      return (
        <WebRTCAnalyzer>
          <ShowWAButton onClick={this.toggleVisibility} isVisible={this.state.isVisible}>
            Show WebRTC Analyzer
          </ShowWAButton>
          <WAContent isVisible={this.state.isVisible} position={this.state.position}>
            <Navigation
              peerConnections={this.props.peerConnections}
              onMinimize={this.toggleVisibility}
              onChange={this.onNavigationChange}
              onRefresh={this.refreshState}
            />
            <RTCDetailsHolder>
              <RTCDetails
                rtcStats={this.state.rtcStats}
                rtcPeerConnection={this.props.peerConnections[this.state.selectedPC]}
              />
            </RTCDetailsHolder>
          </WAContent>
        </WebRTCAnalyzer>
      );
    } else {
      return null;
    }
  }
}

Analyzer.defaultProps = {
  isVisible: true,
  position: 'right',
  peerConnections: []
};

export default Analyzer;
