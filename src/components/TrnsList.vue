<template lang="pug">
.trnsList
  template(v-if="view === 'small'")
    TrnItem(
      v-for="trn in trns",
      :trn="trn",
      :key="trn.id",
      view="small"
    )

  template(v-else)
    .trnsList__item(v-for="(trns, date) of trnGroupedByDates")
      .trnsList__title {{ date | date }}
      div
        TrnItem(
          v-for="trn in trns",
          :trn="trn",
          :key="trn.id")
</template>


<script>
import groupBy from 'lodash/groupBy'
import moment from 'moment'
import TrnItem from './TrnItem.vue'

export default {
  components: { TrnItem },

  props: {
    trns: {
      type: Array,
      required: true
    },
    view: {
      type: String,
      required: false
    }
  },

  computed: {
    trnGroupedByDates() {
      return groupBy(this.trns, trn => moment(trn.date).format('D.MM.YY'))
    }
  }
}
</script>
