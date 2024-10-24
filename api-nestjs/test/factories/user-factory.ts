import { User } from '@application/entities/User'
import { faker } from '@faker-js/faker/.'

type Override = Partial<User>

export function makeUser(override: Override = {}) {
  return new User({
    githubUser: faker.internet.userName(),
    username: faker.internet.userName(),
    ...override
  })
}
