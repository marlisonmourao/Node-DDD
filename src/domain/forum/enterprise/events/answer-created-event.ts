import { DomainEvent } from '@/events/domain-event'
import { Answer } from '../entities/answer'
import { UniqueEntityId } from '../entities/value-objects/unique-entity-id/unique-entity-id'

export class AnswerCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public answer: Answer

  constructor(answer: Answer) {
    this.answer = answer
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityId {
    return this.answer.id
  }
}
