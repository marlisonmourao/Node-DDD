import { AnswerRepository } from '../../repositories/answer-repository'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

// interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest) {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('You are not allowed to delete this answer')
    }

    await this.answersRepository.delete(answer)
  }
}
