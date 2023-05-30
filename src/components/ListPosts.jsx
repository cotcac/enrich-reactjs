import { useEffect, useState } from "react";
import PostsService from "../api/PostsService";
import { Link } from "react-router-dom";

export default function ListPost() {

    const initPosts = []
    const [posts, setPosts] = useState(initPosts);

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `List Post`;
        getTopic()
    }, []);

    const getTopic = () => {
        console.log("Get topic");
        PostsService.getAll(1)
            .then(function (response) {
                // handle success
                console.log(response);
                setPosts(response.data.results)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }
    const listItems = posts.map(post =>
        <li key={post.id}>
            
            <Link to={'/read/' + post.id }>{post.title}</Link>
        </li>
    );
    return (
        <div className="container">
            <div className="row">
                <h1>List Post</h1>
                <ul>{listItems}</ul>
            </div>
        </div>
    )
}