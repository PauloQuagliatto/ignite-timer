import { ActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
};

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
};

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id
      }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() };
          } else {
            return { ...cycle };
          }
        }),
        activeCycleId: null
      };
    case ActionTypes.END_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() };
          } else {
            return { ...cycle };
          }
        }),
        activeCycleId: null
      };
    case ActionTypes.ACTIVATE_CYCLE:
      return {
        ...state,
        activeCycleId: action.payload.activeCycleId
      };
    default:
      return state;
  }
}
