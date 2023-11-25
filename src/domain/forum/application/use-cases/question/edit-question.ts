import { Either, left, right } from '@/core/either'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachments'
import { UniqueEntityId } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id/unique-entity-id'
import { QuestionAttachmentRepository } from '../../repositories/question-attachments-repository'
import { QuestionsRepository } from '../../repositories/question-repository'
import { NotAllowedError } from '../errors/not-allowed-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentRepository: QuestionAttachmentRepository,
  ) {}

  async execute({
    authorId,
    content,
    title,
    attachmentsIds,
    questionId,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachment =
      await this.questionAttachmentRepository.findManyByQuestionId(questionId)
    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachment,
    )

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      })
    })

    questionAttachmentList.update(questionAttachments)

    question.attachments = questionAttachmentList
    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return right({
      question,
    })
  }
}
