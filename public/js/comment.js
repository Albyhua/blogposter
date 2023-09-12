const commentform = async (e) => {
    e.preventDefault();


    const comment = document.querySelector('#newComment').value.trim();
    const blogpost_id = document.querySelector('#post-id').value;
    console.log(comment, blogpost_id)
    
    const response = await fetch('/api/comments', {
        method: "POST",
        body: JSON.stringify({comment, blogpost_id}),
            headers: { 'Content-Type': 'application/json' },
    })
    if (response.OK) {
        document.location.reload();
    } 
}

document.querySelector("#commentForm").addEventListener("click", commentform)