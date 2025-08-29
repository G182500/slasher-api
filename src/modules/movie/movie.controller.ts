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

/*

const horrorMovies = [
  { title: 'The Exorcist', director: 'William Friedkin', year: 1973, budget: "12000000.00", profit: "441306145.00" },
  { title: 'Get Out', director: 'Jordan Peele', year: 2017, budget: "4500000.00", profit: "255407969.00" },
  { title: 'A Nightmare on Elm Street', director: 'Wes Craven', year: 1984, budget: "1800000.00", profit: "57298500.00" },
  { title: 'Hereditary', director: 'Ari Aster', year: 2018, budget: "10000000.00", profit: "82482684.00" },
  { title: 'It', director: 'Andy Muschietti', year: 2017, budget: "35000000.00", profit: "701800000.00" },
  { title: 'The Conjuring', director: 'James Wan', year: 2013, budget: "20000000.00", profit: "319494638.00" },
  { title: 'Paranormal Activity', director: 'Oren Peli', year: 2007, budget: "15000.00", profit: "193355800.00" },
  { title: 'Halloween', director: 'John Carpenter', year: 1978, budget: "325000.00", profit: "70000000.00" },
  { title: 'Scream', director: 'Wes Craven', year: 1996, budget: "15000000.00", profit: "173046663.00" },
  { title: 'Freddy vs Jason', director: 'Ronny Yu', year: 2003, budget: "30000000.00", profit: "116600000.00" }
];


*/