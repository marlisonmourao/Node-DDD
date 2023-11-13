import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { Slug } from './value-objects/slug/slug'
import { UniqueEntityId } from './value-objects/unique-entity-id/unique-entity-id'

interface QuestionProps {
  authorId: UniqueEntityId
  besAnswerId?: UniqueEntityId
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  static create(
    props: Optional<QuestionProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return question
  }
}
