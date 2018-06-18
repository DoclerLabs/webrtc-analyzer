### WebRTC-Analyzer

This tool helps you to debug WebRTC connections.

##### Current features:

- Can display any info about the PC track
- Can display PC statuses (`signalingState`, `iceGatheringState`, `connectionState`, `iceGatheringState`)

##### Desired features:

- Can display any info from PC.getStats
- Can display `offer` and `answer`
- Can display the generated ICE Candidates
- User is able to customize what he/she wants to see
- The debuggers position could be changed by the user. (left, top, right, bottom)
- React based
- Support for multiple RTCPeerConnection instances

![WebRTC-Analyzer](https://i.imgur.com/8eLNbUQ.png)

### Example code

##### Instance

```js
import WebRTCAnalyzer from "webrtc-analyzer";
let wa = new WebRTCAnalyzer(options);
```

##### Options (public):

- selector - selector for the element where the debugger gets appended to
- peerConnection - RTCPeerConnection instance
- interval - Data refresh interval
- isVisible - Is the debugger visible by default

```js
{
    selector: '.stats', // String - body by default
    peerConnection: peerConnectionInstance, // Object - required
    interval: 3000 //Number - 3000 by default
    isVisible: true, //Boolean - true by default
}
```

##### Show & Hide

`CTRL` + `H` to toggle

### Version

0.0.3

### Contact

- Gabriel Mičko on [Twitter](https://twitter.com/gabriel_micko), [GitHub](https://github.com/gabrielmicko)
