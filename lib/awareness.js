const { charts } = require("./ui");

class Awareness {
  constructor() {
    this.awarenessLineData = [
      {
        title: "Calm",
        style: {
          line: "magenta"
        },
        x: Array(61)
          .fill()
          .map((_, i) => 60 - i),
        y: Array(61).fill(0)
      },
      {
        title: "Focus",
        style: {
          line: "cyan"
        },
        x: Array(61)
          .fill()
          .map((_, i) => 60 - i),
        y: Array(61).fill(0)
      }
    ];
  }

  renderCalm(value) {
    this.renderCalmLine(value);
    this.renderCalmDonut(value);
  }

  renderFocus(value) {
    this.renderFocusLine(value);
    this.renderFocusDonut(value);
  }

  renderCalmLine(value) {
    this.awarenessLineData[0].y.shift();
    this.awarenessLineData[0].y.push(Math.round(value));
    charts.awarenessHistory.setData(this.awarenessLineData);
    charts.awarenessHistory.screen.render();
  }

  renderCalmDonut(value) {
    charts.calmDonut.setData([
      {
        percent: value / 100,
        label: "Calm",
        color: this.awarenessLineData[0].style.line
      }
    ]);
    charts.calmDonut.screen.render();
  }

  renderFocusLine(value) {
    this.awarenessLineData[1].y.shift();
    this.awarenessLineData[1].y.push(Math.round(value));
    charts.awarenessHistory.setData(this.awarenessLineData);
    charts.awarenessHistory.screen.render();
  }

  renderFocusDonut(value) {
    charts.focusDonut.setData([
      {
        percent: value / 100,
        label: "Focus",
        color: this.awarenessLineData[1].style.line
      }
    ]);
    charts.focusDonut.screen.render();
  }
}

module.exports = Awareness;
