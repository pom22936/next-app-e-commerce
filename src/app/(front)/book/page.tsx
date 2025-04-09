"use client"

import client from '@/lib/apollo-client'
import { gql, useQuery } from '@apollo/client'
import { Book } from '@/app/api/graphql/route'

const GET_BOOKS = gql`
    query GetBooks {
        books {
            title
            author
        }
    }
`

import React from 'react'

const BooksPage = () => {
    const { loading, error, data } = useQuery(GET_BOOKS, { client })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    return (
        <div>
            <h1 className="text-xl font-bold">📚 Book List</h1>
            <ul className="mt-4">
                {data.books.map((book: Book, index: number) => (
                <li key={index}>
                    <strong>{book.title}</strong> by {book.author}
                </li>
                ))}
            </ul>
        </div>
    )
}

export default BooksPage