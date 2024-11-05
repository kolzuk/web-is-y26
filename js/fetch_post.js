function getFormattedNowDate() {
    const today = new Date();
    const yy = today.getFullYear() % 100;
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '.' + mm + '.' + yy;
}

document.addEventListener('DOMContentLoaded', function() {
    const dataContainer = document.getElementById('articles');
    const preloader = document.getElementById('preloader');
    const errorMessage = document.getElementById('error-message');

    function renderData(data) {
        data.forEach(item => {
            const postElement = document.createElement('div');
            postElement.classList.add('article');
            postElement.innerHTML = `
                <div class="article__name">${item.title}</div>
                <div class="article__date">${getFormattedNowDate()}</div>
                <div class="article__content">${item.body}</div>
            `;

            dataContainer.insertBefore(postElement, dataContainer.firstChild);
        });
    }

    function fetchData() {
        preloader.style.display = 'block';
        errorMessage.textContent = '';

        const filterId = Math.random() > 0.5 ? 100 : 200;
        const url = `https://jsonplaceholder.typicode.com/posts?_limit=5&id_gte=${filterId}`;

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Ошибка сети');
                return response.json();
            })
            .then(data => {
                preloader.style.display = 'none';
                renderData(data);
            })
            .catch(error => {
                preloader.style.display = 'none';
                errorMessage.textContent = '⚠ Что-то пошло не так. Попробуйте позже.';
                console.error('Ошибка:', error);
            });
    }

    // Запуск загрузки данных при загрузке страницы
    fetchData();
});
