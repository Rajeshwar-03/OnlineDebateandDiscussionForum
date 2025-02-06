// script.js

// Home Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    loadDiscussions();

    document.getElementById('submit-post').addEventListener('click', function() {
        const postInput = document.getElementById('post-input');
        const postContent = postInput.value.trim();
        const errorMessage = document.getElementById('error-message');

        // Clear previous error message
        errorMessage.textContent = '';

        // Input validation
        if (postContent === '') {
            errorMessage.textContent = 'Please enter a discussion topic.';
            return;
        }

        if (postContent.length > 200) {
            errorMessage.textContent = 'Discussion topic must be less than 200 characters.';
            return;
        }

        // Save the new discussion
        saveDiscussion(postContent);

        // Create a new post
        const postsDiv = document.getElementById('posts');
        const newPost = document.createElement('div');
        newPost.textContent = postContent;
        newPost.classList.add('post');
        newPost.onclick = function() {
            location.href = 'discussion.html?topic=' + encodeURIComponent(postContent);
        };

        // Add a fade-in effect for new posts
        newPost.style.opacity = 0;
        postsDiv.appendChild(newPost);
        setTimeout(() => {
            newPost.style.opacity = 1;
        }, 10);

        // Clear the input field
        postInput.value = '';
    });
});

// Load discussions from local storage
function loadDiscussions() {
    const discussions = JSON.parse(localStorage.getItem('discussions')) || [];
    const postsDiv = document.getElementById('posts');
    discussions.forEach(discussion => {
        const newPost = document.createElement('div');
        newPost.textContent = discussion;
        newPost.classList.add('post');
        newPost.onclick = function() {
            location.href = 'discussion.html?topic=' + encodeURIComponent(discussion);
        };
        postsDiv.appendChild(newPost);
    });
}

// Save discussion to local storage
function saveDiscussion(discussion) {
    const discussions = JSON.parse(localStorage.getItem('discussions')) || [];
    discussions.push(discussion);
    localStorage.setItem('discussions', JSON.stringify(discussions));
}

// Discussion Page Functionality
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const topic = urlParams.get('topic');
    const topicTitle = document.getElementById('topic-title');

    // Set the topic title based on the selected discussion
    if (topic) {
        topicTitle.textContent = topic;
        loadComments(topic);
    } else {
        topicTitle.textContent = 'Discussion Topic';
    }

    document.getElementById('submit-comment').addEventListener('click', function() {
        const commentInput = document.getElementById('comment-input');
        const commentContent = commentInput.value.trim();
        const commentErrorMessage = document.getElementById('comment-error-message');

        // Clear previous error message
        commentErrorMessage.textContent = '';

        // Input validation
        if (commentContent === '') {
            commentErrorMessage.textContent = 'Please enter a comment.';
            return;
        }

        if (commentContent.length > 200) {
            commentErrorMessage.textContent = 'Comment must be less than 200 characters.';
            return;
        }

        // Save the new comment
        saveComment(topic, commentContent);

        // Create a new comment
        const commentsDiv = document.getElementById('comments');
        const newComment = document.createElement('div');
        newComment.textContent = commentContent;
        newComment.classList.add('comment');

        // Add a fade-in effect for new comments
        newComment.style.opacity = 0;
        commentsDiv.appendChild(newComment);
        setTimeout(() => {
            newComment.style.opacity = 1;
        }, 10);

        // Clear the input field
        commentInput.value = '';
    });

    // Back button functionality
    document.getElementById('back-button').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
};

// Load comments from local storage
function loadComments(topic) {
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    const commentsDiv = document.getElementById('comments');
    const topicComments = comments[topic] || [];
    topicComments.forEach(comment => {
        const newComment = document.createElement('div');
        newComment.textContent = comment;
        newComment.classList.add('comment');
        commentsDiv.appendChild(newComment);
    });
}

// Save comment to local storage
function saveComment(topic, comment) {
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    if (!comments[topic]) {
        comments[topic] = [];
    }
    comments[topic].push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}