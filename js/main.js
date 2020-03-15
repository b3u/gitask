console.info("Note", "If an issue/PR is invalid, it will error with 404. Don't be alarmed");

// Util
const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
}

// About
const toggleAbout = (ev) => {
    ev.stopPropagation(); // Stop event firing twice when users clicks inside the dialog
    if(ev.target.dataset.trigger === "aboutDialog") {
        let d = document.getElementById("aboutDialog");
        
        if(d.classList.contains("c-is-dialog-hidden")) {
            d.classList.remove("c-is-dialog-hidden")
        } else {
            d.classList.add("c-is-dialog-hidden")
        }
    }
}

document.querySelectorAll("[data-trigger=aboutDialog]").forEach(el => {
    el.addEventListener("click", toggleAbout);
})


const handleAdd = () => {
    const id = "task_" + generateId();
    const ul = document.getElementById("tasklist");
    
    let li = document.getElementById("taskitem").content.cloneNode(true);
    
    let liElem = li.firstElementChild;
    liElem.dataset.id = id;
    
    let input = li.querySelector("input");
    input.name = id;
    input.id = id;
    
    let label = li.querySelector("label");
    label.addEventListener("dblclick", () => handleEdit(id))
    label.addEventListener("blur", () => {
        label.contentEditable = false;
        getLinked(label); // Link issues/PRs
    })

    label.addEventListener("keydown", evt => {
        if(evt.code == 'Enter') {
            evt.preventDefault();
            label.blur();
        }
    })
    
    let btnEdit = li.querySelector(".c-js-btn--edit");
    btnEdit.addEventListener("click", () => handleEdit(id));
    
    let btnRemove = li.querySelector(".c-js-btn--remove");
    btnRemove.addEventListener("click", () => handleRemove(id));
    
    ul.appendChild(li);
}

const handleRemove = id => {
    document.querySelector(`[data-id=${id}]`).remove();
}

const handleEdit = id => {
    let label = document.querySelector(`[data-id=${id}] label`);
    label.contentEditable = true;
    label.textContent = label.innerText; // Remove issue-links while editing
    label.focus();
}

document.getElementById('addTask').addEventListener("click", handleAdd)

var sortable = Sortable.create(document.getElementById("tasklist"), {
    ghostClass: "task--ghost",
    dragClass: "task--drag",
    animation: 150
});

const getLinked = (element) => {
    // Regexp for `user/repo#n`
    // Partly from https://github.com/shinnn/github-username-regex
    const regexp = /([a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38})\/\w+#\d+/gi;
    const text = element.textContent;

    const matches = text.match(regexp) || [];
    matches.forEach(m => {
        fetch("https://api.github.com/repos/" + m.replace("#", "/issues/"))
            .then(r => {
                if(r.status !== 404) {
                    return r.json();
                }
            }).then(j => {
                if(j) {
                    element.innerHTML = text.replace(m,
                        `<a title="${j.title}" href="https://github.com/${m.replace("#", "/issues/")}" target="_blank">${m}</a>`
                    )
                }
            })
    })
}