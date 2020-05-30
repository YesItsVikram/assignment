export const PORT = process.env.PORT || 8080;

export const DatabaseConstants = {
  ContainersDb: {
    URI: '' + process.env.CONTAINERS_DB_URI,
    Collections: {
      CONTAINERS: 'containers',
      METAS: 'metas',
    },
  },
};
