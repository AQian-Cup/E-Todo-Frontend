import originalKy, { HTTPError } from 'ky';
import router from '@/router';

const ky = originalKy.extend({
  prefixUrl: import.meta.env.VITE_PREFIX_URL,
  timeout: 6000,
  hooks: {
    beforeRequest: [
      (req) => {
        const token = localStorage.getItem('token');
        if (token) {
          req.headers.set('Authorization', token);
        }
      },
    ],
    afterResponse: [
      async (_req, _options, res) => {
        if (res.ok) {
          const clonedRes = res.clone();
          const data = await clonedRes.json();
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
        } else {
          switch (res.status) {
            case 401:
              router.push('/auth');
              break;
            default:
              break;
          }
        }
        return res;
      },
    ],
  },
});

export default ky;

export { HTTPError };
