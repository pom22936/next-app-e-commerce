import { NextRequest } from 'next/server'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { gql } from 'graphql-tag'

export interface Book {
    title: string
    author: string
}

// Mock data
const books: Book[] = [
    { title: 'Harry Potter', author: 'J.K. Rowling' },
    { title: 'Lord of the Rings', author: 'J.R.R. Tolkien' },
]

// TypeDefs
const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
`

// Resolvers
const resolvers = {
    Query: {
        books: () => books,
    },
}

// ✅ ใช้ ApolloServer จาก @apollo/server
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

// ✅ ใช้ startServerAndCreateNextHandler จาก @as-integrations/next
const handler = startServerAndCreateNextHandler<NextRequest>(server)

export { handler as GET, handler as POST }