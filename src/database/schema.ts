import * as character from "./schemas/character";
import * as movie from "./schemas/movie";

export const schema = {
  ...movie,
  ...character
};

export * from "./schemas/movie";
export * from "./schemas/character";