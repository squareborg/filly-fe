import Vue from 'vue'
import VModal from 'vue-js-modal'
// import PageHeader from '@/components/Page/PageHeader';
// import SubmitButton from '@/components/Forms/SubmitButton'
// import TabList from '@/components/Elements/TabList';
import Validation from '@/components/Forms/Validation'

Vue.use(VModal);
// Vue.component('PageHeader', PageHeader);
// Vue.component('SubmitButton', SubmitButton);
// Vue.component('TabList', TabList);
Vue.component('Validation', Validation);

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});
