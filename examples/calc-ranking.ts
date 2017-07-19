import * as fs from "fs";

import {readTask} from "../src/read-task";
import {readFlight} from "../src/read-flight";
import {analyzeFlight} from "../src/analyze-flight";

if (process.argv.length < 4) {
  console.log('Usage: ts-node examples/analyze-flight.ts TASK_PATH IGC_FOLDER');
  process.exit(1);
}

let taskPath = process.argv[2];
let task = readTask(taskPath);

if (task.options.isAAT) {
  console.log('AAT tasks are not supported yet');
  process.exit(1);
}

let handicaps = readCSV(`${__dirname}/../fixtures/2017-lev.csv`);

let flightsPath = process.argv[3];
let flights = fs.readdirSync(flightsPath)
  .filter(filename => (/\.igc$/i).test(filename))
  .map(filename => {
    let callsign = filename.match(/^(.{1,3})_/)![1];
    let handicap = handicaps[callsign.toUpperCase()];
    let handicapFactor = 100 / handicap;

    let flight = readFlight(`${flightsPath}/${filename}`);
    let result = analyzeFlight(flight, task);

    let { distance, speed } = result;
    if (distance !== undefined) distance *= handicapFactor;
    if (speed !== undefined) speed *= handicapFactor;

    return { result, callsign, distance, speed, handicap };
  })
  .sort(compareResults);

flights.forEach(flight => {
  let distance = flight.result.distance !== undefined ? `${(flight.result.distance / 1000).toFixed(1)} km` : '';
  let speed = flight.result.speed !== undefined ? `${(flight.result.speed).toFixed(2)} km/h` : '';

  console.log(`${flight.callsign}\t${flight.handicap}\t${distance}\t${speed}`);
});

function compareResults(a: any, b: any) {
  if (a.speed !== undefined && b.speed !== undefined)
    return b.speed - a.speed;

  if (a.speed !== undefined && b.speed === undefined)
    return -1;

  if (a.speed === undefined && b.speed !== undefined)
    return 1;

  return b.distance - a.distance;
}

function readCSV(path: string) {
  let lines = fs.readFileSync(path, 'utf8').split('\n');
  lines.shift();

  let handicaps = Object.create(null);
  lines.map(line => line.trim().split(',')).forEach(([id, _, cn, type, handicap]) => {
    if (id) {
      handicaps[cn] = parseInt(handicap);
    }
  });
  return handicaps;
}
