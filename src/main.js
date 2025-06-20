import { enterview } from './enterview.js';
import { canvas} from './canvas.js';


// Génère une seed commune à tout
const seed = Math.floor(Math.random() * 1000000);
Math.seedrandom(seed); // installe dans Math.random global

enterview((benchmarkfps) => {
  canvas(benchmarkfps);
});