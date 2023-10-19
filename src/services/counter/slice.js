import {
  createSlice,
  createEntityAdapter,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";

const counterEntity = createEntityAdapter();

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counters: counterEntity.getInitialState(),
  },
  reducers: {
    addCounter(state, { payload: { initialValue } }) {
      counterEntity.addOne(state.counters, {
        value: initialValue,
        id: nanoid(),
      });
    },
    removeCounter(state, { payload }) {
      counterEntity.removeOne(state.counters, payload);
    },
    updateValue(state, action) {
      counterEntity.upsertOne(state.counters, action);
    },
    updateBy(state, { payload: { id, delta } }) {
      const previousValue = state.counters.entities[id]?.value;

      if (typeof previousValue === "number") {
        counterEntity.updateOne(state.counters, {
          id,
          changes: { value: delta + previousValue },
        });
      }
    },
    updateByPeriodically(state, { payload: { id, intervalMs } }) {
      const previousValue = state.counters.entities[id]?.value;
      const previousIntervalMs = state.counters.entities[id]?.intervalMs;
      if (
        typeof previousValue === "number" &&
        Number.isFinite(intervalMs) &&
        intervalMs > 0 &&
        !previousIntervalMs
      ) {
        counterEntity.updateOne(state.counters, {
          id,
          changes: { intervalMs },
        });
      }
    },
    updateByAsync(_, action) {},
    cancelAsyncUpdates(state, { payload }) {
      delete state.counters.entities[payload]?.intervalMs;
    },
  },
});

export const counterActions = counterSlice.actions;

export const counterSelectors = counterEntity.getSelectors(
  (state) => state[counterSlice.name].counters
);
