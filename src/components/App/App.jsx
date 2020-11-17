import {HomePage} from "../../pages"
import img from "../../assets/media/hero.jpg"

import './App.scss';

//load images ASAP
new Image().src = img

export default function App() {
  return (
    <HomePage></HomePage>
  );
}

