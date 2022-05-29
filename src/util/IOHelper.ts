import { toast } from 'react-toastify';
import { displayValue } from '../services/helpers/SimulationHelper';
import { OutputEntry } from '../types';

export function handleSimulationOutput(value: any, variable: string): OutputEntry {
  let text;
  if (variable.startsWith('"') || !isNaN(+variable)) {
    text = displayValue(value);
  } else {
    text = `${variable} = ${displayValue(value)}`;
  }
  toast.info(text);
  return { data: text, timestamp: new Date() };
}
