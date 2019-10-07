module.exports = {
  defaultToEmpty(data) {
    return data || [];
  },

  mapData(res) {
    return (res || {}).data;
  },
};
