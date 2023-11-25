import { QuestionAttachment } from '../../enterprise/entities/question-attachments'

export interface QuestionAttachmentRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  deleteManyByQuestionId(questionId: string): Promise<void>
}
