interface StoreData {
  [key: string]: any;
}

export class Store {
  data: StoreData;

  constructor(initialState: StoreData = {}) {
    this.data = initialState;
  }

  update(newData: StoreData): void {
    this.data = { ...this.data, ...newData };
  }
}
