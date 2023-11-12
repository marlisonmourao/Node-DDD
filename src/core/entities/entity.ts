import { randomUUID } from "node:crypto"

export class Entity<Props> {
  private _id: string
  protected props: Props
  
  get id() {
    return this._id
  }

  constructor(porps: Props, id?: string) {
    this.props = porps
    this._id = id ?? randomUUID()
  }
}