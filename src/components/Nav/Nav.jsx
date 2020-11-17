import React,{useState,useEffect} from 'react'

import "./Nav.scss"

export default function Nav() {
    let [sectionIndex,setSectionIndex] = useState(0)
    let [scrollStyle,setScrollStyle] = useState("hide")
    let sections = ["Projects","Timeline","Footer"]

    useEffect(()=>{
        const stickyTrigger = e=>{
            //how much are we scrolled
            var scrollTop = (window.pageYOffset !== undefined) ? 
            window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

            if(scrollTop === 0) setScrollStyle("hide")
            else setScrollStyle("")
        }

        document.addEventListener("scroll",stickyTrigger)
        document.addEventListener("load",stickyTrigger)
    },[])


    return (
        <nav className={`Nav ${scrollStyle}`}>
            <a href="">Projects</a>
            <a href="">Timeline</a>
            <a href="">Footer</a>
            <p>
                {sections[sectionIndex]}
            </p>
        </nav>
    )
}
