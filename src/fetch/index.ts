import originalKy from 'ky';
const ky = originalKy.extend({
  timeout: 6000,
  hooks: {
    afterResponse: [],
  },
});

export default ky;
