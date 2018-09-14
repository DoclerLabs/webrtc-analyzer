import { h, render, rerender } from 'preact';
import Analyzer from './Analyzer';
import CSS from './analyzer.css';

let root = null;
function renderWebRTCAnalyzer(options, appendTo = 'body') {
  root = render(<Analyzer {...options} />, document.querySelector(appendTo), root);
}

var pc1 = new RTCPeerConnection();
var pc2 = new RTCPeerConnection();

pc1.addEventListener('icecandidate', c => {
  if (c.candidate) {
    pc2.addIceCandidate(c.candidate);
  }
});

pc2.addEventListener('icecandidate', c => {
  if (c.candidate) {
    pc1.addIceCandidate(c.candidate);
  }
});

navigator.mediaDevices
  .getUserMedia({
    audio: false,
    video: true
  })
  .then(mediaStream => {
    if (mediaStream && mediaStream.getTracks) {
      let tracks = mediaStream.getTracks();

      if (tracks && tracks.length > 0) {
        tracks.forEach(function(track) {
          pc1.addTrack(track);
        });
      }
    }
    pc1.createOffer().then(offer => {
      pc1.setLocalDescription(offer).then(() => {
        pc2.setRemoteDescription(offer).then(() => {
          pc2.createAnswer().then(answer => {
            pc2.setLocalDescription(answer).then(() => {
              pc1.setRemoteDescription(answer).then(() => {});
            });
          });
        });
      });
    });
  });

renderWebRTCAnalyzer({
  peerConnections: [pc1, pc2]
});

export { renderWebRTCAnalyzer, Analyzer };
