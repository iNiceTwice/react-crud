import React from "react"
import {render} from "react-dom"
import App from "./Components/App"

new WOW().init(); // Scroll animations

render(<App/>,document.querySelector("#root"))
