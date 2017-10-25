export default {
  state: {
    filter: {
      duration: 10,
      account: null,
      calendar: {
        show: false,
        range: true,
        value: [],
        zero: true,
        left: 0,
        top: 0
      },
      date: {
        first: 1,
        second: 2
      }
    }
  },

  getters: {
    getFilter(state) {
      return state.filter
    }
  },

  mutations: {
    closeFilterCalendar(state) {
      state.filter.calendar.show = false
    },
    setFilterAccount(state, account) {
      state.filter.account = account
    },
    setFilterCalendar(state, calendar) {
      if (calendar) {
        state.filter.calendar.show = calendar.show

        if (calendar.value) {
          if (calendar.value.length === 2) {
            state.filter.calendar.value = calendar.value
          }
          if (calendar.value === 'all') {
            state.filter.calendar.value = []
          }
        }
        if (calendar.left) {
          state.filter.calendar.left = calendar.left
        }
        if (calendar.top) {
          state.filter.calendar.top = calendar.top
        }
      }
    },
    setFilterDate(state, dates) {
      if (dates) {
        if (dates.first) state.filter.date.first = dates.first
        if (dates.second) state.filter.date.second = dates.second
      }
    },
    setDuration(state, duration) {
      state.filter.duration = +duration
    }
  }
}
