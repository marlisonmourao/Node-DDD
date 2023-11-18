import { UniqueEntityId } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { FetchAnswersCommentsUseCase } from './fetch-answer-comments'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: FetchAnswersCommentsUseCase

describe('Fetch Answer Comment Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new FetchAnswersCommentsUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to fetch answers comment', async () => {
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )

    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )

    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )

    const { answersComments } = await sut.execute({
      page: 1,
      answerId: 'answer-1',
    })

    expect(answersComments).toHaveLength(3)
  })

  it('should be able to fetch answers comment', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
      )
    }

    const { answersComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(answersComments).toHaveLength(2)
  })
})
