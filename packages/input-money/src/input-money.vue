<template>
  <div
    @dragstart.prevent
    :class="[
      'el-input-number',
      inputNumberSize ? 'el-input-number--' + inputNumberSize : '',
      { 'is-disabled': inputNumberDisabled },
      { 'is-without-controls': !controls },
      { 'is-controls-right': controlsAtRight }
    ]">
    <NumericInput type="money" :layout="PasswordLayout" :placeholder="placeholder" :disabled="inputNumberDisabled"
                  v-model="displayValue" entertext="Confirm" format="^-?\d+(,\d{3})*(\.\d{0,2})?$" :maxlength="maxlength"
                  @onFocus="updateFocuse" @blur="handleBlur" @input="handleInput"/>
    <!-- 后置内容 -->
    <span class="el-input__suffix">
      <span class="el-input__suffix-inner">
        <template>
          <slot name="suffix"></slot>
          <i class="el-input__icon" v-if="suffixIcon" :class="suffixIcon"></i>
        </template>
        <i :style="{visibility: showClear ? 'visible' : 'hidden'}"
           class="el-input__icon el-icon-error el-input__clear" @mousedown.prevent @click="clear"></i>
      </span>
    </span>
    <i :class="validateBorder"></i>
  </div>
</template>
<script>
  /* eslint-disable no-debugger */

  import emitter from 'overseas-vue/src/mixins/emitter';
  import Focus from 'overseas-vue/src/mixins/focus';
  import RepeatClick from 'overseas-vue/src/directives/repeat-click';

  import { NumericInput, Keys } from 'overseas-numeric-keyboard/dist/numeric_keyboard.vue.js';

  const PasswordLayout = [
    [
      {
        key: Keys.ONE
      },
      {
        key: Keys.TWO
      },
      {
        key: Keys.THREE
      }
    ],
    [
      {
        key: Keys.FOUR
      },
      {
        key: Keys.FIVE
      },
      {
        key: Keys.SIX
      }
    ],
    [
      {
        key: Keys.SEVEN
      },
      {
        key: Keys.EIGHT
      },
      {
        key: Keys.NINE
      }
    ],
    [
      {
        key: Keys.DOT
      },
      {
        key: Keys.ZERO
      },
      {
        key: Keys.DEL
      }
    ]
  ];

  export default {
    name: 'ElInputMoney',
    mixins: [Focus('input'), emitter],
    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },
    directives: {
      repeatClick: RepeatClick
    },
    components: {
      NumericInput
    },
    props: {
      step: {
        type: Number,
        default: 1
      },
      stepStrictly: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: Number,
        default: Infinity
      },
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: -Infinity
      },
      clearable: {
        type: Boolean,
        default: false
      },
      value: {},
      suffixIcon: String,
      disabled: Boolean,
      size: String,
      controls: {
        type: Boolean,
        default: true
      },
      controlsPosition: {
        type: String,
        default: ''
      },
      validateEvent: {
        type: Boolean,
        default: true
      },
      name: String,
      label: String,
      placeholder: String,
      precision: {
        type: Number,
        validator(val) {
          return val >= 0 && val === parseInt(val, 10);
        }
      }
    },
    data() {
      return {
        PasswordLayout,
        currentValue: 0,
        userInput: null,
        focused: false
      };
    },
    watch: {
      value: {
        immediate: true,
        handler(value) {
          let newVal = value === undefined ? value : Number(value);
          if (newVal !== undefined) {
            if (isNaN(newVal)) {
              return;
            }

            if (this.stepStrictly) {
              const stepPrecision = this.getPrecision(this.step);
              const precisionFactor = Math.pow(10, stepPrecision);
              newVal = Math.round(newVal / this.step) * precisionFactor * this.step / precisionFactor;
            }

            if (this.precision !== undefined) {
              newVal = this.toPrecision(newVal, this.precision);
            }
          }
          if (newVal >= this.max) newVal = this.max;
          if (newVal <= this.min) newVal = this.min;
          this.currentValue = newVal;
          this.userInput = null;
          this.$emit('input', newVal);
        }
      }
    },
    computed: {
      minDisabled() {
        return this._decrease(this.value, this.step) < this.min;
      },
      maxDisabled() {
        return this._increase(this.value, this.step) > this.max;
      },
      numPrecision() {
        const { value, step, getPrecision, precision } = this;
        const stepPrecision = getPrecision(step);
        if (precision !== undefined) {
          if (stepPrecision > precision) {
            console.warn('[Element Warn][InputNumber]precision should not be less than the decimal places of step');
          }
          return precision;
        } else {
          return Math.max(getPrecision(value), stepPrecision);
        }
      },
      controlsAtRight() {
        return this.controls && this.controlsPosition === 'right';
      },
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      inputNumberSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      inputNumberDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      },
      nativeInputValue() {
        const regExp = /^-?\d+(,\d{3})*(\.\d{0,2})?$/;
        return this.value === null || this.value === undefined ? '' : regExp.test(this.value);
      },
      showClear() {
        return this.clearable && this.nativeInputValue && this.focused;
      },
      validateState() {
        return this.elFormItem ? this.elFormItem.validateState : '';
      },
      validateIcon() {
        return {
          validating: 'el-icon-loading',
          success: 'el-icon-success',
          error: 'el-icon-circle-close'
        }[this.validateState];
      },
      validateBorder() {
        if (this.focused) {
          return 'el-input-border-focus';
        } else {
          return this.validateState === 'error' ? 'el-input-border-error' : 'el-input-border-none';
        }
      },
      displayValue: {
        get: function() {
          if (this.userInput !== null) {
            return this.userInput;
          }

          let currentValue = this.currentValue;

          if (typeof currentValue === 'number') {
            if (this.stepStrictly) {
              const stepPrecision = this.getPrecision(this.step);
              const precisionFactor = Math.pow(10, stepPrecision);
              currentValue = Math.round(currentValue / this.step) * precisionFactor * this.step / precisionFactor;
            }

            if (this.precision !== undefined) {
              currentValue = currentValue.toFixed(this.precision);
            }
          }

          if (currentValue === 0) {
            return '';
          } else {
            return currentValue;
          }
        },
        set: function(newValue) {
          this.currentValue = newValue;
          this.$emit('input', this.currentValue);
        }
      }
    },
    methods: {
      toPrecision(num, precision) {
        if (precision === undefined) precision = this.numPrecision;
        return parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision));
      },
      getPrecision(value) {
        if (value === undefined) return 0;
        const valueString = value.toString();
        const dotPosition = valueString.indexOf('.');
        let precision = 0;
        if (dotPosition !== -1) {
          precision = valueString.length - dotPosition - 1;
        }
        return precision;
      },
      _increase(val, step) {
        console.log('_increase :' + val);
        if (typeof val !== 'number' && val !== undefined) return this.currentValue;

        const precisionFactor = Math.pow(10, this.numPrecision);
        // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
        return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
      },
      _decrease(val, step) {
        console.log('_decrease :' + val);
        if (typeof val !== 'number' && val !== undefined) return this.currentValue;

        const precisionFactor = Math.pow(10, this.numPrecision);

        return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
      },
      increase() {
        if (this.inputNumberDisabled || this.maxDisabled) return;
        const value = this.value || 0;
        const newVal = this._increase(value, this.step);
        this.setCurrentValue(newVal);
      },
      decrease() {
        if (this.inputNumberDisabled || this.minDisabled) return;
        const value = this.value || 0;
        const newVal = this._decrease(value, this.step);
        this.setCurrentValue(newVal);
      },
      handleBlur(event) {
        this.$emit('blur', event);
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.blur', [this.value]);
        }
        setTimeout(() => {
          this.focused = false;
        }, 100);
      },
      // handleFocus(event) {
      //   this.$emit('focus', event);
      // },
      setCurrentValue(newVal) {
        console.log('new value:' + newVal);
        const oldVal = this.currentValue;
        if (typeof newVal === 'number' && this.precision !== undefined) {
          newVal = this.toPrecision(newVal, this.precision);
        }
        if (newVal >= this.max) newVal = this.max;
        if (newVal <= this.min) newVal = this.min;
        if (oldVal === newVal) return;
        this.userInput = null;
        this.$emit('input', newVal);
        this.$emit('change', newVal, oldVal);
        this.currentValue = newVal;
      },
      handleInput(value) {
        this.userInput = value;
      },
      handleInputChange(value) {
        const newVal = value === '' ? undefined : Number(value);
        if (!isNaN(newVal) || value === '') {
          this.setCurrentValue(newVal);
        }
        this.userInput = null;
      },
      clear() {
        this.$emit('input', '');
        this.$emit('change', '');
        this.$emit('clear');
      },
      updateFocuse(flag) {
        setTimeout(() => {
          this.focused = flag;
          this.$emit('focus', flag);
        }, 100);
      }
    },
    mounted() {
      if (!this.$refs || !this.$refs.input) return;
      let innerInput = this.$refs.input.$refs.input;
      innerInput.setAttribute('role', 'spinbutton');
      innerInput.setAttribute('aria-valuemax', this.max);
      innerInput.setAttribute('aria-valuemin', this.min);
      innerInput.setAttribute('aria-valuenow', this.currentValue);
      innerInput.setAttribute('aria-disabled', this.inputNumberDisabled);
    },
    updated() {
      if (!this.$refs || !this.$refs.input) return;
      const innerInput = this.$refs.input.$refs.input;
      innerInput.setAttribute('aria-valuenow', this.currentValue);
    }
  };
</script>
