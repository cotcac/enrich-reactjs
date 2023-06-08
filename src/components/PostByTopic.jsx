import { useEffect, useState } from "react";
import PostsService from "../api/PostsService";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import Topic from "./Topic";
import PostItem from "./posts/postItem";
// console.log(moment.now());

export default function PostByTopic() {
    const [searchParams] = useSearchParams();

    const { id } = useParams();
    const location = useLocation();

    const initPosts = []
    const [nextPage, setNextPage] = useState(null)
    const [prevPage, setPrevPage] = useState(null)
    const [pagePrefix, setPagePrefix] = useState("?page=");
    const [curPage, setCurPage] = useState(1)
    const [apiError, setAPIError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    

    const [posts, setPosts] = useState(initPosts);

    useEffect(() => {
        // Update the document title using the browser API
        console.log(id);
        document.title = `List post by topic`;
        setCurPage(searchParams.get('page'));
        console.log("[current page]",curPage);
        getPosts(id, curPage || 1)
    }, [curPage, location]);

    const getPosts = (topic_id, page) => {
        setIsLoading(true);
        PostsService.topic(topic_id, page)
            .then(function (response) {
                // handle success
                console.log(response);
                setPosts(response.data.results);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
                setIsLoading(false);
                setAPIError("");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setIsLoading(false);
                setAPIError(error.message || "Something went wrong!");
            })
            .finally(function () {
                // always executed
            });
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                <h1>List Post</h1>
                <PostItem 
                    isLoading={isLoading} 
                    apiError={apiError}
                    posts={posts}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    pagePrefix={pagePrefix}
                    />
            </div>
            <div className="col-md-4">
                <Topic />
            </div>
            </div>

        </div>
    )
}