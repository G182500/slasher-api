import { Controller, Get, Param, ParseBoolPipe, Query } from "@nestjs/common";
import { FormatCurrencyPipe } from "../../pipes/format-currency.pipe";


@Controller('movie')
export class MovieController {
  constructor(private formatCurrencyPipe: FormatCurrencyPipe) {} //colocar pipe em service depois | private movieService: MovieService*/

  @Get()
  findAll(@Query('withCharacters', new ParseBoolPipe({ optional: true })) withCharacters = false) {
    if (!withCharacters) {
      return { title: 'Freddy vs Jason', budget: this.formatCurrencyPipe.transform("30000000.00"), director: 'Ronny Yu', year: 2003 }
    }

    return { 
      title: 'Freddy vs Jason', budget: this.formatCurrencyPipe.transform("30000000.00"), director: 'Ronny Yu', year: 2003, characters: [
        { name: 'Freddy Krueger', side: 'evil', description: 'A burned man wearing a glove with blades' },
        { name: 'Jason Voorhees', side: 'evil', description: 'An undead man holding a Machete' },
      ],
    }
  }

  @Get(':id')
  findById(@Param('id') movieId: string) {
    console.log(movieId)
    return true;
  }
}

/*
import { Column } from 'typeorm';

@Column('budget', { precision: 10, scale: 2 })
price: string;
*/