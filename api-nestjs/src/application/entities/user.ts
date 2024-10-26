import { randomUUID } from 'crypto'
import * as z from 'zod'

// Validar se o conteúdo é válido
const userSchema = z.object({
  // _id: z.string().trim().min(1, 'Required'),
  username: z.string().trim().min(5).max(255),
  githubUser: z.string().trim().min(5).max(255),
  accessToken: z.string().optional() // Coloco optional porque para camada de dominio eu não quero levar o token de acesso. Em prisma user mapper eu faço esse mapemento do que eu quero levar, com isso eu deixo o accessToken como opcional
})

export type userType = z.infer<typeof userSchema>

export class User {
  private readonly user: userType
  // O id é gerado pelo banco de dados, mas so passamos ele aqui para fins de teste ou quando for necessário pra receber do bd e armazenar em um objeto, o mesmo com comments
  private readonly _id: string
  // Lembrando que esses também são gerados pelo banco de dados
  private readonly createdAt: Date
  private updatedAt?: Date | null

  get valuesUser(): userType {
    return this.user
  }

  private validateUser(user: userType) {
    const validate = userSchema.safeParse(user)
    return validate
  }

  constructor(
    user: userType,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date | null
  ) {
    const isUserValid = this.validateUser(user)
    if (isUserValid.error) {
      throw new Error(isUserValid.error.message)
    }
    this._id = id ?? randomUUID() // So para ter acesso ao id, quando receber do banco de dados. E o randomUUID é só para testes, porque eu preciso do id para testar
    this.createdAt = createdAt ?? new Date()
    this.updatedAt = updatedAt ?? null
    this.user = user
  }

  public get id(): string {
    return this._id
  }

  public get createdAtUser(): Date {
    return this.createdAt
  }

  public get updatedAtUser(): Date | null {
    return this.updatedAt
  }

  public set updatedAtUser(updatedAt: Date | null) {
    this.updatedAt = updatedAt
  }

  public get accessToken(): string {
    return this.user.accessToken
  }

  public get username(): string {
    return this.user.username
  }

  public get githubUser(): string {
    return this.user.githubUser
  }

  public set username(username: string) {
    this.user.username = username
  }

  public set githubUser(githubUser: string) {
    this.user.githubUser = githubUser
  }
}
