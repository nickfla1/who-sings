/**
 * Returns the objects with the  maximum value of a property in an array.
 */
export const maxWithProperty = <T>(arr: T[], property: keyof T): T =>
  arr.reduce((prev, curr) => (+curr[property] > +prev[property] ? curr : prev));
