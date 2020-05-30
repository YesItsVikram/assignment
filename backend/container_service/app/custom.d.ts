// Make a property optional
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
