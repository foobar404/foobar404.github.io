import React from 'react'

import "./Projects.scss"

export default function Projects() {
    return (
        <section className="Projects">
            <div className="project">
                <div className="mask"></div>
                <iframe src="https://joincobble.com" sandbox></iframe>
            </div>
            <div className="project">
                <div className="mask"></div>
                <iframe src="https://foobar404.github.io/Wave.js/#/" sandbox></iframe>
            </div>      
            <div className="project">
                <div className="mask"></div>
                <iframe src="https://comet.ninja/" sandbox></iframe>
            </div>  
            <div className="project">
                <div className="mask"></div>
                <iframe src="https://chess.express/" sandbox></iframe>
            </div>  
            <div className="project">
                <div className="mask"></div>
                <iframe src="https://foobar404.github.io/image-palette/" sandbox></iframe>
            </div>        
        </section>
    )
}
