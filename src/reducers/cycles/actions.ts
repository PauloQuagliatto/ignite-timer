import { Cycle } from "./reducer";

export enum ActionTypes {
  ADD_CYCLE = 'ADD_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  END_CURRENT_CYCLE = 'END_CURRENT_CYCLE',
  ACTIVATE_CYCLE = 'ACTIVATE_CYCLE'
}

export function addNewCycle(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_CYCLE,
    payload: {
      newCycle
    }
  }
}

export function interruptCurrentCycle() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    payload: null
  }
}
export function endCurrentCycle() {
  return {
    type: ActionTypes.END_CURRENT_CYCLE,
    payload: null
  }
}

export function activateCycle(id: string) {
  return {
    type: ActionTypes.ACTIVATE_CYCLE,
    payload: {
      activeCycleId: id
    }
  }
}
