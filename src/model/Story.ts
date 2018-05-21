import { Slice } from '../model/Slice';
import { Category } from './Category';
import { Mark } from './Mark';


export class Story {
  id: string;
  title: string;
  slices?: Slice[];
  cover?: string;
  abstract?: string;
  author?: string;
  status?: number;
  langage?: string;
  authorPicture?: string;
  authorName?: string;
  creationDate?: string;
  category?: string;
  reports? : string[];
  language?: string;
  mark? : Mark;
}