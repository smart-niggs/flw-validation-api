import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {

  constructor() {
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let message;

    // HttpException
    if (exception instanceof HttpException) {
       message = this.extractMessage(exception);
    }

    response.status(400).json({
      message,
      status: 'error',
      data: null
    });
  }


  // private methods
  private extractMessage(exception: HttpException): Error[] {
    let message;
    let messageType;

    try {
      const response = exception.getResponse();
      message = response['message'];
      messageType = typeof (message);

      // // *class-validator* error returns a string as HttpException
      if (Array.isArray(message)) {
        return message[0];
      }

      // typical errors thrown
      if (messageType === 'string')
        return message;
    }
    catch (e) {
      return message.toString();
    }
  }
}

class Error {
  message: string;
  type?: string;
  path?: string;
  value?: string;
}
