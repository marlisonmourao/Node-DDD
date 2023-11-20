import { UniqueEntityId } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionsAnswersUseCase } from './fetch-questions-answers'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchQuestionsAnswersUseCase

describe('Fetch Questions Answers Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswerRepository)
  })

  it('should be able to fetch questions answers', async () => {
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )

    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )

    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )

    const result = await sut.execute({
      page: 1,
      questionId: 'question-1',
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch questions answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
