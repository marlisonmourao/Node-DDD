import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { AnswerRepository } from '../../repositories/answer-repository'
import { QuestionsRepository } from '../../repositories/question-repository'

interface ChooseQuestionBestAnwerUseCaseRequest {
  answerId: string
  authorId: string
}

type ChooseQuestionBestAnwerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAnwerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnwerUseCaseRequest): Promise<ChooseQuestionBestAnwerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }
    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return right({
      question,
    })
  }
}
