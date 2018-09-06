import { h, render, rerender } from 'preact';
import Analyzer from './Analyzer';
import CSS from './analyzer.css';

let root = null;
function renderWebRTCAnalyzer(options, appendTo = 'body') {
  root = render(<Analyzer {...options} />, document.querySelector(appendTo), root);
}

export { renderWebRTCAnalyzer, Analyzer };
