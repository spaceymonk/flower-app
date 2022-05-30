import { toast } from 'react-toastify';
import { displayValue } from '../services/helpers/SimulationHelper';
import { OutputEntry } from '../types';

export function toastAndSave(value: any): OutputEntry {
  const text = displayValue(value);
  toast.info(text);
  return { data: text, timestamp: new Date() };
}
