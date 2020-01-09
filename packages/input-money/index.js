import ElInputMoney from './src/input-money';

/* istanbul ignore next */
ElInputMoney.install = function(Vue) {
  Vue.component(ElInputMoney.name, ElInputMoney);
};

export default ElInputMoney;
