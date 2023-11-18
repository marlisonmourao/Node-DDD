import { QuestionsCommentRepository } from '../../repositories/question-comment-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionsCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest) {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question Comment not found')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.questionCommentRepository.delete(questionComment)
  }
}
