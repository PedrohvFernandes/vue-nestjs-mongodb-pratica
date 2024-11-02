export class ErrorContentOrTitle extends Error {
  constructor(
    message = 'Você deve informar o título ou o conteúdo do comentário'
  ) {
    super(message)
  }
}
