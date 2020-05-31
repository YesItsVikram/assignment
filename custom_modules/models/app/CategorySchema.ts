export interface CategorySchema {
  type: 'string' | 'boolean' | 'number' | 'array';
  isRequired: boolean;
  default?: any;
}
