import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerRepository } from '../../repositories/answer-repository'

interface FetchQuestionsAnswersUseCaseRequest {
  page: number
  questionId: string
}

interface FetchQuestionsAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionsAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchQuestionsAnswersUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      { page },
      questionId,
    )

    if (!answers) {
      throw new Error('Answers not found')
    }

    return {
      answers,
    }
  }
}
