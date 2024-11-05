function logLoadTime() {
    let time = window.performance.timing
    let pageLoadTime = time.loadEventStart - time.navigationStart;
    const footer = document.querySelector('.footer');
    footer.innerHTML += `<p style="text-align: center">Время загрузки страницы: ${pageLoadTime} мс</p>`;
}

window.addEventListener('load', logLoadTime);

