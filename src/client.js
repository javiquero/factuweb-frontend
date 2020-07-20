import * as sapper from '@sapper/app';
import { cart } from "./store/cart.js";

sapper.start({
  target: document.getElementsByTagName('app')[0]
});
cart.fetch();
