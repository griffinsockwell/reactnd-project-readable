import { generate } from 'string-to-color';

// create a unique color from a string
export default function(string) {
  return `#${generate(string)}`;
}
