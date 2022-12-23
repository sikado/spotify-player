import { ApolloClient, InMemoryCache } from "@apollo/client";

const isServer = () => typeof window === 'undefined'

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URI,
  cache: new InMemoryCache(),
  ssrMode: isServer()
})

