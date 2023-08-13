type ItemStorage = {
  key: string;
  value: string | object | null;
};

const getStorage = (keys: string[]) => {
  let storageArray = [];
  for (let index = 0; index < keys.length; index++) {
    if (localStorage.getItem(keys[index]) === null) storageArray.push(null);
    else storageArray.push(parsedStorage(localStorage.getItem(keys[index])));
  }
  return storageArray;
};

const checkIsString = (str: string) => {
  const isString = !str.split('')[0].includes('{');
  return isString;
};

const parsedStorage = (item: any) => {
  return checkIsString(item) ? item : JSON.parse(item);
};

const removeStorage = (items: string[]) => {
  for (let index = 0; index < items.length; index++) {
    localStorage.removeItem(items[index]);
  }
};

const setStorage = (items: ItemStorage[]) => {
  for (let index = 0; index < items.length; index++) {
    typeof items[index].value === 'object'
      ? localStorage.setItem(
          items[index].key,
          JSON.stringify(items[index].value)
        )
      : localStorage.setItem(items[index].key, items[index].value as string);
  }
};

export { getStorage, removeStorage, setStorage };
