export const getLocalStorageItem = async (item_key) => {
    return new Promise((resolve, reject) => {
      try {
        const local_storage_item = JSON.parse(localStorage.getItem(item_key)) || [];
        resolve(local_storage_item);
      } catch (error) {
        reject(error);
      }
    });
  };