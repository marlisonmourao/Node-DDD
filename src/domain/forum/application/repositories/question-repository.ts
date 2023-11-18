import { PaginationsParams } from '@/core/repositories/paginations-params'
import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  create(question: Question): Promise<void>
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecent(params: PaginationsParams): Promise<Question[]>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
}
