import { Grid, TextField, IconButton, InputAdornment, Typography, CircularProgress, Alert, List,ListItem, Paper, ListItemText,Button, Box, ListItemAvatar, Snackbar } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear'
import { useQuery,gql } from '@apollo/client';
import BookCard from '../../components/Book-card';
import { Book } from '../../types';
import { useState } from 'react';

// GraphQL query to get the list of books
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
    // Use Apollo Client's useQuery hook to fetch books data
    const { loading, error, data } = useQuery<{ books: Book[] }>(GET_BOOKS);

     // State hooks for search query, reading list, and snackbar
    const [searchQuery, setSearchQuery] = useState('');
    const [readingList, setReadingList] = useState<Book[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error: {error.message}</Alert>;
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

       // Add book to reading list and show snackbar
    const handleAddToReadingList = (book: Book) => {
        if (!readingList.includes(book)) {
            setReadingList([...readingList, book]);
            showSnackbar(`"${book.title}" has been added to your reading list.`);
        }
    };

    const handleRemoveFromReadingList = (book: Book) => {
        const updatedList = readingList.filter((item) => item !== book);
        setReadingList(updatedList);
    };
   // Filter search results based on search query
    const searchResults = searchQuery.trim() !== '' ?
    data?.books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

 

    const clearSearch = () => {
    setSearchQuery('');
    };

    const showSnackbar = (message : string) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };
    
    const isReadingListEmpty = readingList.length === 0;

  return ( 
    <div>

        
        <Box width="100%" display="flex" justifyContent="center" >
            <Box width={{ xs: "100%", md: "50%" }} display="flex" flexDirection="column" alignItems="center">
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
                   <Paper elevation={3} style={{ marginTop: '16px', maxHeight: '60vh', overflowY: 'auto' }}>
                   <List>
                       {searchResults?.map((book, index) => (
                           <ListItem key={`${book.title}-${index}`} divider>
                               <ListItemAvatar>
                                   <img src={`/${book.coverPhotoURL}`} alt={book.title} style={{ maxWidth: '100px', paddingRight: "0.5em" }} />
                               </ListItemAvatar>
                               <ListItemText primary={book.title} secondary={book.author} />
                               <Button variant='contained' style={{ backgroundColor: "#28B8B8", marginLeft:"0.5em" }} onClick={() => handleAddToReadingList(book)}>Add to list</Button>
                           </ListItem>
                       ))}
                   </List>
               </Paper>
                )}
           </Box>
       </Box>
       <Typography variant="h3" component="h4" gutterBottom>My Reading List</Typography>
       {isReadingListEmpty ? (
        
        <Typography variant="h5" component="h6" gutterBottom color="#5ACCCC">Search a book to add to your reading list.</Typography>
       ):(
        
        <Grid container spacing={3} mt={5}>
        {readingList.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} mb={3} key={`${book.title}-${index}`}>
                <BookCard book={book} inReadingList={true} onRemove={handleRemoveFromReadingList} />
            </Grid>
        ))}
         </Grid>
       )}
        <Typography variant="h3" component="h4" gutterBottom>All Books</Typography>
        <Grid container spacing={3} mt={5}>
            {data?.books.map((book, index) => (
                <Grid item xs={12} sm={6} md={4} key={`${book.title}-${index}`}>
                    <BookCard book={book} inReadingList={false} />
                </Grid>
            ))}
        </Grid>
        <Snackbar
                anchorOrigin={{vertical:"top", horizontal:"center"}}
            
                open={snackbarOpen}
                autoHideDuration={1500} 
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
    </div>
  );
}

export default Books