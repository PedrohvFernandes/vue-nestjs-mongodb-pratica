import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { Types } from 'mongoose'

// Validador customizado
@ValidatorConstraint({ async: false })
export class IsObjectIdConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    // Verifica se o valor é um ObjectId válido
    return Types.ObjectId.isValid(value)
  }

  defaultMessage() {
    return 'Invalid ObjectId'
  }
}

// Decorador customizado
export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsObjectIdConstraint
    })
  }
}
