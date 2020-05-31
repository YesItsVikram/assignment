export interface CategorySchema {
    [key: string]: {
        type: 'string' | 'boolean' | 'number' | 'array';
        isRequired: boolean;
        default?: any;
    };
}
