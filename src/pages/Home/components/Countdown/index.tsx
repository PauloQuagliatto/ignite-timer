import {
  CountDownContainer,
  Separator,
  StartCountDownButton,
  StopCountDownButton
} from "./styles";
export function Countdown() {
  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
      {
    activeCycle ?
      <StopCountDownButton type="button" onClick={() => handleInterruptCycle()}>
        <HandPalm size={24} />
        Interromper
      </StopCountDownButton>
      :
      <StartCountDownButton disabled={isButtonDisabled} type="submit">
        <Play size={24} />
        Começar
      </StartCountDownButton>
  }
  );
};
