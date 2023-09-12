const deletePost = async (e) => {
    e.preventDefault();


    const deletePost = document.querySelector('#delete-post').value.trim();
    const blogpost_id = document.querySelector('#post-id').value.trim();

    const response = await fetch('/api/profile', {
        method: "POST",
        body: JSON.stringify({deletePost, blogpost_id}),
            headers: { 'Content-Type': 'application/json' },
    })
    if (response.OK) {
        document.location.reload("/profile");
    } 
}

const editForm = async (e) => {
    e.preventDefault();


    const edit = document.querySelector('#edit-post').value.trim();
    const blogpost_id = document.querySelector('#post-id').value;

    const response = await fetch('/api/profile', {
        method: "POST",
        body: JSON.stringify({edit, blogpost_id}),
            headers: { 'Content-Type': 'application/json' },
    })
    if (response.OK) {
        document.location.reload("/profile");
    } 
}

document.querySelector("#edit-post").addEventListener("submit", editForm)

document.querySelector("#delete-post").addEventListener("click", deletePost)