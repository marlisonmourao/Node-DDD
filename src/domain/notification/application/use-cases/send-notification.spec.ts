import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notifications-repository'

import { SendNotificationUseCase } from './send-notification'

let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase

describe('Send Notification Use Case', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Nova notificação',
      content: 'conteúdo da notificação.',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
