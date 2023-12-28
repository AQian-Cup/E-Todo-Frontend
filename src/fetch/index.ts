import originalKy from 'ky';
const ky = originalKy.extend({
  prefixUrl: import.meta.env.VITE_PREFIX_URL,
  timeout: 6000,
  hooks: {
    afterResponse: [],
  },
});

export default ky;
