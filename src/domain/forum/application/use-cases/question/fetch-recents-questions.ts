import { Either, right } from '@/core/either'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/question-repository'

interface FetchRecentsQuestionsUseCaseRequest {
  page: number
}

type FetchRecentsQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>
export class FetchRecentsQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentsQuestionsUseCaseRequest): Promise<FetchRecentsQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({
      questions,
    })
  }
}
