const { Notion: Mind } = require("@neurosity/notion");
const inquirer = require("inquirer");
const { argv } = require("yargs");
const { getLoginPrompts, getDevicesPrompt } = require("./lib/prompts");

async function init() {
  console.log("Login with your Neurosity account to access the brain");

  const loginForm = await inquirer.prompt(getLoginPrompts());

  const mind = new Mind({ autoSelectDevice: false });

  await mind.login(loginForm);

  const devices = await mind.getDevices();

  const selectedDevice = await inquirer.prompt(
    getDevicesPrompt(devices)
  );

  const info = await mind.selectDevice((devices) =>
    devices.find(
      (device) => device.deviceId === selectedDevice.deviceId
    )
  );

  console.clear();

  const { screen, charts } = require("./lib/ui");
  const Brainwaves = require("./lib/brainwaves");
  const Awareness = require("./lib/awareness");
  const PowerByBand = require("./lib/powerByBand");
  const { tween } = require("./lib/tween");
  const { getStatusString } = require("./lib/status");

  const kinesisEscCmd = argv["kinesis-esc-cmd"];

  screen.render();

  charts.deviceNickname.setContent(
    `${info.deviceNickname} (OS v${info.osVersion})`
  );

  const brainwaves = new Brainwaves(info);
  const awareness = new Awareness();
  const powerByBand = new PowerByBand();

  mind.brainwaves("raw").subscribe((epoch) => {
    brainwaves.render(epoch);
  });

  mind.brainwaves("powerByBand").subscribe((bands) => {
    powerByBand.render(bands.data);
  });

  mind
    .focus()
    .pipe(tween())
    .subscribe((focus) => {
      awareness.renderFocus(focus);
    });

  mind
    .calm()
    .pipe(tween())
    .subscribe((calm) => {
      awareness.renderCalm(calm);
    });

  mind.status().subscribe((status) => {
    const statusString = getStatusString(status);
    charts.status.setContent(statusString);
  });

  if (kinesisEscCmd) {
    mind.kinesis(kinesisEscCmd).subscribe(() => {
      process.exit();
    });
  }
}

module.exports = {
  init
};
