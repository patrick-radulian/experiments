import { MultiSelectOption } from "./MultiSelectOptions";

export type MultiSelectGroups = Array<MultiSelectGroup>
export type MultiSelectGroup = {label: string, options: Array<MultiSelectOption>}

export class MultiSelectOptionGroups {
    private groups: MultiSelectGroups = [];

    constructor(groups?: MultiSelectGroups) {
        this.groups = groups ?? [];
    }

    getOptionGroups() {
        return this.groups;
    }
}