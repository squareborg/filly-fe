import auth from '~/api/auth'
import affiliates from '~/api/affiliates'
import user from '~/api/user'
import merchants from '~/api/merchants'
import programs from '~/api/programs'


export default (ctx, inject) => {
  const api = {
    auth: auth(ctx.$axios),
    affiliates: affiliates(ctx.$axios),
    user: user(ctx.$axios),
    merchants: merchants(ctx.$axios),
    programs: programs(ctx.$axios),
  };

  inject('api', api);
}
