import { h, Component } from 'preact';
import { replaceStatID } from './utils';

class RTCDetails extends Component {
  constructor(props) {
    super(props);
  }

  generateHeader(headerTitle) {
    return <header>{headerTitle}</header>;
  }

  generateFromObject(object) {
    return Object.keys(object).map(key => {
      return (
        <tr>
          <td>{key}</td>
          <td>{object[key] || 'N/A'}</td>
        </tr>
      );
    });
  }

  generateFromPCState(title, key) {
    return (
      <tr>
        <td>{title}</td>
        <td>{this.props.rtcPeerConnection[key] || 'N/A'}</td>
      </tr>
    );
  }

  render() {
    return (
      <div className="wa-stat">
        <div className="box">
          <main>
            {this.props.rtcStats.map(stat => {
              return (
                <div>
                  {this.generateHeader(replaceStatID(stat.type))}
                  <table>{this.generateFromObject(stat)}</table>
                </div>
              );
            })}
            {this.generateHeader('PeerConnection states')}
            <table>
              {this.generateFromPCState('Signaling state', 'signalingState')}
              {this.generateFromPCState('ICE gathering state', 'iceGatheringState')}
              {this.generateFromPCState('ICE Connection state', 'iceConnectionState')}
              {this.generateFromPCState('Connection state', 'connectionState')}
            </table>
          </main>
        </div>
      </div>
    );
  }
}

export default RTCDetails;
