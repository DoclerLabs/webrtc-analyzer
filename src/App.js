import { h, render } from 'preact';
import Analyzer from './Analyzer';

let root = null;
function renderWebRTCAnalyzer(options, appendTo = 'body') {
  root = render(<Analyzer {...options} />, document.querySelector(appendTo), root);
}

export { renderWebRTCAnalyzer, Analyzer };
