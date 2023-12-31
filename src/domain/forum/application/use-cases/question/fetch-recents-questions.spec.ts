import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachment-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository'
import { FetchRecentsQuestionsUseCase } from './fetch-recents-questions'

let inMemoryQuestionAttachemntsRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentsQuestionsUseCase

describe('Fetch Recents Questions Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionAttachemntsRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachemntsRepository,
    )
    sut = new FetchRecentsQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recents questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date('2022, 0, 20'),
      }),
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date('2022, 0, 18'),
      }),
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date('2022, 0, 23'),
      }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date('2022, 0, 23') }),
      expect.objectContaining({ createdAt: new Date('2022, 0, 20') }),
      expect.objectContaining({ createdAt: new Date('2022, 0, 18') }),
    ])
  })

  it('should be able to fetch paginated recents questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
