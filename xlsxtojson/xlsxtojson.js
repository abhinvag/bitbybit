const xlsx = require('xlsx');
const fs = require('fs');
const rp = require('request-promise');
const cheerio = require('cheerio');

const wb = xlsx.readFile('./FINAL450.xlsx');

const ws = wb.Sheets["Sheet2"];

const data = xlsx.utils.sheet_to_json(ws);

console.log(data);


