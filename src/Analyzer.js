import { h, Component } from 'preact';
import Navigation from './Navigation';
import RTCDetails from './RTCDetails';

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
        <div className={`webrtc-analyzer ${this.generateDirectionClass()} ${this.generateVisibilityClass()}`}>
          <button onClick={this.toggleVisibility} className="invisible-button">
            Show WebRTC Analyzer
          </button>
          <main className="wa-holder">
            <Navigation
              peerConnections={this.props.peerConnections}
              onMinimize={this.toggleVisibility}
              onChange={this.onNavigationChange}
              onRefresh={this.refreshState}
            />
            <section className="wa-main">
              <RTCDetails
                rtcStats={this.state.rtcStats}
                rtcPeerConnection={this.props.peerConnections[this.state.selectedPC]}
              />
            </section>
          </main>
        </div>
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
