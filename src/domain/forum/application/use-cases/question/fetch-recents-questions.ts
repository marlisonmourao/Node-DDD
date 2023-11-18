import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/question-repository'

interface FetchRecentsQuestionsUseCaseRequest {
  page: number
}

interface FetchRecentsQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentsQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentsQuestionsUseCaseRequest): Promise<FetchRecentsQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    if (!questions) {
      throw new Error('Question not found')
    }

    return {
      questions,
    }
  }
}
