import { useEffect, useState } from "react";
import { httpNoAuth } from "../helper/httpCommon";
import Children from "./Children";

export default function Topic() {
    const initTopics = []
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        document.title = `Topic`;
        getTopic();
    },[]);
    const getTopic = () => {
        console.log("Get topic");
        httpNoAuth.get('/topics/')
            .then(function (response) {
                // handle success
                console.log(response);
                setTopics(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }
    const listItems = topics.map(topic =>
        <li key={topic.id}>{topic.name}</li>
    );
    return (
        <div className="container">
            <div className="row">
            <h1>Topic</h1>
            <ul>{listItems}</ul>
            <Children data="this is parent data" />
        </div>
        </div>
    )
}