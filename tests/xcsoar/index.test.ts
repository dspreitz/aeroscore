import * as fs from "fs";

import {read} from "../../src/xcsoar";

describe('XCSoar - TaskReader - read()', () => {
  it('reads "2017-07-15-lev" task correctly', () => {
    let xml = fs.readFileSync(`${__dirname}/../../fixtures/2017-07-15-lev/task.tsk`, 'utf8');
    expect(read(xml)).toMatchSnapshot();
  });

  it('reads "2017-07-17-lev" task correctly', () => {
    let xml = fs.readFileSync(`${__dirname}/../../fixtures/2017-07-17-lev.tsk`, 'utf8');
    expect(read(xml)).toMatchSnapshot();
  });
});