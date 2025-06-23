import { type ResourceInterface } from "./data";

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'resources.txt');

const SEPARATOR = '`'

const Mapper: {[key in keyof ResourceInterface]: number} = {
  id: 0,
  title: 1,
  type: 2,
  link: 3,
  description: 4,
  createdAt: 5
}

function mapToArray(resource: ResourceInterface): string[] {
  return [
    resource.id,
    resource.title,
    resource.type,
    resource.link,
    resource.description || '',
    resource.createdAt
  ];
}

function mapToObject(array: string[]): ResourceInterface {
  return {
    id: array[Mapper.id],
    title: array[Mapper.title],
    type: array[Mapper.type] as ResourceInterface['type'],
    link: array[Mapper.link],
    description: array[Mapper.description as any] || undefined,
    createdAt: array[Mapper.createdAt]
  };
}

function readFromFile(): ResourceInterface[] {
  if (!fs.existsSync(filePath)) {
    return [];
  } 

  const data: string = fs.readFileSync(filePath, 'utf-8');
  const lines = data.split('\n').filter(line => line.trim() !== '');
  return lines.map(line => {
    const values = line.split(SEPARATOR).map(value => value.trim());
    return mapToObject(values);
  }
  );
}

function writeToFile(resources: ResourceInterface[]): void {
  const data = resources.map(mapToArray).map(line => line.join(SEPARATOR)).join('\n');
  fs.writeFileSync(filePath, data, 'utf-8');
}


export {
  readFromFile,
  writeToFile,
}
