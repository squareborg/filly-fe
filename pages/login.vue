<template>
  <div class="flex bg-brand-green-light">
    <main class="w-full lg:w-1/2 xl:w-1/3 h-full flex items-start sm:items-center justify-center">
      <form class="auth" autocomplete="false" @submit.prevent="submit">
        <div class="text-center my-12">
          <img width src="http://api.filly.test/images/logo.png" class="px-6 py-6 logo mx-auto" />
        </div>

        <p class="text-lg text-center mb-3">Log in to your account</p>

        <div class="mb-1">
          <input
            type="email"
            class="auth__input"
            placeholder="Email address"
            v-model="email"
            required
            autofocus
          />
          <validation :errors="errors" name="email"></validation>
        </div>

        <div class="mb-3">
          <input
            type="password"
            class="auth__input"
            placeholder="Password"
            v-model="password"
            required
          />
          <validation :errors="errors" name="password"></validation>
        </div>

        <div class="flex mx-1">
          <div class="w-1/2">
            <nuxt-link class to="/forgot">Forgot Password?</nuxt-link>
          </div>
        </div>

        <div class="my-12">
          <button type="submit" class="btn btn-secondary btn--submit rounded" :disabled="busy">
            <span v-if="!busy">Log in</span>
            <span v-if="busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
          </button>
        </div>
        <p class>
          Don't have an account?
          <nuxt-link to="/register">Create account</nuxt-link>
        </p>
      </form>
    </main>
    <aside class="lg:w-1/2 xl:w-2/3 h-full bg-auth"></aside>
  </div>
</template>
<script>
import { ResponseCodes } from "@/plugins/responseCodes";

const LOGIN_STATE = {
  INIT: 0,
  IN_FLIGHT: 1,
  FAILED_LOGIN: 2,
  GENERAL_ERROR: 3
};
export default {
  layout: "login",
  data() {
    return {
      errors: [],
      email: "",
      password: "",
      busy: false
    };
  },
  methods: {
    async submit() {
      try {
        this.loginState = LOGIN_STATE.IN_FLIGHT;
        this.busy = true;

        await this.$auth
          .loginWith("local", {
            data: { email: this.email, password: this.password }
          })
          .then(() => {
            this.$nuxt.$emit("login");
            console.log(this.$auth.user);

            if (
              this.$auth.user.hasOwnProperty("has_onboarded") &&
              !this.$auth.user.has_onboarded
            ) {
              return this.$router.push("onboarding/welcome");
            }

            this.$toast.show(`Welcome back ${this.$auth.user.first_name}`);

            return this.$router.push("/");
          })
          .finally(() => {
            this.busy = false;
          });
      } catch (e) {
        if (e.response === undefined) {
          // hmm no response from the server :(
          this.loginState = LOGIN_STATE.GENERAL_ERROR;
          return this.$toast.error(this.errorMessageText);
        }

        // seems like auth module will give us a undefined response back with some errors
        if (e.response.status === ResponseCodes.HTTP_UNAUTHORIZED) {
          this.loginState = LOGIN_STATE.FAILED_LOGIN;
          return this.$toast.error(this.errorMessageText);
        }

        // not a wrong username or password error
        if (e.response.data.hasOwnProperty("message")) {
          this.loginState = LOGIN_STATE.GENERAL_ERROR;
        } else {
          // we got an error from the server but there was no message key
          this.loginState = LOGIN_STATE.GENERAL_ERROR;
          return this.$toast.error(this.errorMessageText);
        }
      }
    }
  }
};
</script>
