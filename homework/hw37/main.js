const postContainer = document.getElementById('post-container');
const postTitle = document.getElementById('post-title');
const postBody = document.getElementById('post-body');
const commentsBtn = document.getElementById('comments-btn');
const commentsContainer = document.getElementById('comments-container');
const commentsList = document.getElementById('comments-list');
const errorContainer = document.getElementById('error-container');
const errorMessage = document.getElementById('error-message');
const searchBtn = document.getElementById('search-btn');
const postIdInput = document.getElementById('post-id-input');

function getPostById(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

function getCommentsByPostId(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

function displayPost(post) {
    postTitle.innerText = post.title;
    postBody.innerText = post.body;
    postContainer.style.display = 'block';
    //errorContainer.style.display = 'none';
}

function displayError(error) {
    errorMessage.innerText = error.message;
    errorContainer.style.display = 'block';
}

function displayComments(comments) {
    comments.forEach(comment => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h3>${comment['name']}</h3>
            <p>${comment['body']}</p>
            <h4>${comment['email']}</h4>
        `
        commentsList.appendChild(li);

        commentsContainer.style.display = 'block';
    })
}

searchBtn.addEventListener('click', () => {
    const postId = postIdInput.value;
    getPostById(postId)
        .then(post => {
            displayPost(post);
            commentsBtn.addEventListener('click', () => {
                getCommentsByPostId(postId)
                    .then(comments => {
                        displayComments(comments);
                    })
                    .catch(error => {
                        displayError(error);
                    });
            });
        })
        .catch(error => {
            displayError(error);
        });
});
