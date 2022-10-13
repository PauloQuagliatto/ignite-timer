import { Play } from "phosphor-react";

import { HomeContainer, FormContainer, TaskInput, MinutesAmountInput, CountDownContainer, Separator, StartCountDownButton } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task"
            list="task-suggestions"
            placeholder="Digite o nome da sua tarefa"
          />

          <datalist id="task-suggestions">

          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            placeholder="00"
            step={5}
          />


          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
};
