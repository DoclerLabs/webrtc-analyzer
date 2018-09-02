function replaceStatID(type) {
  if (type === 'certificate') {
    return 'Certificate';
  }

  if (type === 'codec') {
    return 'Codec';
  }

  if (type === 'candidate-pair') {
    return 'Candidate Pair';
  }

  if (type === 'remote-candidate') {
    return 'Remote candidate';
  }

  if (type === 'local-candidate') {
    return 'Local candidate';
  }

  if (type === 'inbound-rtp') {
    return 'Inbound RTP';
  }

  if (type === 'track') {
    return 'Track';
  }

  if (type === 'stream') {
    return 'Stream';
  }

  if (type === 'outbound-rtp') {
    return 'Outbound RTP';
  }

  if (type === 'peer-connection') {
    return 'Peer connection';
  }

  if (type === 'transport') {
    return 'Transport';
  }

  return 'Unknown';
}

export { generateRandom, isBoolean, replaceStatID };
