import { BadRequestException } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export function isValidJson(property?: string, validationOptions?: ValidationOptions) {
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

@ValidatorConstraint({ name: 'isValidJson' })
export class MatchConstraint implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments) {

    if (!value)
      throw new BadRequestException(`${args.property} is required.`);

    try {
      const objArray = Object.keys(value);
      if (objArray.length > 0 && objArray[0] !== '0') {
        return true;
      }
      throw new BadRequestException(`${args.property} should be an object.`);
    }
    catch {
      throw new BadRequestException(`${args.property} should be an object.`);
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should be an object.`;
  }
}
