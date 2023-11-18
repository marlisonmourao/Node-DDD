import { PaginationsParams } from '@/core/repositories/paginations-params'
import { QuestionComment } from '../../enterprise/question-comment'

export interface QuestionsCommentRepository {
  create(questionComment: QuestionComment): Promise<void>
  findById(questionComment: string): Promise<QuestionComment | null>
  delete(questionComment: QuestionComment): Promise<void>
  findManyByQuestionId(
    questionId: string,
    params: PaginationsParams,
  ): Promise<QuestionComment[]>
}
