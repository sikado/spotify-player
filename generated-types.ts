import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Album = {
  __typename?: 'Album';
  id: Scalars['String'];
  images?: Maybe<Array<Maybe<Image>>>;
  name: Scalars['String'];
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['String'];
  images?: Maybe<Array<Maybe<Image>>>;
  name: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  height?: Maybe<Scalars['Int']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type Playlist = {
  __typename?: 'Playlist';
  id: Scalars['String'];
  images?: Maybe<Array<Maybe<Image>>>;
  name: Scalars['String'];
  tracks?: Maybe<Array<Maybe<PlaylistTrack>>>;
};

export type PlaylistTrack = {
  __typename?: 'PlaylistTrack';
  added_at: Scalars['String'];
  name: Scalars['String'];
  track: Track;
};

export type Query = {
  __typename?: 'Query';
  noop?: Maybe<Scalars['Int']>;
  playlist: Playlist;
};

export type Track = {
  __typename?: 'Track';
  album?: Maybe<Album>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  duration_ms: Scalars['Float'];
  href: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  popularity?: Maybe<Scalars['Int']>;
  preview_url?: Maybe<Scalars['String']>;
};
