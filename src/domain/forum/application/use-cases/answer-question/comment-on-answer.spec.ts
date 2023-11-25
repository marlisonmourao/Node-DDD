import { makeAnswer } from 'test/factories/make-answer'

import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachemnts-repository'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'

let inMemoryAnswerAttachemntsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let inMemoryAnswersRepository: InMemoryAnswerRepository
let sut: CommentOnAnswerUseCase

describe('Comment On Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    inMemoryAnswerAttachemntsRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswersRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachemntsRepository,
    )
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual(
      'Comentário teste',
    )
  })
})
