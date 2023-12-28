import originalKy from 'ky';
export const ky = originalKy.extend({
  timeout: 6000,
  hooks: {
    afterResponse: [],
  },
});
