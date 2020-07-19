const colors = require("./colors");
const { charts } = require("./ui");
const { mapRange } = require("./utils");

const gridSize = 2000;

class Brainwaves {
  constructor(info) {
    this.data = info.channelNames.map((channelName, channelIndex) => ({
      title: channelName,
      style: {
        line: colors[channelIndex]
      },
      x: Array(gridSize)
        .fill()
        .map((_, i) => gridSize - 1 - i),
      y: Array(gridSize).fill(0)
    }));
  }

  async render(epoch) {
    const { data } = epoch;

    const channelHeight = 20;

    for (let [channelIndex, channel] of data.entries()) {
      let channelOffset = (data.length - channelIndex) * channelHeight;
      channelOffset = channelOffset - channelHeight / 2;

      for (let sample of channel.values()) {
        this.data[channelIndex].y.shift();

        const scaledValue = mapRange({
          value: Math.round(sample),
          from: [-1000, 1000],
          to: [-channelHeight, channelHeight]
        });
        this.data[channelIndex].y.push(scaledValue + channelOffset);
      }
    }

    charts.brainwaves.setData(this.data);
    charts.brainwaves.screen.render();
  }
}

module.exports = Brainwaves;
