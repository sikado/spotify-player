import { useQuery } from '@apollo/client';
import DataGrid from '../../molecules/DataGrid/data-grid';
import { GetPlaylistDocument } from '@/generated-types';

/* eslint-disable-next-line */
export interface FetchPlaylistProps {}

export function FetchPlaylist() {
  const { data, loading, error } = useQuery(GetPlaylistDocument);

  console.log(data, loading, error);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  console.log(data);

  if (!data) {
    return null;
  }

  const tracks = data.playlist?.tracks ?? [];

  return <DataGrid tracks={tracks} />;
}

export default FetchPlaylist;
