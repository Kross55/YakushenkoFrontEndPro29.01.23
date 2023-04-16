const API_ENDPOINT = 'https://jsonplaceholder.typicode.com';

const searchBtn = document.getElementById('search-btn');
const commentsBtn = document.getElementById('comments-btn');

function apiCall(url) {
    return fetch(url)
        .then(res => res.json());
}

/*
function getPostsList() {
    return apiCall(`${API_ENDPOINT}/posts`);
}
*/

function getPostById(postId) {
    return apiCall(`${API_ENDPOINT}/posts/${postId}`);
}

function getCommentsByPostId(postId) {
    return apiCall(`${API_ENDPOINT}/posts/${postId}/comments`);
}

/*
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
*/

searchBtn.addEventListener('click', handlePost);
commentsBtn.addEventListener('click', handleComments);

function handlePost() {
    const postIdInput = document.getElementById('post-id-input');
    const postId = postIdInput.value;
  
    getPostById(postId)
        .then(displayPost)
        .catch(displayError);
}
  
function handleComments(event) {
    //<button id='comments-btn' data-postid = `${post.id}`>View Comments</button> 
    const postId = event.target.dataset.postid;
  
    getCommentsByPostId(postId)
        .then(displayComments)
        .catch(displayError);
}

function displayPost(post) {
    const postContainer = document.getElementById('post-container');
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');

    postTitle.innerText = post.title;
    postBody.innerText = post.body;

    // then use this id for fetching comments list in handleComments
    // before <button id='comments-btn'>View Comments</button> 
    commentsBtn.dataset.postid = post.id; 
    // after <button id='comments-btn' data-postid = `${post.id}`>View Comments</button>    
    postContainer.style.display = 'block';

    console.log(commentsBtn)
    //errorContainer.style.display = 'none';
}

function displayComments(comments) {
    const commentsContainer = document.getElementById('comments-container');
    const commentsList = document.getElementById('comments-list');

    comments.forEach(comment => {
        const li = document.createElement("li");

        li.innerHTML = `
            <h3>${comment.name}</h3>
            <p>${comment.body}</p>
            <h4>${comment.email}</h4>
        `
        commentsList.appendChild(li);
        commentsContainer.style.display = 'block';
    })
}

function displayError(error) {
    const errorContainer = document.getElementById('error-container');
    const errorMessage = document.getElementById('error-message');

    errorMessage.innerText = error.message;
    errorContainer.style.display = 'block';
}

/* 
// my first solution
searchBtn.addEventListener('click', () => {
    const postIdInput = document.getElementById('post-id-input');

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
*/
