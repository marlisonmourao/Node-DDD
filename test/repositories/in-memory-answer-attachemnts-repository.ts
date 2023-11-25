import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachemnts-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentRepository
  implements AnswerAttachmentRepository
{
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    const AnswerAttachment = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return AnswerAttachment
  }

  async deleteManyByAnswerId(answerId: string) {
    const AnswerAttachment = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )

    this.items = AnswerAttachment
  }
}
