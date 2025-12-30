/**
 * Sayfalar arası geçişi sağlar
 */
function showPage(pageId) {
    // Tüm sayfa içeriklerini bul ve gizle
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Tıklanan sayfayı göster
    const selectedPage = document.getElementById(pageId + '-page');
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }
}

/**
 * İletişim formu gönderildiğinde çalışır
 */
function handleContact(event) {
    event.preventDefault(); // Sayfanın yenilenmesini durdurur

    // Formu gizle
    const contactForm = document.getElementById('contact-form');
    contactForm.style.display = 'none';

    // Başarı mesajını göster
    const successBox = document.getElementById('success-message');
    successBox.style.display = 'block';
}

// Site açıldığında otomatik olarak ana sayfayı göster
window.onload = function() {
    showPage('home');
};