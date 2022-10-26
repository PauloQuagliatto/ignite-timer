import { createContext, ReactNode, useReducer, useState } from "react";

import { Cycle, cyclesReducer } from "../reducers/cycles/reducer"
import { addNewCycle, interruptCurrentCycle, endCurrentCycle, activateCycle } from "../reducers/cycles/actions"

interface CycleData {
  task: string;
  minutesAmount: number;
};

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  passedSecondsAmount: number;
  createNewCycle: (data: CycleData) => void;
  interruptCycle: () => void;
  finishCycle: () => void;
  setSeconds: (seconds: number) => void;
  setActive: (id: string) => void;
};

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesProviderProps {
  children: ReactNode;
};


export function CyclesContextProvider({ children }: CyclesProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  });
  const [passedSecondsAmount, setPassedSecondsAmount] = useState(0);

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSeconds(seconds: number) {
    setPassedSecondsAmount(seconds)
  }

  function setActive(id: string) {
    dispatch(activateCycle(id));
  }

  function createNewCycle(data: CycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    };

    dispatch(addNewCycle(newCycle));
    setSeconds(0);
  };

  function interruptCycle() {
    dispatch(interruptCurrentCycle());
  };


  function finishCycle() {
    dispatch(endCurrentCycle());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        passedSecondsAmount,
        createNewCycle,
        interruptCycle,
        finishCycle,
        setSeconds,
        setActive
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};
