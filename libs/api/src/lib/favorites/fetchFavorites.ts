import localforage from "localforage";

const FAVORITES_IDS_KEY = "favIds"

export async function saveFavoritesIds(favoritesIds: string[]) {

  try {
    await localforage.setItem(FAVORITES_IDS_KEY, favoritesIds)
  } catch (err) {
    console.error(err)
    throw new Error('Unable to set data in localstorage!')
  }

}

export async function fetchFavoritesIds(): Promise<string[]> {
  let data: unknown;

  try {

    data = await localforage.getItem(FAVORITES_IDS_KEY);

    if (Array.isArray(data) && data.every(item => typeof item === 'string')) {
      return data as string[];
    } else {
      // If the item doesn't exists in the storage or is malformed, we init the item
      await saveFavoritesIds([]);
      return [] as string[]
    }
  } catch (err) {
    console.error(err)
    throw new Error('Unable to get localstorage data!')
  }
}
