function showPage(pageId) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    const selectedPage = document.getElementById(pageId + '-page');
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }
    window.scrollTo(0, 0);
}

function handleContact(event) {
    event.preventDefault();
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';
}

window.onload = function() {
    showPage('home');
};