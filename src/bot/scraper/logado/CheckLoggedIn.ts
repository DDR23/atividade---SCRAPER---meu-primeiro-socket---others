import { Store } from "../utils/Store";
import { timeout } from "../utils/Timeout";


export async function checkLoggedIn(store: Store) {
  await timeout(10000);

  const page = store.data.page;
  const loggedIn = await page.$(".hm-SiteSearchIconLoggedIn");

  console.log(loggedIn !== null);

  return loggedIn !== null;
}
