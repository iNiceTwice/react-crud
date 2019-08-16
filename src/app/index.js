import React from "react"
import {render} from "react-dom"
import "bootstrap/dist/css/bootstrap.css"
import App from "./Components/App"

new WOW().init(); // Scroll animations

render(<App/>,document.querySelector("#root"))
