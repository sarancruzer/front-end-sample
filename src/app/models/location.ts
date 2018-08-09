import { Tag } from './tag';

export class Location extends Tag {

    get name() {
        return this.value;
    }

    set name(newName: string) {
        this.value = newName;
    }
}

