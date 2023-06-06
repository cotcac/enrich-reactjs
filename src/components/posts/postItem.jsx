import { Alert, Button, ButtonGroup, Grid, LinearProgress, List } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PostItem({ isLoading, apiError, listItems, prevPage, nextPage, pagePrefix }) {
    useEffect(() => {
    }, []);
    return (
        <>
            {isLoading && <LinearProgress />}
            {apiError && <Alert severity="error">{apiError}</Alert>}
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {listItems}
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