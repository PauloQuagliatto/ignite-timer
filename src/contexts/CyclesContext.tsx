import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { differenceInSeconds } from "date-fns";

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
  }, (initialState) => {
    const storedStateJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0');

    if (storedStateJSON) {
      return JSON.parse(storedStateJSON);
    }

    return initialState;
  });

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [passedSecondsAmount, setPassedSecondsAmount] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate));
    }

    return 0
  });

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState);

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJson);
  }, [cyclesState])

  function setSeconds(seconds: number) {
    setPassedSecondsAmount(seconds)
  }

  function setActive(id: string) {
    dispatch(activateCycle(id));
  }

  function createNewCycle(data: CycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
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
