import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import Flex from "../../../components/Box/Flex";
import { MenuContext } from "../context";
import { Heading } from "../../../components";

interface Props {
  href: string;
  isDark: boolean;
}

const blink = keyframes`
  0%,  100% { transform: scaleY(1); }
  50% { transform:  scaleY(0.1); }
`;

const StyledLink = styled("a")`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.lg} {
      display: none;
    }
  }
  .desktop-icon {
    width: 160px;
    display: none;
    ${({ theme }) => theme.mediaQueries.lg} {
      display: block;
    }
  }
  .eye {
    animation-delay: 20ms;
  }
  &:hover {
    .eye {
      transform-origin: center 60%;
      animation-name: ${blink};
      animation-duration: 350ms;
      animation-iteration-count: 1;
    }
  }
`;

const Logo: React.FC<React.PropsWithChildren<Props>> = ({ isDark, href }) => {
  const { linkComponent } = useContext(MenuContext);
  const image = isDark ? "/images/rel-light.png" : "/images/rel-light.png";
  return (
    <Flex>
      <StyledLink href="/" as={linkComponent} aria-label="relymer home page">
        {/* <Image src={image} width={200} height={50} /> */}
        <Heading as="h1" fontSize="20px" color="secondary">
          RelymerDex
        </Heading>
      </StyledLink>
    </Flex>
  );
};

export default React.memo(Logo);
