import { AnswerRepository } from './../../../forum/application/repositories/answer-repository'

import { QuestionBestAnswerChoseEvent } from '@/domain/forum/enterprise/entities/events/question-best-answer-chosen-envent'
import { DomainEvents } from '@/events/domain-events'
import { EventHandler } from '@/events/event-handler'
import { SendNotificationUseCase } from './../use-cases/send-notification'

export class OnQuestionBestAnswerChose implements EventHandler {
  constructor(
    private answerRepository: AnswerRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChoseEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChoseEvent) {
    const answer = await this.answerRepository.findById(bestAnswerId.toString())

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida!`,
        content: `A resposta que você enviou em "${question.title
          .substring(0, 20)
          .concat('...')}"`,
      })
    }
  }
}
