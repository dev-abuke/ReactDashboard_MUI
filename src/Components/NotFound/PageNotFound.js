import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';
import { Helmet } from 'react-helmet';

export default function PageNotFound() {
    return (
        <div>
            <Helmet>
            <title>Page Not Found</title>
            </Helmet>
            <Container>
                <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                    <Typography variant="h3" paragraph>
                        Sorry, page not found!
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
                        Be sure to check your spelling.
                    </Typography>
                    <Box
                        component="img"
                        src="/static/illustration_404.svg"
                        sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                    />

                    <Button to="/home" size="large" variant="contained" component={RouterLink}>
                        Go to Home
                    </Button>
                </Box>
            </Container>
        </div>
    );
}