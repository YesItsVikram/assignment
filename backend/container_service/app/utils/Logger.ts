// Can add logging libraries or transport log to file/db

export const logger = {
  info: (message: any, ...params: any[]) => {
    console.log(message, ...params);
  },

  error: (message: any, ...params: any[]) => {
    console.error(message, ...params);
  },

  debug: (message: any, ...params: any[]) => {
    console.debug(message, ...params);
  },
};
