### WebRTC-Analyzer

This tool helps you to debug WebRTC connections.

##### Current features:

- Able to display any info about the PC track
- Able to display PC statuses (`signalingState`, `iceGatheringState`, `connectionState`, `iceGatheringState`)
- Able to display any info from PC.getStats
- Support for multiple RTCPeerConnection instances
- The debuggers position could be changed by the user. (left, right)

##### Desired features:

- Able to display `offer` and `answer`
- Able to display the generated ICE Candidates
- User is able to customize what he/she wants to see


![WebRTC-Analyzer](https://i.imgur.com/8eLNbUQ.png)

### Example code

##### Instance

```js
import WebRTCAnalyzer from "webrtc-analyzer";
let wa = new WebRTCAnalyzer(options);
```

##### Options (public):

- interval - Data refresh interval
- isVisible - Is the debugger visible by default

```js
{
    interval: 3000 //Number - 3000 by default
    isVisible: true, //Boolean - true by default
    position: 'right', //String - right by default (left | right)
}
```


##### Add a PeerConnection:

```js
let pcId =  wa.addPeerConnection(rtcPeerConnection);
```

Feel free to add multiple peer connections.

##### Remove a PeerConnection:

```js
wa.removePeerConnection(pcId);
```

##### Destroy the debugger:

```js
wa.destroy();
```

After destroying the analyzer you wont be able to use it anymore. You will need to create a new instance.

##### Show & Hide

`CTRL` + `H` to toggle


##### Move position

`CTRL` + `W` to toggle

### Try it out
Download and install dependencies, build.
```js
yarn install
yarn run build
```
Open `try.html`.


### Version

1.0.1

### Contact

- Gabriel Mičko on [Twitter](https://twitter.com/gabriel_micko), [GitHub](https://github.com/gabrielmicko)
