const { charts } = require("./ui");

const bands = ["alpha", "beta", "gamma", "delta", "theta"];

class PowerByBand {
  constructor() {
    this.data = {
      titles: bands,
      data: Array(bands.length).fill()
    };
  }

  render(powerByBand) {
    this.data = Object.entries(powerByBand).reduce(
      (acc, [bandName, bandChannels], bandIndex) => {
        acc.titles[bandIndex] = bandName;
        acc.data[bandIndex] = Math.round(
          bandChannels.reduce((a, b) => a + b) / bandChannels.length
        );
        return acc;
      },
      {
        titles: bands,
        data: Array(bands.length).fill()
      }
    );

    charts.powerByBand.setData(this.data);
    charts.powerByBand.screen.render();
  }
}

module.exports = PowerByBand;
