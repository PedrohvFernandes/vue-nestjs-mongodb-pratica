"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const _lib_1 = require("../src/lib");
const faker_1 = require("@faker-js/faker");
const dayjs_1 = require("dayjs");
async function seed() {
    await _lib_1.prisma.user.deleteMany();
    await _lib_1.prisma.comment.deleteMany();
    await _lib_1.prisma.user.create({
        data: {
            githubUser: faker_1.faker.internet.userName(),
            username: faker_1.faker.person.fullName(),
            createdAt: faker_1.faker.date.recent({
                days: 30,
                refDate: (0, dayjs_1.default)().subtract(8, 'days').toDate()
            }),
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBlZHJvIEhlbnJpcXVlIiwiaWF0IjoxNTE2MjM5MDIyfQ.oG7qSeIcsAFBmFgzuHBoDPQoEkZ3BJM7IRypT64gB6w'
        }
    });
    const userId = await _lib_1.prisma.user.findFirst().then((user) => user?.id);
    const commentsToInsert = await Promise.all(Array.from({ length: 41 }, async () => ({
        userId,
        content: faker_1.faker.word.adjective(18),
        title: faker_1.faker.word.adjective(5),
        createdAt: faker_1.faker.date.recent({
            days: 30,
            refDate: (0, dayjs_1.default)().subtract(8, 'days').toDate()
        })
    })));
    await _lib_1.prisma.comment.createMany({
        data: commentsToInsert
    });
}
seed()
    .then(() => {
    console.log('Database seeded!');
})
    .catch((error) => {
    console.error('Error seeding database:', error);
})
    .finally(async () => {
    await _lib_1.prisma.onModuleDestroy();
});
//# sourceMappingURL=seed.js.map