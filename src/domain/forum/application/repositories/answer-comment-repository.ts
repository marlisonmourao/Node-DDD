import { PaginationsParams } from '@/core/repositories/paginations-params'
import { AnswerComment } from '../../enterprise/answer-comment'

export interface AnswerCommentRepository {
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    answerId: string,
    params: PaginationsParams,
  ): Promise<AnswerComment[]>
}
