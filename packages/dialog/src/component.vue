<template>
  <div v-show="showDialog" class="mask" @touchmove.stop.prevent>
    <div :style="currentStyle" class="dialog-wrapper" ref="dialogWraper">
      <div class="title" :style="`height: ${titlePosition}rem`">
        <slot name="title" /></div>
      <div class="content" :style="`font-size: ${fontSize}rem`">
        <slot name="content" /></div>
      <div class="btn-container">
        <div class="cancel" @click="$emit('cancle')" v-if="showCancle">
          <slot name="cancle">Cancel</slot></div>
        <div :class="{shouldPlain: confirmBtnPlain}" class="confirm" @click="closeDialog">
          <slot name="confirm">Yes</slot></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Popup from 'overseas-vue/src/utils/popup';
  import Migrating from 'overseas-vue/src/mixins/migrating';
  import emitter from 'overseas-vue/src/mixins/emitter';

  export default {
    name: 'ElDialog',

    mixins: [Popup, emitter, Migrating],

    props: {
      position: {
        type: String,
        default: '0'
      },
      titlePosition: {
        type: Number,
        default: 0.6
      },
      fontSize: {
        type: Number,
        default: 0.36
      },
      showCancle: {
        type: Boolean,
        default: false
      },
      confirmBtnPlain: {
        type: Boolean,
        default: false
      },
      isPromotion: {
        type: Boolean,
        default: false
      },
      scrollY: {
        type: Number,
        default: 0
      },
      title: {
        type: String,
        default: ''
      },

      modal: {
        type: Boolean,
        default: true
      },

      modalAppendToBody: {
        type: Boolean,
        default: true
      },

      appendToBody: {
        type: Boolean,
        default: false
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      closeOnClickModal: {
        type: Boolean,
        default: true
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      },

      width: String,

      fullscreen: Boolean,

      customClass: {
        type: String,
        default: ''
      },

      top: {
        type: String,
        default: '60%'
      },
      beforeClose: Function,
      center: {
        type: Boolean,
        default: false
      },

      destroyOnClose: Boolean
    },

    data() {
      return {
        closed: false,
        key: 0,
        showDialog: true
      };
    },

    watch: {
      visible(val) {
        if (val) {
          this.closed = false;
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
          });
          if (this.appendToBody) {
            document.body.appendChild(this.$el);
          }
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          if (!this.closed) this.$emit('close');
          if (this.destroyOnClose) {
            this.$nextTick(() => {
              this.key++;
            });
          }
        }
      }
    },

    computed: {
      style() {
        let style = {};
        if (!this.fullscreen) {
          style.marginTop = this.top;
          if (this.width) {
            style.width = this.width;
          }
        }
        return style;
      },
      currentStyle() {
        if (this.isPromotion) {
          return {
            'margin-top': `${this.position}px`,
            top: `calc(50vh + ${this.scrollY}px)`
          };
        } else {
          return {
            'margin-top': `${this.position}px`,
            top: '50%'
          };
        }
      }
    },
    created() {
      this.$nextTick(() => {
        const dialog = this.$refs.dialogWraper;
        setTimeout(() => {
          dialog.style.opacity = 1;
          dialog.style.transform = 'translateY(-50%) translateX(-50%)  scale(1)';
        }, 50);
      });
    },
    methods: {
      getMigratingConfig() {
        return {
          props: {
            'size': 'size is removed.'
          }
        };
      },
      handleWrapperClick() {
        if (!this.closeOnClickModal) return;
        this.handleClose();
      },
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
          this.$emit('close');
          this.closed = true;
        }
      },
      updatePopper() {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.broadcast('ElDropdownMenu', 'updatePopper');
      },
      afterEnter() {
        this.$emit('opened');
      },
      afterLeave() {
        this.$emit('closed');
      },
      closeDialog() {
        this.$emit('closeDialog');
      }
    },

    mounted() {
      if (this.visible) {
        this.rendered = true;
        this.open();
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
    },

    destroyed() {
      // if appendToBody is true, remove DOM node after destroy
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>
