export const excludeAttribute = (entity: any, keys: string[]) => {
  return Object.fromEntries(Object.entries(entity).filter(([key]) => !keys.includes(key)))
}
