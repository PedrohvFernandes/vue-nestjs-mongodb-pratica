import { IsObjectId } from '@src/validators/is-object-id.decorator'
import { IsNotEmpty, Length } from 'class-validator'

export class CreateCommentBody {
  @IsNotEmpty()
  @IsObjectId({ message: 'Invalid userId, it must be a valid ObjectId' }) // Usando o decorador personalizado
  userId: string

  @IsNotEmpty()
  @Length(1, 200)
  content: string

  @IsNotEmpty()
  @Length(1, 20)
  title: string
}
