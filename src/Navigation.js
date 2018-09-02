import { h, Component } from 'preact';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <nav className="wa-header">
        <header>Select a PeerConnection</header>
        <select onChange={this.onChange}>
          {this.props.peerConnections.map((pc, key) => {
            return <option value={key}>PeerConnection {key + 1}</option>;
          })}
        </select>
        <div className="button-holder">
          <button onClick={this.props.onRefresh}>Refresh</button>
        </div>
      </nav>
    );
  }
}

Navigation.defaultProps = {
  peerConnections: [],
  onChange: () => {},
  onRefresh: () => {}
};

export default Navigation;
