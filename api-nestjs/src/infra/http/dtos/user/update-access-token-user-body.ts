import { IsJWT, IsNotEmpty } from 'class-validator'

export class UpdateAccessTokenUserBody {
  @IsNotEmpty()
  @IsJWT()
  accessToken: string
}
