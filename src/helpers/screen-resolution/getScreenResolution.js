export const getScreenResolution = async () => {
    return new Promise((resolve, reject) => {
      try {
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        resolve({ width: screenWidth, height: screenHeight });
      } catch (error) {
        reject(error);
      }
    });
  };
  
