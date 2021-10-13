import { useParams, useHistory, Link } from "react-router-dom";
import useFetch from "./useFetch";

const EditDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
  

  const editPost = (e) => {
    e.preventDefault();

    let title = document.querySelector('#title').value;
    let body = document.querySelector('#body').value;
    let author = document.querySelector('#author').value;
 
    const editedPost = { title: title, body: body, author: author }

    fetch('http://localhost:8000/blogs/' + blog.id, { 
      method: 'PATCH', 
      headers: { 'Content-Type': 'application/json' },
      // JSON.stringify() accepts an object 
      body: JSON.stringify(editedPost)
    })
    .then(() => {
        // redirect to the home page
        history.push('/')
    }).catch((err) => console.log(err.message))
  }

  return (
    <div className="create">
        <form onSubmit={editPost}>
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>Edit post</h2>
          <label>Blog title:</label>
          <input 
          type="text"
          id="title" 
          required 
          defaultValue={blog.title}
        />

        <label>Blog body:</label>
        <textarea
          rows="10"
          id="body"
          required
          defaultValue={blog.body}
        ></textarea>

        <label>Blog author:</label>
        <select
          id="author"
          defaultValue={blog.author}
        >
          <option value="">Choose author</option>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
          <option value="jimmy">jimmy</option>
          <option value="gus">gus</option>
        </select>    
        </article>
      )}

      <Link className="cancelBtn" to="/">Cancel</Link>
      <button>Submit</button>
      </form>
    </div>
  );
}
 
export default EditDetails;