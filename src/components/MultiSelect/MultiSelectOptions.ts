export type MultiSelectOption = {label: string, value: string}

export class MultiSelectOptions {
    private options: Array<MultiSelectOption> = [];

    constructor(options?: Array<MultiSelectOption>) {
        this.options = options ?? [];
    }

    getOptions() {
        return this.options;
    }
}