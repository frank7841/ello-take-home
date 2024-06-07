import React from 'react'

import { useQuery,gql } from '@apollo/client';
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
    const { loading, error, data } = useQuery(GET_BOOKS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

  return ( 
        <div>
                <h1>Books</h1>
      <ul>
        {data.books.map((book: { readingLevel: string; title: string; author: string }) => (
          <li key={book.author}>
            <h2>{book.title}</h2>
            <p>{book.readingLevel}</p>
          </li>
        ))}
      </ul>
    
        </div>
  );
}

export default Books