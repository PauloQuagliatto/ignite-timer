import { Timer, Scroll } from "phosphor-react";

import { HeaderContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <span> logo </span>
      <nav>
        <a>
          <Timer size={24} />
        </a>
        <a>
          <Scroll size={24} />
        </a>
      </nav>
    </HeaderContainer>
  );
};
