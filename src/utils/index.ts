export const excludeAttribute = (entity: any, keys: string[]) => {
  return Object.fromEntries(Object.entries(entity).filter(([key]) => !keys.includes(key)))
}

export const generateUniqueToken = (): string => {
  return [...Array(10)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join('')
    .toUpperCase()
}
