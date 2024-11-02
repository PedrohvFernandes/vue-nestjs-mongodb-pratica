export class UpdateCommentBody {
  // @IsNotEmpty()
  // @IsObjectId({ message: 'Invalid userId, it must be a valid ObjectId' }) // Usando o decorador personalizado
  // userId: string

  // @IsNotEmpty()
  // @IsObjectId({ message: 'Invalid id, it must be a valid ObjectId' })
  // id: string

  content: string

  title: string
}
