import { Either, left, right } from '@/core/either'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answer-attachemnt-list'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { UniqueEntityId } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id/unique-entity-id'
import { AnswerAttachmentRepository } from '../../repositories/answer-attachemnts-repository'
import { AnswerRepository } from '../../repositories/answer-repository'
import { NotAllowedError } from '../errors/not-allowed-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>
export class EditAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerAttachmentRepository: AnswerAttachmentRepository,
  ) {}

  async execute({
    authorId,
    content,
    answerId,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachment =
      await this.answerAttachmentRepository.findManyByAnswerId(answerId)
    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachment,
    )

    const AnswerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(AnswerAttachments)

    answer.attachments = answerAttachmentList
    answer.content = content

    await this.answerRepository.save(answer)

    return right({
      answer,
    })
  }
}
