import { PaginationsParams } from '@/core/repositories/paginations-params'
import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { DomainEvents } from '@/events/domain-events'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentRepository: QuestionAttachmentRepository,
  ) {}

  async create(question: Question): Promise<void> {
    this.items.push(question)

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findBySlug(slug: string) {
    const question = this.items.find((question) => question.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findById(id: string) {
    const question = this.items.find(
      (question) => question.id.toString() === id,
    )

    if (!question) {
      return null
    }

    return question
  }

  async delete(question: Question) {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    )

    this.items.splice(questionIndex, 1)

    this.questionAttachmentRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }

  async save(question: Question) {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    )

    DomainEvents.dispatchEventsForAggregate(question.id)

    this.items[questionIndex] = question
  }

  async findManyRecent({ page }: PaginationsParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }
}
