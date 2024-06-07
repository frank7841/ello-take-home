import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

import { useQuery,gql } from '@apollo/client';
import BookCard from '../../components/Book-card';
import { Book } from '../../types';
const GET_BOOKS = gql`
    query GetBooks {
        books {
            title
            author
            coverPhotoURL
            readingLevel 
        }
    }
`;
const Books =()=> {
    const { loading, error, data } = useQuery<{ books: Book[] }>(GET_BOOKS);
    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  return ( 
    <div>
        <Typography variant="h1" component="h2" gutterBottom>Books</Typography>
        <Grid container spacing={3}>
            {data?.books.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.title}>
                    <BookCard book={book} />
                </Grid>
            ))}
        </Grid>
    </div>
  );
}

export default Books