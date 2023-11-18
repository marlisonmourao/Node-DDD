import { Question } from '@/domain/forum/enterprise/entities/question'
import { AnswerRepository } from '../../repositories/answer-repository'
import { QuestionsRepository } from '../../repositories/question-repository'

interface ChooseQuestionBestAnwerUseCaseRequest {
  answerId: string
  authorId: string
}

interface ChooseQuestionBestAnwerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnwerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnwerUseCaseRequest): Promise<ChooseQuestionBestAnwerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }
    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowerd')
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return {
      question,
    }
  }
}
