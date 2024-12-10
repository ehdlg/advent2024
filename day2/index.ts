/**
 * --- Day 2: Red-Nosed Reports ---

Fortunately, the first location The Historians want to search isn't a long walk from the Chief Historian's office.

While the Red-Nosed Reindeer nuclear fusion/fission plant appears to contain no sign of the Chief Historian, 
the engineers there run up to you as soon as they see you. Apparently, they still talk about the time Rudolph 
was saved through molecular synthesis from a single electron.

They're quick to add that - since you're already here - they'd really appreciate your help analyzing some 
unusual data from the Red-Nosed reactor. You turn to check if The Historians are waiting for you, but they 
seem to have already divided into groups that are currently searching every corner of the facility. 
You offer to help with the unusual data.

The unusual data (your puzzle input) consists of many reports, one report per line. 
Each report is a list of numbers called levels that are separated by spaces. For example:

7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9

This example data contains six reports each containing five levels.

The engineers are trying to figure out which reports are safe. The Red-Nosed reactor 
safety systems can only tolerate levels that are either gradually increasing or gradually decreasing. 
So, a report only counts as safe if both of the following are true:

    The levels are either all increasing or all decreasing.
    Any two adjacent levels differ by at least one and at most three.

In the example above, the reports can be found safe or unsafe by checking those rules:

    7 6 4 2 1: Safe because the levels are all decreasing by 1 or 2.
    1 2 7 8 9: Unsafe because 2 7 is an increase of 5.
    9 7 6 2 1: Unsafe because 6 2 is a decrease of 4.
    1 3 2 4 5: Unsafe because 1 3 is increasing but 3 2 is decreasing.
    8 6 4 4 1: Unsafe because 4 4 is neither an increase or a decrease.
    1 3 6 7 9: Safe because the levels are all increasing by 1, 2, or 3.

So, in this example, 2 reports are safe.

Analyze the unusual data from the engineers. How many reports are safe?
 */
import path from 'node:path';
import { getContentsFromFile } from '../utils';

async function getReports(): Promise<number[][]> {
  const FILE_PATH = path.join(__dirname, './puzzle.txt');
  const rawContent = await getContentsFromFile(FILE_PATH);

  const reports = rawContent.split('\n').map((report) => report.split(' ').map((level) => +level));

  return reports;
}

const isValidReport = (report: number[]): boolean => {
  const isIncreasing = report.every((number, i) => i === 0 || number > report[i - 1]);
  const MAX_DIFFER = 3;
  for (let i = 0; i < report.length - 1; i++) {
    const differ = report[i] - report[i + 1];

    if (
      Math.abs(differ) > MAX_DIFFER ||
      (isIncreasing && differ >= 0) ||
      (!isIncreasing && differ <= 0)
    )
      return false;
  }

  return true;
};

async function getSafeReports() {
  const reports = await getReports();

  const safeReports = reports.filter(isValidReport);

  return safeReports;
}

async function part1() {
  const numSafeReports = (await getSafeReports()).length;

  console.log(numSafeReports);
}

part1();
