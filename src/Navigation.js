import { h, Component } from 'preact';
import { Title, Button } from './BasicElements';
import styled from 'styled-components';

const WANavigation = styled.nav`
  background-color: #1e1f22;
  position: absolute;
  width: 100%;
  padding-bottom: 15px;
`;

const PCSelector = styled.select`
  display: block;
  height: 35px;
  border: 0;
  border-radius: 0;
  background-color: #1e1f22;
  color: rgb(129, 162, 190);
  font-family: inherit;
  font-size: 12px;
  padding: 0 10px;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: block;
  padding: 0 10px;
  box-sizing: border-box;
`;

const NavigationButton = styled(Button)`
  width: 100%;
  margin: 5px 0 0;
  display: block;
  height: 25px;
`;

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange(event.target.value);
  }

  onMinimize() {
    this.props.onMinimize();
  }

  render() {
    return (
      <WANavigation>
        <Title>Select a PeerConnection</Title>
        <PCSelector onChange={this.onChange}>
          {this.props.peerConnections.map((pc, key) => {
            return <option value={key}>PeerConnection {key + 1}</option>;
          })}
        </PCSelector>
        <ButtonGroup>
          <NavigationButton onClick={this.props.onRefresh}>Refresh</NavigationButton>
          <NavigationButton onClick={this.props.onMinimize}>Hide WebRTC Analyzer</NavigationButton>
        </ButtonGroup>
      </WANavigation>
    );
  }
}

Navigation.defaultProps = {
  peerConnections: [],
  onChange: () => {},
  onRefresh: () => {}
};

export default Navigation;
