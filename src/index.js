/* Automatically generated by './build/bin/build-entry.js' */

import Dialog from '../packages/dialog/index.js';
import Input from '../packages/input/index.js';
import InputNumber from '../packages/input-number/index.js';
import InputMoney from '../packages/input-money/index.js';
import Radio from '../packages/radio/index.js';
import Checkbox from '../packages/checkbox/index.js';
import Button from '../packages/button/index.js';
import Form from '../packages/form/index.js';
import FormItem from '../packages/form-item/index.js';
import Alert from '../packages/alert/index.js';
import Card from '../packages/card/index.js';
import Image from '../packages/image/index.js';
import Avatar from '../packages/avatar/index.js';
import Drawer from '../packages/drawer/index.js';
import Icon from '../packages/icon/index.js';
// import locale from 'overseas-vue/src/locale';
import CollapseTransition from 'overseas-vue/src/transitions/collapse-transition';

const components = [
  Dialog,
  Input,
  InputNumber,
  InputMoney,
  Radio,
  Checkbox,
  Button,
  Form,
  FormItem,
  Alert,
  Card,
  Image,
  Avatar,
  Drawer,
  Icon,
  CollapseTransition
];

const install = function(Vue, opts = {}) {
  // locale.use(opts.locale);
  // locale.i18n(opts.i18n);

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  // Vue.use(InfiniteScroll);
  // Vue.use(Loading.directive);

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };

  // Vue.prototype.$loading = Loading.service;
  // Vue.prototype.$msgbox = MessageBox;
  // Vue.prototype.$alert = MessageBox.alert;
  // Vue.prototype.$confirm = MessageBox.confirm;
  // Vue.prototype.$prompt = MessageBox.prompt;
  // Vue.prototype.$notify = Notification;
  // Vue.prototype.$message = Message;

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.1.4',
  // locale: locale.use,
  // i18n: locale.i18n,
  install,
  // CollapseTransition,
  // Loading,
  Dialog,
  Input,
  InputNumber,
  InputMoney,
  Radio,
  Checkbox,
  Button,
  Form,
  FormItem,
  Alert,
  Card,
  Image,
  Avatar,
  Drawer,
  Icon
};
