function mapRange({ value, from = [0, 1], to = [0, 1] } = {}) {
  const [fromMin, fromMax] = from;
  const target = clamp(value, fromMin, fromMax);
  const [toMin, toMax] = to;
  return (
    ((target - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin
  );
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

module.exports = { mapRange, clamp };
