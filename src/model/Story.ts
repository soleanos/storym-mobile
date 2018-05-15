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
    published?: boolean;
    category?: string;
    mark? : Mark;
  }
