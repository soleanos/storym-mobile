import { Slice } from '../model/Slice';
import { Category } from './Category';


export class Story {
    id: string;
    title: string;
    slices?: Slice[];
    cover?: string;
    abstract?: string;
    author?: string;
    published?: boolean;
    category?: string;
  }
