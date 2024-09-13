import fs from 'fs';
import path from 'path';
import { TypeCompetition } from '../types/TypeCompetition';

const filePath = path.join(__dirname, 'output.json');

export function readCompetitions(): TypeCompetition[] {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as TypeCompetition[];
  }
  return [];
}

// EXEMPLOS DE USO
// const listCompetitions = readCompetitions();
// console.log('List of Competitions:', JSON.stringify(listCompetitions, null, 2));