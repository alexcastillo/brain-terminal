const statesLabels = {
  booting: "Starting OS...",
  shuttingOff: "Shutting off...",
  updating: "Updating OS...",
  online: "Online",
  offline: "Offline"
};

function getStatusString(status) {
  return `${statesLabels[status.state]}${
    status.sleepMode ? " (sleep mode)" : ""
  } | Battery ${status.battery}% ${
    status.charging ? "(charging)" : ""
  }`;
}

module.exports = { statesLabels, getStatusString };
