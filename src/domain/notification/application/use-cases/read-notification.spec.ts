import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notifications-repository'

import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { UniqueEntityId } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id/unique-entity-id'
import { makeNotification } from 'test/factories/make-notification'
import { ReadNotificationUseCase } from './read-notification'

let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: ReadNotificationUseCase

describe('REad Notification Use Case', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be able to read a question', async () => {
    const notification = makeNotification()

    inMemoryNotificationRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityId('recipient-1'),
    })

    await inMemoryNotificationRepository.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: 'recipient-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
