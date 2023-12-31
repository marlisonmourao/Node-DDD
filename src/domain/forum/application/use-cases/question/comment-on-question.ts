import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { UniqueEntityId } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id/unique-entity-id'
import { QuestionsCommentRepository } from '../../repositories/question-comment-repository'
import { QuestionsRepository } from '../../repositories/question-repository'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentRepository: QuestionsCommentRepository,
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentRepository.create(questionComment)

    return right({
      questionComment,
    })
  }
}
