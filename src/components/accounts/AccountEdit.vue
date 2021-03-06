<template lang="pug">
.sidebar._active
  .sidebar__overlay(
    @click="closeBar()"
  )

  .sidebar__block
    .sidebar__close(@click="closeBar()")
      .sidebar__close-title Edit wallet
      .sidebar__close-icon: .mdi.mdi-plus

    .sidebar__in._inside
      .form
        .input
          input.input__field(
            v-model="values.name"
            v-focus.lazy="true && !$store.state.isMobile",
            name="name"
            type="text"
            placeholder="Write account name"
          )
          .input__label Name
        .input
          label.checkbox
            input.checkbox__value(
              v-model="values.countTotal"
              type="checkbox"
              name="countTotal"
            )
            .checkbox__text Count in total

        .input
          input.input__field(
            v-model="values.currency" type="text" placeholder="Write currency" name="currency")
          .input__label currency
        .input
          input.input__field(
            v-model="values.order" type="number" placeholder="Order" name="order")
          .input__label order

        CategoryColor(v-on:setColor="setColor")
        .trnForm__actions__btn.mb20(@click.prevent="onSubmit") Edit
</template>

<script>
import { mixin } from 'vue-focus'
import { mapGetters } from 'vuex'
import CategoryColor from '../categories/CategoryColor.vue'

const defaultColor = '#242424'

export default {
  mixins: [mixin],
  components: { CategoryColor },

  data() {
    return {
      values: {
        ...this.$store.state.accounts.editAccount
      }
    }
  },

  watch: {
    $editedAccount() {
      this.values = {
        ...this.$store.state.accounts.editAccount
      }
    }
  },

  computed: {
    ...mapGetters(['accounts']),
    $editedAccount() {
      return this.$store.state.accounts.editAccount
    }
  },

  methods: {
    async onSubmit() {
      const formatedValues = {
        id: this.values.id,
        name: this.values.name.trim(),
        countTotal: this.values.countTotal ? 1 : 0,
        currency: this.values.currency ? this.values.currency : 'RUB',
        order: this.values.order ? this.values.order : 100,
        color: this.values.color || defaultColor
      }

      if (!formatedValues.name) {
        this.$notify({
          group: 'foo',
          title: 'Error',
          text: 'Please write account name.',
          type: 'error'
        })
        return
      }

      const sameAccount = this.$store.state.accounts.all
        .filter(account =>
          account.name === formatedValues.name &&
          account.countTotal === formatedValues.countTotal &&
          account.currency === formatedValues.currency &&
          account.order === formatedValues.order &&
          account.color === formatedValues.color)

      if (sameAccount.length) {
        this.$notify({
          group: 'foo',
          title: 'Error',
          text: 'Same account name is already exist.',
          type: 'error'
        })
        return
      }

      this.$store.commit('showLoader')
      await this.$store.dispatch('updateAccount', formatedValues)
      this.$store.commit('toogleAccountEdit', 'hide')
      this.$store.commit('setEditAccount', null)
      this.$store.commit('closeLoader')
      this.$notify({
        group: 'foo',
        title: 'Succesed',
        text: 'Account was edited.',
        type: 'success'
      })
    },
    setColor(color) {
      this.values.color = color
    },
    closeBar() {
      this.$store.commit('toogleAccountEdit', 'hide')
      this.$store.commit('setEditAccount', null)
    }
  }
}
</script>
