import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { CreateValidationRuleDto } from './dto/validation-rule.dto';



interface IResponse {
  message: string,
  status: string,
  data: object | null;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  get(): IResponse {
    return this.appService.get();
  };


  @Post('/validate-rule')
  post(@Body() ruleDto: CreateValidationRuleDto,
    @Res() res: Response) {
    const result: IResponse = this.appService.validateRule(ruleDto);

    const statusCode = result.status === 'success' ? 200 : 400;
    res.status(statusCode).json(result)
  }
}
