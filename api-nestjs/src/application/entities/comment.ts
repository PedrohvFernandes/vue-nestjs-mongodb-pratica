import { Replace } from '@helpers/Replace'
import { Content } from './content'
import { Title } from './title'
import { randomUUID } from 'crypto'

// Não precisar ser um zod, porque o title e o content já estão validados. O userId já vai chegar  e createdAt ja vai chegar do bd, se não cria aqui mesmo quando essa classe é testada
export type CommentProps = {
  userId: string
  content: Content
  title: Title
  createdAt: Date
  updatedAt?: Date | null
}

export class Comment {
  // O id é gerado pelo banco de dados, então não precisamos passar ele no construtor, por isso ele é opcional, porque so iremos passar o id quando formos atualizar um comentário
  private readonly _id: string
  private readonly comment: CommentProps

  // Esse replace é para garantir que o createdAt seja sempre uma data válida
  constructor(
    comment: Replace<CommentProps, { createdAt?: Date }>,
    id?: string
  ) {
    this._id = id ?? randomUUID() // Se o id for passado, ele usa o id, senão ele cria um novo id, isso é para quando formos atualizar um comentário, passamos o id dele. E o randomUUID é para criar um id aleatório quando for criar um novo comentário para testar, eu não precisar passar um id por la. Ex: na pasta test, no factory do comment.
    this.comment = {
      ...comment,
      // Se o createdAt não for passado, ele cria uma nova data
      createdAt: comment.createdAt ?? new Date() // Aqui o mesma situação que o id, no factory do comment, na pasta test. De eu não precisar passar um createdAt por lá e nem pelo test do comment, ele cria uma nova data.
    }
  }

  public get valuesComment(): CommentProps {
    return this.comment
  }

  public get content(): Content {
    return this.comment.content
  }

  public set content(content: Content) {
    // Poder fazer validações dentro dos setters, mas iremos usar uma class que faz a validação do conteudo, para que dessa forma não bagunce essa classe de comments com validações
    // if (content.length < 5) {
    //   throw new Error('Content is too short');
    // }

    this.comment.content = content
  }

  public get contentValue(): string {
    return this.comment.content.value
  }

  public get title(): Title {
    return this.comment.title
  }

  public set title(title: Title) {
    this.comment.title = title
  }

  public get titileValue(): string {
    return this.comment.title.value
  }

  public get propsComment(): CommentProps {
    return this.comment
  }

  public get userId(): string {
    return this.comment.userId
  }

  public get createdAt(): Date {
    return this.comment.createdAt
  }

  public get updatedAt(): Date {
    return this.comment.updatedAt
  }

  public set updatedAt(updatedAt: Date | null) {
    this.comment.updatedAt = updatedAt
  }

  public get id(): string {
    return this._id
  }
}
