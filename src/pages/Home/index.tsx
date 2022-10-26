import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

import { CyclesContext } from "../../contexts/CyclesContext"

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton
} from "./styles";

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O cíclo precisa ser de, no mínimo, 5 minutos.')
    .max(60, 'O cíclo não deve exceder 60 minutos.')
});

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interruptCycle } = useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task');
  const isButtonDisabled = !task;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);

    reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {
          activeCycle ?
            <StopCountDownButton onClick={interruptCycle} type="button">
              <HandPalm size={24} />
              Interromper
            </StopCountDownButton>
            :
            <StartCountDownButton disabled={isButtonDisabled} type="submit">
              <Play size={24} />
              Começar
            </StartCountDownButton>
        }
      </form>
    </HomeContainer>
  );
};
