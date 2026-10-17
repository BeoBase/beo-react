export function isEmail(value: string): boolean {
    return value.includes('@');
}

export function isNotEmpty(value: string): boolean {
    return value.trim() !== '';
}

export function hasMinLength(value: string, minLength: number): boolean {
    return value.length >= minLength;
}

export function isEqualsToOtherValue(value: string, otherValue: string): boolean {
    return value === otherValue;
}
