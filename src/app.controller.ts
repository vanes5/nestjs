import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('quotes')
  @Render('quotes')
  getQuotes(){
    return {
      text: "helloka"
    }
  }

  @Get('random')
  @Render('randomQuote')
  getRandom(){
    return {
      text: "nyami"
    }
  }

  @Get('top')
  @Render('topAuthors')
  getTop(){
    return {
      
    }
  }
}
