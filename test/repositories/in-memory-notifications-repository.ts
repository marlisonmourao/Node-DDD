import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationRepository implements NotificationsRepository {
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async save(notification: Notification) {
    const notificationIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )

    this.items[notificationIndex] = notification
  }

  async findById(id: string) {
    const notification = this.items.find(
      (notification) => notification.id.toString() === id,
    )

    if (!notification) {
      return null
    }

    return notification
  }
}
