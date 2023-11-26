import { UniqueEntityId } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id/unique-entity-id'

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

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true
    }

    if (entity._id === this.id) {
      return true
    }

    return false
  }
}
