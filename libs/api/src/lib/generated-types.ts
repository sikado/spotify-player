import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type gql_Album = {
  __typename?: 'Album';
  id: Scalars['String'];
  images?: Maybe<Array<Maybe<gql_Image>>>;
  name: Scalars['String'];
};

export type gql_Artist = {
  __typename?: 'Artist';
  id: Scalars['String'];
  images?: Maybe<Array<Maybe<gql_Image>>>;
  name: Scalars['String'];
};

export type gql_Image = {
  __typename?: 'Image';
  height?: Maybe<Scalars['Int']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type gql_Playlist = {
  __typename?: 'Playlist';
  id: Scalars['String'];
  images?: Maybe<Array<Maybe<gql_Image>>>;
  name: Scalars['String'];
  tracks?: Maybe<Array<Maybe<gql_PlaylistTrack>>>;
};

export type gql_PlaylistTrack = {
  __typename?: 'PlaylistTrack';
  added_at: Scalars['String'];
  name: Scalars['String'];
  track: gql_Track;
};

export type gql_Query = {
  __typename?: 'Query';
  noop?: Maybe<Scalars['Int']>;
  playlist: gql_Playlist;
};

export type gql_Track = {
  __typename?: 'Track';
  album?: Maybe<gql_Album>;
  artists?: Maybe<Array<Maybe<gql_Artist>>>;
  duration_ms: Scalars['Float'];
  href: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  popularity?: Maybe<Scalars['Int']>;
  preview_url?: Maybe<Scalars['String']>;
};

export type gql_GetPlaylistQueryVariables = Exact<{ [key: string]: never; }>;


export type gql_GetPlaylistQuery = { __typename?: 'Query', playlist: { __typename?: 'Playlist', id: string, name: string, images?: Array<{ __typename?: 'Image', url: string } | null> | null, tracks?: Array<{ __typename?: 'PlaylistTrack', added_at: string, track: { __typename?: 'Track', preview_url?: string | null, id: string, name: string, duration_ms: number, artists?: Array<{ __typename?: 'Artist', name: string } | null> | null, album?: { __typename?: 'Album', name: string, images?: Array<{ __typename?: 'Image', url: string } | null> | null } | null } } | null> | null } };


export const GetPlaylistDocument = gql`
    query getPlaylist {
  playlist {
    id
    name
    images {
      url
    }
    tracks {
      added_at
      track {
        preview_url
        id
        name
        duration_ms
        artists {
          name
        }
        album {
          name
          images {
            url
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetPlaylistQuery__
 *
 * To run a query within a React component, call `useGetPlaylistQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaylistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaylistQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlaylistQuery(baseOptions?: Apollo.QueryHookOptions<gql_GetPlaylistQuery, gql_GetPlaylistQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<gql_GetPlaylistQuery, gql_GetPlaylistQueryVariables>(GetPlaylistDocument, options);
}
export function useGetPlaylistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<gql_GetPlaylistQuery, gql_GetPlaylistQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<gql_GetPlaylistQuery, gql_GetPlaylistQueryVariables>(GetPlaylistDocument, options);
}
export type GetPlaylistQueryHookResult = ReturnType<typeof useGetPlaylistQuery>;
export type GetPlaylistLazyQueryHookResult = ReturnType<typeof useGetPlaylistLazyQuery>;
export type GetPlaylistQueryResult = Apollo.QueryResult<gql_GetPlaylistQuery, gql_GetPlaylistQueryVariables>;
