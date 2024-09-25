import { Store } from "./Store";

export async function pararApostas(store: Store, put = true) {
  const { browser, config } = store.data;
  try {
    // TODO - ENVIAR EVENTO QUE MUDA STATUS DA CONFIG
    // if (put) socket.emit("bot__stop", store.data.config);
    // await $axios.put(`/configs/${config.id}`, {
    //   isRunning: false,
    // });

    if (!browser) return;

    await browser.close();
  } catch (error) {
    console.log(error);
  }
}
