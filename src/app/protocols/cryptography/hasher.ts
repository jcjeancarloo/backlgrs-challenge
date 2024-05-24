export namespace Hasher {
  export const name = 'Hasher'

  export interface Hash {
    hash: (value: string) => Promise<string>
  }

  export interface Compare {
    compare: (value: string, hash: string) => Promise<boolean>
  }
}

export interface Hasher extends Hasher.Hash, Hasher.Compare {}
