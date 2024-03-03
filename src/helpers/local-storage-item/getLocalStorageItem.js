export const getLocalStorageItem = async (item_key) => {
    return new Promise((resolve, reject) => {
      try {
        const local_storage_item = JSON.parse(localStorage.getItem(item_key)) || [];
        console.log("local_storage_item: ", local_storage_item);
        resolve(local_storage_item);
      } catch (error) {
        reject(error);
      }
    });
  };