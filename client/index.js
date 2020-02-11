const list = project => {
    return `<tr>
    <td>${project.projectNumber}</td>
    <td>${project.projectName}</td>
    <td>${project.projectCost}</td>
    <td>${project.date}</td>
    <th>
        <button>delete</button>
    </th>
</tr>
`
}

let projects = []

// Get the modal
var modal = document.getElementById("modalProject");

// Get the button that opens the modal
var btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const BASE_URL = '/api/project'

class ProjectApi {
    static fetch() {
        return fetch(BASE_URL, {
            method: 'get'
        }).then(res => res.json())
    }

    static create(project) {
        return fetch(BASE_URL, {
            method: 'post',
            body: JSON.stringify(project),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ProjectApi.fetch().then(backendProjects => {
        projects = backendProjects.concat()
        renderProjects(projects)
    })
    document.querySelector('#createProject').addEventListener('click', onCreateProject)
    // document.querySelector('#projects').addEventListener('click', onDeletePost)
})

function renderProjects(_projects = []) {
    const $projects = document.querySelector('#projects')

    if (_projects.length > 0) {
        $projects.innerHTML = _projects.map(project => list(project)).join(' ')
    } else {
        $projects.innerHTML = '<div>project list empty</div>'
    }
}

function onCreateProject() {
    const $number = document.querySelector('#projectNumber')
    const $name = document.querySelector('#projectName')
    const $cost = document.querySelector('#projectCost')
    const $date = document.querySelector('#date')

    if ($number.value && $name.value) {
        const newProject = {
            projectNumber: $number.value,
            projectName: $name.value,
            projectCost: $cost.value,
            date: $date.value
        }
        ProjectApi.create(newProject).then(project => {
            projects.push(project)
            renderProjects(projects)
        })
        // modal.close()
        // $number = ''
        // $name = ''
        // $cost = ''
        // $date =''        
    }
}