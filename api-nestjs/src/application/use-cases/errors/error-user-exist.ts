export class ErrorUserExist extends Error {
  constructor() {
    super('Usuário já existe')
  }
}
