$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }
    });
});
async function loadProjects() {
    try {
        const response = await fetch("/staticfiles/js/projects.json");
        if (!response.ok) throw new Error("Failed to fetch projects.json");
        return await response.json();
    } catch (error) {
        console.error("Error loading project data:", error);
        return [];
    }
}
function createProjectCard(project) {
    const imgSrc = `/staticfiles/images/${project.image}.png`;
    return `
    <div class="grid-item ${project.category}">
        <div class="box tilt" style="width: 380px; margin: 1rem">
            <img 
                src="${imgSrc}" 
                alt="${project.name}" 
                onerror="this.onerror=null;this.src='/staticfiles/images/default.png';"
                draggable="false"
            />
            <div class="content">
                <div class="tag"><h3>${project.name}</h3></div>
                <div class="desc">
                    <p>${project.desc}</p>
                    <div class="btns">
                        <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                        <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}
async function renderProjects() {
    const projects = await loadProjects();
    const container = document.querySelector(".work .box-container");
    container.innerHTML = projects.map(createProjectCard).join("");
    const $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });
    $('.button-group').on('click', 'button', function () {
        $('.button-group .is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        const filter = $(this).attr('data-filter');
        $grid.isotope({ filter: filter });
    });
}
renderProjects();
document.onkeydown = function (e) {
    if (e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && ['I','C','J'].includes(String.fromCharCode(e.keyCode))) ||
        (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))) {
        return false;
    }
};
(function () {
    var s1 = document.createElement("script");
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    document.head.appendChild(s1);
})();
