import { Controller, Get, Param, Query, Render } from '@nestjs/common';
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
      if(data.has(element.author)){
        data.set(element.author, data.get(element.author)+1);
      }
      else{
        data.set(element.author,1)
      }
    });
    let SortedData = new Map([...data.entries()].sort((a, b) => b[1] - a[1]));
    return {
      SortedData
    }
  }

  @Get('quotes/:id')
  @Render('quoteId')
  oneQuote(@Param('id') id: string) {
    if(quotes.quotes.some(item => item['id'] === parseInt(id))){
      return{
        text: `${quotes.quotes[parseInt(id)].author}: ${quotes.quotes[parseInt(id)].quote}`
      }
    }
    else {
      return{
        text: `Nincs ilyen id-val rendelkező idézet.:)`
      }
    }
  }

  @Get('search')
  @Render('search')
  getQuoteByText(@Query('text') text: string){
      quotes.quotes.forEach(element=>{
        if(element.quote == text){

        }
      })

  }

  @Get('authorRandomForm')
  @Render('randomAuthor')
  getRandomAuthor(){
    return {
      message: this.appService.getHello()
    };
  }

  @Get('authorRandom')
  @Render('randomAuthorKiiras')
  getRand(@Query('Author') Author: string){
    let qs = [];

    quotes.quotes.forEach(element=>{
      if(element.author == Author){
        qs.push(element.quote);
      }
    })

    if(qs.length>0){
      let random = Math.floor(Math.random() * qs.length)
      let qu = '';
      return{
        qu: qs[random]
      }
    }
    else{
      return{
        qu: 'Nincs ilyen szerző'
      }
    }
    
  }

  
}
