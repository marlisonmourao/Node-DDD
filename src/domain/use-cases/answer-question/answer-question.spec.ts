import { Answer } from '@/domain/entities/answer'
import { AnswerRepository } from '@/repositories/answer-repository'
import { describe, expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswerRepository: AnswerRepository = {
  async create(answer: Answer) {},
}

describe('Answer Question Use Case', () => {
  test('create a answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

    const answer = await answerQuestion.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova resposta',
    })

    expect(answer.content).toEqual('Nova resposta')
  })
})
