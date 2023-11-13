import { UniqueEntityId } from '@/domain/entities/value-objects/unique-entity-id/unique-entity-id'

export class Entity<Props> {
  private _id: UniqueEntityId
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(porps: Props, id?: UniqueEntityId) {
    this.props = porps
    this._id = id ?? new UniqueEntityId()
  }
}
