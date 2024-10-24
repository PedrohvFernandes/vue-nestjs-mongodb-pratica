import { Comment } from '@application/entities/comment'
import { Content } from '@application/entities/content'
import { Title } from '@application/entities/title'
import { faker } from '@faker-js/faker/.'

// Override é um objeto que contém as propriedades que serão sobrescritas no objeto que será criado: userId, content, title
type Override = Partial<Comment>

export function makeComment(override: Override = {}) {
  return new Comment({
    userId: faker.string.uuid(),
    content: new Content(
      faker.word.adjective({
        length: {
          min: 1,
          max: 200
        }
      })
    ),
    title: new Title(
      faker.word.adjective({
        length: {
          min: 5,
          max: 20
        }
      })
    ),
    ...override // Pega as propriedades do objeto override e sobrescreve no objeto que será criado
  })
}
