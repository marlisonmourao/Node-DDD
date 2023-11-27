import { DomainEvent } from '@/events/domain-event'
import { Question } from '../question'
import { UniqueEntityId } from '../value-objects/unique-entity-id/unique-entity-id'

export class QuestionBestAnswerChoseEvent implements DomainEvent {
  public ocurredAt: Date
  public question: Question
  public bestAnswerId: UniqueEntityId

  constructor(question: Question, bestAnswerId: UniqueEntityId) {
    this.question = question
    this.bestAnswerId = bestAnswerId
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityId {
    return this.question.id
  }
}
