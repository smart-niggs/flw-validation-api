import { BadRequestException } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export function isStringOrNumber(property?: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isStringOrNumber' })
export class MatchConstraint implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments) {
    
    if (!value)
      throw new BadRequestException(`${args.property} is required.`);

      if (typeof value === 'string' || typeof value === 'number') {
        return true;
      }

    throw new BadRequestException(`${args.property} must be a either a number or string.`);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a either a number or string.`;
  }
}
