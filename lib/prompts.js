function getLoginPrompts() {
  return [
    {
      type: "input",
      name: "email",
      message: "Email:"
    },
    {
      type: "password",
      name: "password",
      message: "Password:"
    }
  ];
}

function getDevicesPrompt(devices) {
  return [
    {
      type: "list",
      name: "deviceId",
      message: "Select your brain-computer interface:",
      choices: devices
        .filter((device) => device.deviceNickname)
        .map((device) => ({
          name: device.deviceNickname,
          value: device.deviceId
        })),
      default: 0
    }
  ];
}

module.exports = {
  getLoginPrompts,
  getDevicesPrompt
};
