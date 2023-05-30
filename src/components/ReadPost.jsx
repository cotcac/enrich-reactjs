import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router";
import { UserContext } from "./context"
import PostsService from "../api/PostsService";
// import { UserContext } from '../../layouts/context';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function ReadPost() {

    const user = useContext(UserContext);
    console.log("[user]", user);
    const { id } = useParams();
    const init_post = {
        title: "",
        content: "",
        user: {
            id: null,
            first_name: ""
        },
        topic: {
            id: null,
            name: ""
        }
    }

    const [post, setpost] = useState(init_post);
    const [isEdit, setIsEdit] = useState(false);
    const [apiError, setAPIError] = useState("")
    const [html, setHtml] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const retrievepost = () => {
        if (!id) {
            return;
        }
        PostsService.getOne(id)
            .then((response) => {
                console.log(response.data);
                setpost(response.data);
                setIsLoading(false)
            })
            .catch((error) => {
                setAPIError(error.message ? error.message : "Something went wrong!")
                setIsLoading(false)
            })
    };

    useEffect(() => {
        retrievepost();
        document.title = post.title || "no title"; // only work after put post.title in the useEffect array.
    }, [post.title]);



    const handleDelete = () => {}

    return (
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <h1>{post.title}</h1>

                    <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    {user && user.id === post.user.id && (<>
                        <Link to={'/write/' + post.id}>Edit</Link> |
                        <Button onClick={handleDelete}>Delete</Button>
                    </>)}
                </div>
                <div className="col-4">
                    <h5>Author</h5>
                    <Link to={"/user/" + post.user.username}>{post.user.first_name}</Link>

                    <h5>Topics</h5>
                    <Link to={"/topic/" + post.topic?.id}>{post.topic?.name}</Link>
                    <h5>Tags</h5>
                    <Link to={"/tag/" + post.tags}>{post.tags}</Link>

                </div>
            </div>
        </div>
    );
}
