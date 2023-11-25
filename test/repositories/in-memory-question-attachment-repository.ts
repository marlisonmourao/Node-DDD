import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachments'

export class InMemoryQuestionAttachmentRepository
  implements QuestionAttachmentRepository
{
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const QuestionAttachment = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return QuestionAttachment
  }

  async deleteManyByQuestionId(questionId: string) {
    const QuestionAttachment = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )

    this.items = QuestionAttachment
  }
}
