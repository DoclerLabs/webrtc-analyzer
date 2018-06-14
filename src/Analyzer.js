import generateStyle from "./Style";

class Analyzer {
  constructor(options) {
    let defaults = {
      selector: "body",
      peerConnection: null,
      interval: 3000,
      isVisible: true
    };
    this.options = {
      ...defaults,
      ...options
    };

    this.element = document.querySelector(options.selector);
    if (this.element === null) {
      throw new Error("[Analyzer]: Not able to render to the element.");
    }
    if (this.options.peerConnection instanceof RTCPeerConnection === false) {
      throw new Error(
        "[Analyzer]: peerConnection must be an instance of RTCPeerConnection."
      );
    }

    if (typeof this.options.interval !== "number") {
      throw new Error("[Analyzer]: interval has to be a number.");
    }

    if (this.options.isVisible !== true || this.options.isVisible !== false) {
      throw new Error(
        "[Analyzer]: isVisible has to be a boolean (true or false)."
      );
    }

    this.handleKeyDown = this.handleKeyDown.bind();
    this.wasCTRL = false;
    this.isVisible = this.options.isVisible;
    this.setup();
  }

  setup() {
    this.interval = setInterval(() => {
      this.options.pc.getStats().then(stats => {
        this.render(stats);
      });
    }, this.options.interval);
    this.setKeyHandler();
  }

  generateFromPCState(title, key) {
    return `<tr><td>${title}</td><td>${this.options.pc[key]}</td></tr>`;
  }

  generateHeader(headerTitle) {
    return `<header>${headerTitle}</header>`;
  }

  clearStage() {
    this.element.innerHTML = "";
  }

  renderToStage(table) {
    this.element.innerHTML = table;
  }

  generateFromObject(object) {
    let str = "";
    Object.keys(object).forEach(key => {
      str += `<tr><td><strong>${key}</strong></td><td>${object[key]}</td><tr>`;
    });
    return str;
  }

  generateIsVisibleClass() {
    if (this.isVisible === false) {
      return " hidden";
    }
    return "";
  }

  render(stats) {
    this.clearStage();
    let str = `<div class="webrtc-analyzer${this.generateIsVisibleClass()}">`;
    trackI = 1;
    stats.forEach(stat => {
      if (stat.type === "track") {
        str += this.generateHeader("Track " + trackI);
        str += `<table>`;
        str += this.generateFromObject(stat);
        str += `</table>`;
        trackI++;
      }
    });
    str += this.generateHeader("PeerConnection states");
    str += `<table>`;
    str += this.generateFromPCState("Signaling state", "signalingState");
    str += this.generateFromPCState("ICE gathering state", "iceGatheringState");
    str += this.generateFromPCState(
      "ICE Connection state",
      "iceConnectionState"
    );
    str += this.generateFromPCState("Connection state", "connectionState");
    str += `</table>`;
    str += this.generateStyle();
    str += "</div>";
    this.renderToStage(str);
  }

  setKeyHandler() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  toggleVisibility() {
    if (this.isVisible) {
      document.querySelector("webrtc-analyzer").classList.remove("hidden");
    } else {
      document.querySelector("webrtc-analyzer").classList.add("hidden");
    }
    this.visible = !this.visible;
  }

  handleKeyDown(event) {
    if (this.wasCTRL && event.keyCode === 72) {
      this.toggleVisibility();
    }
    if (event.keyCode === 17) {
      this.wasCTRL = true;
    } else {
      this.wasCTRL = false;
    }
  }

  destroy() {
    document.removeEventListener(this.handleKeyDown);
    clearInterval(this.interval);
  }

  generateStyle() {
    return `<style>
      .webrtc-analyzer {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        
      }

      .webrtc-analyzer table {
          display: block;
          float: left;
          border: 1px solid black;
          margin: 0;
          
      }

      .webrtc-analyzer table td:first-child {
          font-weight: bold;
          text-transform: uppercase;
      }
      .webrtc-analyzer::after {
        content: "";
        display: block;
        clear: both;
        float: none;
      }
    </style>`;
  }
}

export default Analyzer;
