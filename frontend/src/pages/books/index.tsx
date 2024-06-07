import { Grid, TextField, IconButton, InputAdornment, Typography, CircularProgress, Alert, List,ListItem, Paper, ListItemText,Button, Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear'
import { useQuery,gql } from '@apollo/client';
import BookCard from '../../components/Book-card';
import { Book } from '../../types';
import { useState } from 'react';
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
    const [searchQuery, setSearchQuery] = useState('');
    const [readingList, setReadingList] = useState<Book[]>([]);
    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error: {error.message}</Alert>;
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleAddToReadingList = (book: Book) => {
        if (!readingList.includes(book)) {
            setReadingList([...readingList, book]);
        }
    };

    const handleRemoveFromReadingList = (book: Book) => {
        const updatedList = readingList.filter((item) => item !== book);
        setReadingList(updatedList);
    };

    const searchResults = searchQuery.trim() !== '' ?
    data?.books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const filteredBooks = searchQuery.trim() !== '' ?
    data?.books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) :
    data?.books;

const clearSearch = () => {
    setSearchQuery('');
};


  return ( 
    <div>
        <Typography variant="h1" component="h2" gutterBottom>Books</Typography>
        
        <Box width="100%" display="flex" justifyContent="center">
            <Box width="50%" display="flex" flexDirection="column" alignItems="center">
                <TextField
                    label="Search books"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="clear search"
                                    onClick={clearSearch}
                                    edge="end"
                                >
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                {searchQuery && (
                    <Paper elevation={3} style={{ marginTop: '16px', maxHeight: '300px', overflowY: 'auto' }}>
                        <List>
                            {searchResults?.map((book, index) => (
                                <ListItem key={`${book.title}-${index}`} divider>
                                    <ListItemText primary={book.title} secondary={book.author} />
                                    <Button onClick={() => handleAddToReadingList(book)}>Add to reading list</Button>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}
           </Box>
       </Box>
       <Typography variant="h3" component="h4" gutterBottom>Reading List</Typography>
       <Grid container spacing={3} mt={5}>
            {readingList.map((book, index) => (
                <Grid item xs={12} sm={6} md={4} key={`${book.title}-${index}`}>
                    <BookCard book={book} inReadingList={true} onRemove={handleRemoveFromReadingList} />
                </Grid>
            ))}
        </Grid>
        <Typography variant="h3" component="h4" gutterBottom>All Books</Typography>
        <Grid container spacing={3} mt={5}>
            {data?.books.map((book, index) => (
                <Grid item xs={12} sm={6} md={4} key={`${book.title}-${index}`}>
                    <BookCard book={book} inReadingList={false} />
                </Grid>
            ))}
        </Grid>
    </div>
  );
}

export default Books