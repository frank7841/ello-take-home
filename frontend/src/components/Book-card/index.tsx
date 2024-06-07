import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Book } from '../../types';

interface BookCardProps {
    book: Book;
}
const BookCard = ({ book }:BookCardProps) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={book.coverPhotoURL}
                alt={book.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {book.readingLevel}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BookCard;
