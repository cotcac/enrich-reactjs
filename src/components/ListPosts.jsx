import { useEffect, useState } from "react";
import PostsService from "../api/PostsService";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Topic from "./Topic";
import PostItem from "./posts/postItem";
// console.log(moment.now());

export default function ListPost() {
    const [searchParams] = useSearchParams();
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
        document.title = `List Post`;
        setCurPage(searchParams.get('page'));
        console.log("[current page]",curPage);
        getPosts(curPage || 1)
    }, [curPage, location]);

    const getPosts = (page) => {
        setIsLoading(true);
        PostsService.getAll(page)
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