const blogPostform = async (event) => {
    event.preventDefault();

    const newBlog = document.querySelector('#new-post').value.trim();
    const blogpost_id = document.querySelector('#post-id').value;

    const response = await fetch('/api/blogpost', {
        method: "POST",
        body: JSON.stringify({newBlog, blogpost_id}),
            headers: { 'Content-Type': 'application/json' },
    })
    if (response.OK) {
        document.location.reload();
    } 


   document.location.replace();
}


document.querySelector('#new-post').addEventListener("click", blogPostform)