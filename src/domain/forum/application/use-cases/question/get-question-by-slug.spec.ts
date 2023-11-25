import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug/slug'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachment-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

let inMemoryQuestionAttachemntsRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionAttachemntsRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachemntsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    if (result.isRight()) {
      expect(result.value?.question).toBeTruthy()
      expect(result.value.question.title).toEqual(newQuestion.title)
    }
  })
})
