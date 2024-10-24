import { IsObjectId } from '@src/validators/is-object-id.decorator'
import { IsNotEmpty } from 'class-validator'

export class GetUserBody {
  @IsNotEmpty()
  @IsObjectId()
  userId: string
}
