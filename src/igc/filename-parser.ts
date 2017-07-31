const RE_SHORT = /^(?:(\w+)_)?(\d)([\da-c])([\da-v])(?:(\w)(\w{3})(\w))?.*\.igc$/i;
const RE_LONG = /^(?:(\w+)_)?(\d{4}-\d{2}-\d{2})-(\w{3})-(\w{3})-(\d{2}).*\.igc$/i;

const CHARS = '0123456789abcdefghijklmnopqrstuvxyz'.split('');

const MANUFACTURERS = [
  { name: 'Aircotec', long: 'ACT', short: 'I' },
  { name: 'Cambridge Aero Instruments', long: 'CAM', short: 'C' },
  { name: 'ClearNav Instruments', long: 'CNI', short: null },
  { name: 'Data Swan/DSX', long: 'DSX', short: 'D' },
  { name: 'EW Avionics', long: 'EWA', short: 'E' },
  { name: 'Filser', long: 'FIL', short: 'F' },
  { name: 'Flarm', long: 'FLA', short: 'G' },
  { name: 'Flytech', long: 'FLY', short: null },
  { name: 'Garrecht', long: 'GCS', short: 'A' },
  { name: 'IMI Gliding Equipment', long: 'IMI', short: 'M' },
  { name: 'Logstream', long: 'LGS', short: null },
  { name: 'LX Navigation', long: 'LXN', short: 'L' },
  { name: 'LXNAV', long: 'LXV', short: 'V' },
  { name: 'Naviter', long: 'NAV', short: null },
  { name: 'New Technologies', long: 'NTE', short: 'N' },
  { name: 'Nielsen Kellerman', long: 'NKL', short: 'K' },
  { name: 'Peschges', long: 'PES', short: 'P' },
  { name: 'PressFinish Electronics', long: 'PFE', short: null },
  { name: 'Print Technik', long: 'PRT', short: 'R' },
  { name: 'Scheffel', long: 'SCH', short: 'H' },
  { name: 'Streamline Data Instruments', long: 'SDI', short: 'S' },
  { name: 'Triadis Engineering GmbH', long: 'TRI', short: 'T' },
  { name: 'Zander', long: 'ZAN', short: 'Z' },
];

export interface IGCFilenameData {
  callsign: string | null;
  date: string;
  manufacturer: string | null;
  loggerId: string | null;
  numFlight: number | null;
}

export function parse(filename: string, maxYear = (new Date()).getUTCFullYear()): IGCFilenameData | null {
  return parseLong(filename) || parseShort(filename, maxYear) || null;
}

function parseShort(filename: string, maxYear: number): IGCFilenameData | null {
  let match = filename.match(RE_SHORT);
  if (!match) {
    return null;
  }

  let callsign = match[1] || null;

  let yearDigit = charToNumber(match[2]);
  let monthDigit = charToNumber(match[3]);
  let dayDigit = charToNumber(match[4]);

  let yearDiff = (maxYear % 10) - yearDigit;
  if (yearDiff < 0) {
    yearDiff += 10;
  }

  let year = maxYear - yearDiff;
  let month = `${monthDigit < 10 ? '0' : ''}${monthDigit}`;
  let day = `${dayDigit < 10 ? '0' : ''}${dayDigit}`;
  let date = `${year}-${month}-${day}`;

  let manufacturerId = match[5] ? match[5].toUpperCase() : null;
  let manufacturer = manufacturerId;
  if (manufacturerId) {
    let manufacturers = MANUFACTURERS.filter(it => it.short === manufacturerId);
    if (manufacturers.length !== 0) {
      manufacturer = manufacturers[0].name;
    }
  }

  let loggerId = match[6] ? match[6].toUpperCase() : null;
  let numFlight = match[7] ? charToNumber(match[7]) : null;

  return { callsign, date, manufacturer, loggerId, numFlight };
}

function parseLong(filename: string): IGCFilenameData | null {
  let match = filename.match(RE_LONG);
  if (!match) {
    return null;
  }

  let callsign = match[1] || null;
  let date = match[2];

  let manufacturerId = match[3].toUpperCase();
  let manufacturer = manufacturerId;
  if (manufacturerId) {
    let manufacturers = MANUFACTURERS.filter(it => it.long === manufacturerId);
    if (manufacturers.length !== 0) {
      manufacturer = manufacturers[0].name;
    }
  }

  let loggerId = match[4].toUpperCase();
  let numFlight = parseInt(match[5], 10);

  return { callsign, date, manufacturer, loggerId, numFlight };
}

function charToNumber(char: string): number {
  let index = CHARS.indexOf(char.toLowerCase());
  if (index === -1) {
    throw new Error(`Unknown character: ${char}`);
  }
  return index;
}