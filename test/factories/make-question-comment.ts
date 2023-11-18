import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id/unique-entity-id'
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/question-comment'

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityId,
) {
  const questionComment = QuestionComment.create(
    {
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      authorId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return questionComment
}
