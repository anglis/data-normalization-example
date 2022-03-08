import { configureStore, createSlice } from '@reduxjs/toolkit'
import { randEmail, randFullName, randUuid } from '@ngneat/falso';

const maxData = 10
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const data = Array.from(Array(maxData).keys())
.map(() => ({
  id: randUuid(),
  email: randEmail(),
  name: randFullName(),
  lastActive: (Math.random() * 1e6).toFixed(0),
}))

export const optimizedDataSlice = createSlice({
  name: 'optimizedData',
  initialState: {
    data,
    normalizedData: data.reduce((acc, ele) => {
      return {
        ...acc,
        [ele.id]: ele
      }
    }, {}) ,
    keys: data.map(row => row.id),
    time: new Date().valueOf()
  },
  reducers: {
    updateData(state) {
      const indexes = Object.keys(state.normalizedData)
      const updatedRowIndex = getRandomInt(0, maxData -1)
      const key = indexes[updatedRowIndex]
      
      state.normalizedData[key].lastActive = (Math.random() * 1e6).toFixed(0)
    },
    updateTime(state) {
      state.time = new Date().valueOf()
    }
  }
})

export const unoptimizedDataSlice = createSlice({
  name: 'data',
  initialState: Array.from(Array(maxData).keys())
    .map(() => ({
      id: randUuid(),
      email: randEmail(),
      name: randFullName(),
      lastActive: (Math.random() * 1e6).toFixed(0),
    })),
  reducers: {
    updateData(state) {
      const updatedRowIndex = getRandomInt(0, maxData - 1)
      return state.map((row, index) => {
        if (index === updatedRowIndex) {
          return {
            ...row,
            lastActive: (Math.random() * 1e6).toFixed(0),
          }
        }

        return row
      })
    }
  }
})

export const store = configureStore({
  reducer: {
    unoptimizedData: unoptimizedDataSlice.reducer,
    optimizedData: optimizedDataSlice.reducer,
  },
})