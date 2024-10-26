import { prisma } from '@lib'
import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'

export async function seed() {
  // const userId = faker.string.uuid() --> Não funciona o UUID para o mongo caso o id esteja usando @db.ObjectId

  // Clear existing users and create a new user
  await prisma.user.deleteMany()
  await prisma.comment.deleteMany()

  await prisma.user.create({
    data: {
      githubUser: faker.internet.userName(),
      username: faker.person.fullName(),
      createdAt: faker.date.recent({
        days: 30,
        refDate: dayjs().subtract(8, 'days').toDate()
      }),
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBlZHJvIEhlbnJpcXVlIiwiaWF0IjoxNTE2MjM5MDIyfQ.oG7qSeIcsAFBmFgzuHBoDPQoEkZ3BJM7IRypT64gB6w'
    }
  })

  // Pegamos o id do primeiro usuário criado, porque ele ja vem no formato correto @db.ObjectId do mongodb
  const userId = await prisma.user.findFirst().then((user) => user?.id)

  // Prepare comments data
  const commentsToInsert: Prisma.CommentCreateManyInput[] = await Promise.all(
    Array.from({ length: 41 }, async () => ({
      userId,
      content: faker.word.adjective(18),
      title: faker.word.adjective(5),
      createdAt: faker.date.recent({
        days: 30,
        refDate: dayjs().subtract(8, 'days').toDate()
      })
    }))
  )

  // Use createMany for batch insertion
  await prisma.comment.createMany({
    data: commentsToInsert
  })
}

seed()
  .then(() => {
    console.log('Database seeded!')
  })
  .catch((error) => {
    console.error('Error seeding database:', error)
  })
  .finally(async () => {
    // await prisma.onModuleDestroy().then(() => {
    //   console.log('Database connection closed.')
    // })
    await prisma.onModuleDestroy()
  })
