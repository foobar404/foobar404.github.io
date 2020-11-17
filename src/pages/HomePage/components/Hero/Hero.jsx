import React from 'react'

import "./Hero.scss"

export default function Hero() {
    return (
        <header className="Hero">
            <div className="sections @fade">
                <a href="">Projects</a>
                <a href="">Timeline</a>
                <a href="">Footer</a>
            </div>

            <div className="summary @fade">
                <h1>Austin Michaud</h1>
                <span>Web Developer - App Developer - Engineer</span>
                <div className="links">
                    <a className="@scale" target="_blank" href="https://github.com/foobar404">Github</a>
                    <span>/</span>
                    <a className="@scale" target="_blank" href="https://www.linkedin.com/in/austin-michaud-9b25aa141/">Linkedin</a>
                    <span>/</span>
                    <a className="@scale" target="_blank" href="https://www.canva.com/design/DAD4yx8G5c4/WvKOQktljx5o2AH95Wguzg/view?utm_content=DAD4yx8G5c4&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink">Resume</a>
                    <span>/</span>
                    <a className="@scale" target="_blank" href="mailto://austinthemichaud@gmail.com">Email</a>
                </div>
            </div>
        </header>
    )
}
