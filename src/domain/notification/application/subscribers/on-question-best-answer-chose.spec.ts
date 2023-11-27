import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachemnts-repository'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notifications-repository'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachment-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository'
import { waitFor } from 'test/utils/wait-for'
import { SpyInstance } from 'vitest'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { OnQuestionBestAnswerChose } from './on-question-best-answer-chose'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sendNotificationUseCase: SendNotificationUseCase
let inMemoryNotificationRepository: InMemoryNotificationRepository

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On Question best answer chose', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    )

    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )

    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentRepository()

    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnQuestionBestAnswerChose(
      inMemoryAnswerRepository,
      sendNotificationUseCase,
    )
  })

  it('should send a notification when topic has new best answer chosen', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionRepository.create(question)
    inMemoryAnswerRepository.create(answer)

    question.bestAnswerId = answer.id

    inMemoryQuestionRepository.save(question)

    await waitFor(() => expect(sendNotificationExecuteSpy).toHaveBeenCalled())
  })
})
