import { IsJWT, IsNotEmpty } from 'class-validator'

export class UpdateUserBody {
  @IsNotEmpty()
  @IsJWT()
  accessToken: string
}
