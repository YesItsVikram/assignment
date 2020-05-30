export interface CategorySchema {
    type: string | boolean | number | CategorySchema | any[];
    isRequired: boolean;
    default: CategorySchema['type'] | null | undefined;
}
