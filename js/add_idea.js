const postsContainer = document.getElementById("postsContainer");

function loadPosts() {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    savedPosts.forEach(postData => {
        const post = document.createElement("div");
        post.classList.add("posts-container__post");
        post.innerHTML = `<strong>${postData.name}</strong><p>${postData.content}</p>`;
        postsContainer.appendChild(post);
    });
}

function addPost(name, content) {
    const post = document.createElement("div");
    post.classList.add("posts-container__post");
    post.innerHTML = `<strong>${name}</strong><p>${content}</p>`;
    postsContainer.appendChild(post);

    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    savedPosts.push({ name, content });
    localStorage.setItem("posts", JSON.stringify(savedPosts));
}

document.getElementById("post-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const content = document.getElementById("content").value;

    if (name && content) {
        addPost(name, content);

        document.getElementById("name").value = "";
        document.getElementById("content").value = "";
    } else {
        alert("Пожалуйста, заполните оба поля.");
    }
});

document.addEventListener("DOMContentLoaded", loadPosts);
