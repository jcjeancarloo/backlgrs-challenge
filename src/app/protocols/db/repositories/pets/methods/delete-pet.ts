export namespace Delete {
  export type Params = {
    id: string
  }

  export type Result = void
}

export interface Delete {
  delete: (data: Delete.Params) => Promise<Delete.Result>
}
