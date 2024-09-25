import { MakeLogin } from "../MakeLogin";
import { ConfigBrowser } from "./ConfigBrowser";
import { pararApostas } from "./PararAposta";
import { Store } from "./Store";


export async function BaseReLogin(store: Store) {
  try {
    const browser = store.data.browser;

    browser?.close();

    const _browser = await ConfigBrowser();

    store.update({
      browser: _browser,
    });

    const { myBet, page } = await MakeLogin(store);

    store.update({ page, myBet });
  } catch (error) {
    console.log(error);
    pararApostas(store, true);
  }
}
