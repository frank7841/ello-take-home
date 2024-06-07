import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Book } from '../../types';

interface BookCardProps {
    book: Book;
    inReadingList:boolean;
    onRemove?: (book: Book) => void;
}
const BookCard = ({ book, inReadingList, onRemove }:BookCardProps) => {
    const imagePath = `/${book.coverPhotoURL}`;
    const handleRemoveClick = () => {
        if (onRemove) {
            onRemove(book);
        }
    };
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={imagePath}
                alt={book.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                </Typography>
                <Typography variant="body2" color="#335C6E">
                <span style={{ fontStyle: 'italic', marginRight: '0.5em',color:"#FAAD00" }}>Author:</span>{book.author}
                </Typography>
                
                <Typography variant="body2" color="#335C6E">
                <span style={{ fontStyle: 'italic', marginRight: '0.5em', color:"#FAAD00" }}>Reading Level:</span>{book.readingLevel}
                </Typography>
                {inReadingList && (
                    <Button variant='contained' style={{ backgroundColor: '#F76434' }} onClick={handleRemoveClick}>Remove</Button>
                ) }
            </CardContent>
        </Card>
    );
};

export default BookCard;
