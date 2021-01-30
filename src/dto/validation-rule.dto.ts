import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";
import { isJsonOrArrayOrString } from "src/common/decorator/validator/is-json-or-array-or-string.decorator";
import { isRequired } from "src/common/decorator/validator/is-required.decorator";
import { isStringOrNumber } from "src/common/decorator/validator/is-string-or-number.decorator";
import { isValidJson } from "src/common/decorator/validator/is-valid-json.decorator";

enum Condition {
  eq = 'eq',
  neq = 'neq',
  gt = 'gt',
  gte = 'gte',
  contains = 'contains'
}

class Rule {
  @isRequired()
  @IsString({ message: 'field should be a string' })
  field: string;

  @isRequired()
  @IsEnum(Condition)
  condition;

  @isRequired()
  @isStringOrNumber()
  condition_value: string | number;
}


export class ValidationRuleDto {

  @isValidJson()
  @ValidateNested()
  @Type(() => Rule)
  rule: Rule;

  @isRequired()
  @isJsonOrArrayOrString()
  data: object | Array<any> | string;
}
