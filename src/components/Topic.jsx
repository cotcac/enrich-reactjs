import { useEffect, useState } from "react";
import { httpNoAuth } from "../helper/httpCommon";
import Children from "./Children";
import FolderIcon from '@mui/icons-material/Folder';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

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
                <ListItem component={Link} to={"/topic/"+ topic.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={topic.name}
                  />
                </ListItem>,
        // <li key={topic.id}>{topic.name}</li>
    );
    return (
        <>
            <h1>Topic</h1>
            <List>{listItems}</List>
        </>
    )
}