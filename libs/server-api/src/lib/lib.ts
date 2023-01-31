import SpotifyWebApi from 'spotify-web-api-node';

export default async function getSpotifyApi() {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  const tokenData = await spotifyApi.clientCredentialsGrant();
  // eslint-disable-next-line no-console
  console.debug(`token retrived. Expiring in ${tokenData.body.expires_in}`);
  spotifyApi.setAccessToken(tokenData.body.access_token);
  return spotifyApi;
}
