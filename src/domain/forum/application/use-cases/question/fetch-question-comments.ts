import { Either, right } from '@/core/either'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { QuestionsCommentRepository } from '../../repositories/question-comment-repository'

interface FetchQuestionsCommentsUseCaseRequest {
  page: number
  questionId: string
}

type FetchQuestionsCommentsUseCaseResponse = Either<
  null,
  {
    questionsComments: QuestionComment[]
  }
>

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

    return right({
      questionsComments,
    })
  }
}
