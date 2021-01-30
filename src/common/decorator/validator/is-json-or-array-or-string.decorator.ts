import { BadRequestException } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export function isJsonOrArrayOrString(property?: string, validationOptions?: ValidationOptions) {
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

@ValidatorConstraint({ name: 'isJsonOrArrayOrString' })
export class MatchConstraint implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments) {

      if (typeof value === 'object' || typeof value === 'string') {
        return true;
      }

    throw new BadRequestException(`${args.property} must be a json or an array or a string.`);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a json or an array or a string.`;
  }
}
