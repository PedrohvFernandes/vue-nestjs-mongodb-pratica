export class UserNotOwner extends Error {
  constructor() {
    super('Usuário não é dono desse comentário')
  }
}
