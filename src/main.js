import p5 from "p5";
import * as sketch from "./sketch";

new p5(p => {
  p.setup = () => sketch.setup(p);
  p.draw = () => sketch.draw(p);
  p.windowResized = () => sketch.windowResized(p);
});
