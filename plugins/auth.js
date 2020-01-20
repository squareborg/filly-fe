export default function ({ app }) {
  if (app.$auth.user) {
    app.store.dispatch('notifications/subscribe');
  }
}
