const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

fetch("https://api.github.com/users/foobar404/repos")
    .then(res => res.json())
    .then(projects => {
        if (!projects.length) return;

        projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        projects.forEach(project => {
            let div = document.createElement("div");
            div.className = "project";

            let h1 = document.createElement("h1");
            h1.className = "project_title";
            h1.innerText = project.name;

            let span1 = document.createElement("span");
            span1.className = "project_language"
            span1.innerText = project.language;
            span1.style.background = githubColors[project.language] ?? "#555";

            let span2 = document.createElement("span");
            span2.className = "project_date";
            span2.innerText = new Date(project.created_at).toLocaleDateString();

            let span3 = document.createElement("span");
            span3.className = "project_description";
            span3.innerText = project.description;

            let a1 = document.createElement("a");
            a1.className = "project_github";
            a1.innerText = "Github";
            a1.target = "_blank"
            a1.href = project.html_url;

            let a2 = document.createElement("a");
            a2.className = "project_website";
            a2.innerText = "Website";
            a2.target = "_blank";
            a2.href = project.homepage;
            
            if(project.name) div.appendChild(h1);
            if(project.language) div.appendChild(span1);
            if(project.created_at) h1.appendChild(span2)
            if(project.description) div.appendChild(span3);
            if(project.html_url) div.appendChild(a1);
            if(project.homepage) div.appendChild(a2);

            $("#project_section").appendChild(div);
        })
    })

setInterval(() => {
    let elms = ["#main_section", "#headline_section", "#project_section", "#about_section"]
    elms.forEach(elm => {
        if (isInViewport($(elm))) {
            $$(".nav_link").forEach(x => {
                x.classList.remove("active_link")
            })

            $(`#${$(elm).id}_link`).classList.add("active_link")
        }
    })
}, 300);

$$(".nav_link").forEach(link => {
    link.onclick = e => {
        $$(".nav_link").forEach(x => {
            x.classList.remove("active_link")
        })
        e.currentTarget.classList.add("active_link")
    }
});

$$("video").forEach(video => {
    video.onclick = e => {
        toggle_video(e.currentTarget)
    }
});

$$(".poster").forEach(poster => {
    poster.onclick = e => {
        let video = e.currentTarget.nextElementSibling;
        toggle_video(video)
    }
});

function isInViewport(elm) {
    let rect = elm.getBoundingClientRect();
    let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function toggle_video(video) {
    if (video.paused) video.play();
    else video.pause();

    $$("video").forEach(video => {
        video.parentNode.classList.toggle("hide");
    })
    video.parentNode.classList.remove("hide");
    video.parentNode.classList.toggle("full");
    video.parentNode.querySelector(".poster").classList.toggle("side_poster");
}



