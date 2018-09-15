import { h, Component } from 'preact';
import { replaceStatID } from './utils';
import { Table, Tr, Td, Title } from './BasicElements';
import styled from 'styled-components';

const RTCDetailsStyle = styled.div`
  height: 100%;
  overflow: auto;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
`;

class RTCDetails extends Component {
  constructor(props) {
    super(props);
  }

  generateHeader(headerTitle) {
    return <Title>{headerTitle}</Title>;
  }

  generateFromObject(object) {
    return Object.keys(object).map(key => {
      return (
        <Tr>
          <Td>{key}</Td>
          <Td>{object[key] || 'N/A'}</Td>
        </Tr>
      );
    });
  }

  generateFromPCState(title, key) {
    return (
      <Tr>
        <Td>{title}</Td>
        <Td>{this.props.rtcPeerConnection[key] || 'N/A'}</Td>
      </Tr>
    );
  }

  render() {
    return (
      <RTCDetailsStyle>
        <div>
          <Main>
            {this.props.rtcStats.map(stat => {
              return (
                <div>
                  {this.generateHeader(replaceStatID(stat.type))}
                  <Table>{this.generateFromObject(stat)}</Table>
                </div>
              );
            })}
            {this.generateHeader('PeerConnection states')}
            <Table>
              {this.generateFromPCState('Signaling state', 'signalingState')}
              {this.generateFromPCState('ICE gathering state', 'iceGatheringState')}
              {this.generateFromPCState('ICE Connection state', 'iceConnectionState')}
              {this.generateFromPCState('Connection state', 'connectionState')}
            </Table>
          </Main>
        </div>
      </RTCDetailsStyle>
    );
  }
}

export default RTCDetails;
