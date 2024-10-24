import { IsNotEmpty, Length } from 'class-validator'

export class CreateUserBody {
  @IsNotEmpty()
  @Length(5, 255)
  username: string

  @IsNotEmpty()
  @Length(5, 255)
  githubUser: string
}
