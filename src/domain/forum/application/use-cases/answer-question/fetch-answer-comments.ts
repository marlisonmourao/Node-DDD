import { AnswerComment } from '@/domain/forum/enterprise/answer-comment'
import { AnswerCommentRepository } from '../../repositories/answer-comment-repository'

interface FetchAnswersCommentsUseCaseRequest {
  page: number
  answerId: string
}

interface FetchAnswersCommentsUseCaseResponse {
  answersComments: AnswerComment[]
}

export class FetchAnswersCommentsUseCase {
  constructor(private answerRepository: AnswerCommentRepository) {}

  async execute({
    page,
    answerId,
  }: FetchAnswersCommentsUseCaseRequest): Promise<FetchAnswersCommentsUseCaseResponse> {
    const answersComments = await this.answerRepository.findManyByAnswerId(
      answerId,
      { page },
    )

    if (!answersComments) {
      throw new Error('answer not found')
    }

    return {
      answersComments,
    }
  }
}
