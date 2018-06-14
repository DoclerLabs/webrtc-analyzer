require("./Style.less");

class Analyzer {
  constuctor(selector, pc, interval = 3000) {
    this.pc = pc;
    this.element = this.querySelector(selector);
    this.interval = interval;

    if (this.element === null) {
      throw new Error("[Analyzer]: Not able to render to the element.");
    }

    this.setup();
  }

  setup() {
    setInterval(() => {
      this.pc.getStats().then(stats => {
        this.render(stats);
      });
    }, this.interval);
  }

  generateFromPCState(key) {
    return `<tr><td>${key}</td><td>${this.pc[key]}</td></tr>`;
  }

  clearStage() {
    element.innerHTML = "";
  }

  renderToStage(element, table) {
    element.innerHTML = table;
  }

  generateFromObject(object) {
    let str = "";
    Object.keys(object).forEach(key => {
      str += `<tr><td><strong>${key}</strong></td><td>${object[key]}</td><tr>`;
    });
    return str;
  }

  render(stats) {
    let element = document.querySelector(selector);
    this.resetElement(element);

    let str = '<div class="webrtc-analyzer">';
    stats.forEach(stat => {
      if (stat.type === "track") {
        str += `<table>`;
        str += this.generateFromObject(stat);
        str += `</table>`;
      }
    });
    str += `<table>`;
    str += this.generateFromPCState("signalingState");
    str += this.generateFromPCState("iceGatheringState");
    str += this.generateFromPCState("iceConnectionState");
    str += this.generateFromPCState("connectionState");
    str += `</table>`;
    str += "</div>";
    this.appendElement(element, str);
  }
}

export default Analyzer;
