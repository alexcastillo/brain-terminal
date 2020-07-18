const { pipe, from, interval } = require("rxjs");
const { switchMap, scan, zip, map } = require("rxjs/operators");
const linspace = require("linspace");
const { mapRange } = require("./utils");

function tween({ to = [0, 100], iterations = 10 } = {}) {
  return pipe(
    map((metric) =>
      mapRange({
        value: metric.probability,
        to
      })
    ),
    scan(([, prev], next) => [prev, next], [0, 0]),
    switchMap(([prev, next]) =>
      from(linspace(prev, next, iterations)).pipe(
        zip(interval(1000 / iterations), (value) => value)
      )
    )
  );
}

module.exports = { tween };
