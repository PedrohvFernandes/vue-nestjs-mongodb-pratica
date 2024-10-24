export class UserNotOwner extends Error {
  constructor() {
    super('User not owner')
  }
}
