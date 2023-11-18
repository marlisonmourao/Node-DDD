import { QuestionComment } from '@/domain/forum/enterprise/question-comment'
import { QuestionsCommentRepository } from '../../repositories/question-comment-repository'

interface FetchQuestionsCommentsUseCaseRequest {
  page: number
  questionId: string
}

interface FetchQuestionsCommentsUseCaseResponse {
  questionsComments: QuestionComment[]
}

export class FetchQuestionsCommentsUseCase {
  constructor(private answerRepository: QuestionsCommentRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionsCommentsUseCaseRequest): Promise<FetchQuestionsCommentsUseCaseResponse> {
    const questionsComments = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    if (!questionsComments) {
      throw new Error('question not found')
    }

    return {
      questionsComments,
    }
  }
}
