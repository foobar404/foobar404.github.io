import React from 'react'
import Hero from "./components/Hero/Hero.jsx"
import Projects from "./components/Projects/Projects.jsx"
import Timeline from "./components/Timeline/Timeline.jsx"
import {Nav} from "../../components"

import "./HomePage.scss"

export default function HomePage() {
    return (
        <main className="HomePage">
            <Nav />
            <Hero />
            <Projects />
            <Timeline />
        </main>
    )
}
