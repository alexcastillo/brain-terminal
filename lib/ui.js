const blessed = require("blessed");
const contrib = require("blessed-contrib");

const screen = blessed.screen();

const grid = new contrib.grid({
  rows: 12,
  cols: 12,
  screen: screen
});

// [y, x, height, width]
const layouts = {
  footer: {
    status: [0, 0, 1, 4],
    deviceNickname: [0, 4, 1, 4],
    battery: [0, 8, 1, 4],
    brainwaves: [1, 0, 8, 12],
    powerByBand: [9, 0, 3, 4],
    awarenessHistory: [9, 4, 3, 4],
    focusDonut: [9, 8, 3, 2],
    calmDonut: [9, 10, 3, 2]
  },
  sidebar: {
    status: [0, 0, 1, 4],
    deviceNickname: [0, 4, 1, 4],
    battery: [0, 8, 1, 4],
    focusDonut: [1, 0, 3, 2],
    calmDonut: [1, 2, 3, 2],
    awarenessHistory: [4, 0, 4, 4],
    powerByBand: [8, 0, 4, 4],
    brainwaves: [1, 4, 11, 8]
  }
};

const getLayout = (widgetName, selectedLayout = "sidebar") =>
  layouts[selectedLayout][widgetName];

const charts = {
  status: grid.set(...getLayout("status"), blessed.box, {
    top: "top",
    left: "left",
    content: "",
    bg: "black",
    tags: true,
    style: {
      fg: "white",
      border: {
        fg: "black"
      }
    }
  }),
  deviceNickname: grid.set(
    ...getLayout("deviceNickname"),
    blessed.box,
    {
      top: "center",
      // left: "center",
      // width: "50%",
      // height: "50%",
      // align: "center",
      content: "",
      tags: true,
      style: {
        fg: "white",
        border: {
          fg: "black"
        }
      }
    }
  ),
  battery: grid.set(...getLayout("battery"), blessed.box, {
    top: "center",
    align: "right",
    content: "https://neurosity.co",
    tags: true,
    style: {
      fg: "white",
      border: {
        fg: "black"
      }
    }
  }),
  brainwaves: grid.set(...getLayout("brainwaves"), contrib.line, {
    minY: 0,
    maxY: 180,
    numYLabels: 1,
    label: "Brainwaves",
    showLegend: true,
    style: {
      text: "black",
      baseline: "black"
    },
    legend: {
      width: 8
    },
    xLabelPadding: 0,
    yLabelPadding: 0,
    wholeNumbersOnly: false
  }),
  powerByBand: grid.set(...getLayout("powerByBand"), contrib.bar, {
    label: "Frequency Bands",
    barWidth: 3,
    barSpacing: 10,
    xOffset: 3,
    maxHeight: 9,
    barBgColor: "cyan",
    barFgColor: "white"
  }),
  awarenessHistory: grid.set(
    ...getLayout("awarenessHistory"),
    contrib.line,
    {
      numYLabels: 1,
      minY: 0,
      maxY: 100,
      label: "Awareness",
      height: "100%",
      showLegend: true,
      xLabelPadding: 0,
      yLabelPadding: 0,
      legend: {
        width: 10
      },
      style: {
        text: "black",
        baseline: "black"
      }
    }
  ),
  focusDonut: grid.set(...getLayout("focusDonut"), contrib.donut, {
    radius: 8,
    arcWidth: 3,
    yPadding: 2,
    remainColor: "white",
    label: "Focus",
    xPadding: 0,
    yPadding: 0
  }),
  calmDonut: grid.set(...getLayout("calmDonut"), contrib.donut, {
    radius: 8,
    arcWidth: 3,
    yPadding: 2,
    remainColor: "white",
    label: "Calm",
    xPadding: 0,
    yPadding: 0
  })
};

screen.on("resize", () => {
  Object.values(charts).forEach((chart) => {
    chart.emit("attach");
  });
});

screen.key(["escape", "q", "C-c"], () => {
  return process.exit(0);
});

module.exports = {
  screen,
  grid,
  charts
};
