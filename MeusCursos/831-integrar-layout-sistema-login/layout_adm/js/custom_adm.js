//Dropdown navbar
let avatar = document.querySelector(".avatar"),
    notification = document.querySelector(".notification");

//console.log(avatar);

dropMenu(avatar);
dropMenu(notification);

function dropMenu(selector) {
    selector.addEventListener("click", () => {
        let dropDownMenu = selector.querySelector(".dropdown-menu");
        dropDownMenu.classList.contains("active") ? dropDownMenu.classList.remove("active") : dropDownMenu.classList.add("active");
    });
}

//Sidebar Toggle
let sidebar = document.querySelector(".sidebar"),
    bars = document.querySelector(".bars");
bars.addEventListener("click", () => {
    sidebar.classList.contains("active") ? sidebar.classList.remove("active") : sidebar.classList.add("active");
});

window.matchMedia("(max-width : 768px)").matches ? sidebar.classList.remove("active") : sidebar.classList.add("active");

//Botao acao do lista
function actionDropdown(id) {
    closeDropdownAction();
    document.getElementById("actionDropdown" + id).classList.toggle("show-dropdown-action");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn-action')) {
        //document.getElementById("actionDropdown").classList.remove("show-dropdown-action");
        closeDropdownAction();
    }
}

function closeDropdownAction() {
    var dropdowns = document.getElementsByClassName("dropdown-action-item");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i]
        if (openDropdown.classList.contains("show-dropdown-action")) {
            openDropdown.classList.remove("show-dropdown-action");
        }
    }
}