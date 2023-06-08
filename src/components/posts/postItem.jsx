import { Alert, Avatar, Button, ButtonGroup, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

export default function PostItem({ isLoading, apiError, posts, prevPage, nextPage, pagePrefix }) {
    useEffect(() => {
    }, []);

    const listItems1 = posts.map(post =>
        <ListItem key={post.id} component={Link} to={"/read/" + post.id } >
            <ListItemAvatar>
                {/* <Avatar>
                    <ImageIcon />
                </Avatar> */}
                    {post.topic.avatar && <Avatar alt='' src={post.topic.avatar} />}
            </ListItemAvatar>
            <ListItemText primary={
                post.title} 
                secondary={moment(post.created_at).fromNow() + " | " + 
                post.topic.name + " | " + 
                post.user.first_name} />
        </ListItem>
    );
    return (
        <>
            {isLoading && <LinearProgress />}
            {apiError && <Alert severity="error">{apiError}</Alert>}
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {listItems1}
            </List>
            <Grid container justifyContent="center">
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                >
                    {prevPage && <Button variant="contained" component={Link} to={pagePrefix + prevPage}> Prev </Button>}
                    {nextPage && <Button variant="contained" component={Link} to={pagePrefix + nextPage}> Next </Button>}
                </ButtonGroup>
            </Grid>
        </>
    )
}