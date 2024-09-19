import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { quotes } from './quotes';

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
      q: quotes 
    }
  }

  @Get('random')
  @Render('randomQuote')
  getRandom(){
    return {
      q: quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)]
    }
  }

  @Get('top')
  @Render('topAuthors')
  getTop(){
    let data = new Map();
    quotes.quotes.forEach(element => {
      if(data.has(element)){
        data[element.author]++;
      }
      else{
        data.set(element.author,1)
      }
    });
    return {
      data
    }
  }
}
