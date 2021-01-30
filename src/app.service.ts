import { Injectable } from '@nestjs/common';
import { stat } from 'fs';
import { ValidationRuleDto } from './dto/validation-rule.dto';


@Injectable()
export class AppService {

  get() {
    return {
      message: "My Rule-Validation API",
      status: "success",
      data: {
        "name": "Chukwuemeka Ezeokwelume",
        "github": "@Austine105",
        "email": "chukwuemeka.ezeokwelume@gmail.com",
        "mobile": "08162183350",
        "twitter": "@smartniggs"
      }
    };
  }

  validateRule(ruleDto: ValidationRuleDto) {
    // extract field value
    const fieldValue = extractFieldValue(ruleDto, ruleDto.data);
    if (!fieldValue)
      return parseResponse(`field ${ruleDto.rule.field} is missing from data.`, 'error', null);

    if (fieldValue == 'nesting error')
      return parseResponse('nesting should not be more than two levels.', 'error', null);

    // carry out validation
    const result = validate(fieldValue, ruleDto.rule.condition, ruleDto.rule.condition_value);

    if (result)
      return parseResponse(`field ${ruleDto.rule.field} successfully validated.`, 'success', ruleDto, fieldValue);

    return parseResponse(`field ${ruleDto.rule.field} failed validation.`, 'error', ruleDto, fieldValue);
  }
}

// private functions
const extractFieldValue = (ruleDto, data) => {
  try {
    // if (Array.isArray(data))
    //   return data;
    const arraySplit: [] = ruleDto.rule.field.split('.');
    if (arraySplit.length > 3)
      return 'nesting error';

    return arraySplit.reduce((i, j) => i[j], ruleDto.data);
  }
  catch {
    return false;
  }
}

const validate = (fieldValue, condition, conditionValue) => {
  let status;
  try {
    switch (condition) {
      case 'eq':
        status = fieldValue === conditionValue ? true : false;
        break;
      case 'neq':
        status = fieldValue !== conditionValue ? true : false;
        break;
      case 'gt':
        status = fieldValue > conditionValue ? true : false;
        break;
      case 'gte':
        status = fieldValue >= conditionValue ? true : false;
        break;
      case 'contains':
        status = fieldValue.includes(conditionValue) ? true : false;
        break;
      default:
        break;
    }
    return status;
  }
  catch {
    return false;
  }
}

const parseResponse = (message: string, status, ruleDto: ValidationRuleDto | null, fieldValue?: string) => {
  let data = null;
  if (ruleDto)
    data = {
      "validation": {
        "error": true,
        "field": ruleDto.rule.field,
        "field_value": fieldValue,
        "condition": ruleDto.rule.condition,
        "condition_value": ruleDto.rule.condition_value
      }
    }

  return {
    message,
    status,
    data
  }
}
