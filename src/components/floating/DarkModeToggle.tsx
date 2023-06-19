import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isDarkAtom } from 'atom';
import { HiSun } from 'react-icons/hi';
import { Keyframes } from 'assets';
import lightMode from 'assets/img/lightMode.png';
import darkMode from 'assets/img/darkMode.png';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

interface IDarkModeProps {
  side: boolean;
}
export const DarkModeToggle = ({ side }: IDarkModeProps) => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const [isClickAllowed, setIsClickAllowed] = useState(true);

  const toggleDarkMode = useCallback(() => {
    if (isClickAllowed) {
      const audio = new Audio(`${process.env.PUBLIC_URL}/sound/click.mp3`);
      audio.play();
      setIsDark(prev => !prev);
      setIsClickAllowed(false);
      _.delay(() => setIsClickAllowed(true), 800);
    }
  }, [isClickAllowed, setIsDark]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        (event.key === 'k' || event.key === 'K')
      ) {
        toggleDarkMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleDarkMode]);

  const checkMacOs = navigator.userAgent.indexOf('Mac OS X') !== -1;

  return (
    <Wrapper onClick={toggleDarkMode} side={side}>
      <Input
        id="darkModeToggle"
        type="checkbox"
        onChange={toggleDarkMode}
        checked={isDark}
      />

      <Switch htmlFor="darkModeToggle">
        <Button isDark={isDark}>
          <Moon>
            {Array.from({ length: 4 }).map(() => (
              <li key={uuidv4()} />
            ))}
          </Moon>
          {!isDark && <HiSun />}
        </Button>
        <Background isDark={isDark}>
          {isDark ? <StyledStar /> : <StyledSun />}
        </Background>
      </Switch>
      <Shortcut isDark={isDark}>{checkMacOs ? '⌘' : 'ctrl'} K</Shortcut>
    </Wrapper>
  );
};

interface IisDarkProps {
  isDark: boolean;
}

const Button = styled.div.attrs({ className: 'switch__button' })<IisDarkProps>`
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  overflow: hidden;
  top: 0.3125rem;
  left: 0.3125rem;
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 1.875rem;
  background: #f1c530;
  position: absolute;
  transition: 0.3s ease-in-out all;
  box-shadow: inset 0.1875rem 0.3125rem 0.1875rem #f8a100;
  animation: ${({ isDark }) =>
      isDark ? Keyframes.darkHover : Keyframes.lightHover}
    0.4s ease 0.2s;
  transform: ${({ isDark }) =>
    isDark ? `translateX(160%)` : `translateX(0%)`};
  filter: ${({ theme }) => theme.shadow.drop};
  &:before {
    content: '';
    opacity: 0;
    transition: 0.5s ease;
  }
  &:after {
    content: '';
    opacity: 0;
    transition: 0.5s ease;
  }
  svg {
    color: white;
    width: 100%;
    height: 80%;
  }
`;

const Moon = styled.ul`
  ${({ theme }) => theme.AbsoluteTL};
  ${({ theme }) => theme.wh100};
  padding: 0;
  margin: 0;
  opacity: 0;
  li {
    list-style: none;
    border-radius: 3.125rem;
    background-color: #949ead;
    position: absolute;
  }

  li:first-child {
    width: 0.4375rem;
    height: 0.4375rem;
    left: 0;
    top: 0;
    background: linear-gradient(131deg, #becce1 38%, #626a77 100%);
  }

  li:nth-child(2) {
    width: 0.3125rem;
    height: 0.3125rem;
    right: 0;
    bottom: 0.25rem;
  }

  li:nth-child(3) {
    width: 0.1875rem;
    height: 0.1875rem;
    right: 0.625rem;
    bottom: 0rem;
  }

  li:nth-child(4) {
    width: 0.125rem;
    height: 0.125rem;
    left: 0.5625rem;
    top: 0;
  }
`;
const Background = styled.div.attrs({
  className: 'switch__background',
})<IisDarkProps>`
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  z-index: -1;
  background: grey;
  border-radius: 2.5rem;
  position: relative;
  box-shadow: inset -0.25rem -0.25rem 0.375rem rgba(255, 255, 255, 0.3),
    inset 0.25rem 0.25rem 0.375rem rgba(70, 70, 70, 0.22);
  background-image: ${({ isDark }) =>
    isDark ? `url(${darkMode})` : `url(${lightMode})`};
  background-size: cover;
  background-position: 100% 0%;
  transition: 0.3s ease-in-out all;
  overflow: hidden;

  &:after {
    content: '';
    display: block;
    transition: 0.3s ease-in-out all;
    position: absolute;
    width: 1.5625rem;
    height: 1.5625rem;
    border-radius: 1.5625rem;
    left: -0.125rem;
    top: 0.4rem;
    z-index: 0;
    box-shadow: 1.875rem -1.875rem 0rem rgba(255, 255, 255, 1),
      3.125rem -1.25rem 0rem rgba(255, 255, 255, 1),
      4.0625rem -1.5625rem 0rem rgba(255, 255, 255, 1),
      1.8125rem -1.75rem 0rem rgba(255, 255, 255, 1),
      3.0625rem -1.125rem 0rem rgba(255, 255, 255, 1),
      4.0625rem -1.4375rem 0rem rgba(255, 255, 255, 1);
    filter: drop-shadow(0 0.2rem 0.3rem rgba(155, 160, 179, 0.6));
  }
`;

const StyledStar = styled.span`
  position: absolute;
  left: 1.7rem;
  top: 0.8rem;
  transition: 0.3s ease-in-out 0.2s;
  width: 0.125rem;
  height: 0.125rem;
  background: #fff;
  border-radius: 50%;
  opacity: 0;
  box-shadow: 0 0 0.0625rem 0.125rem rgba(255, 255, 255, 0.1),
    0 0 0.1875rem 0.1875rem rgba(255, 255, 255, 0.4);
  animation: ${Keyframes.shooting} 0.7s forwards
    cubic-bezier(0.8, 0.5, 0.2, 1.2) 0.3s;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 0.0625rem;
    background: linear-gradient(90deg, #fff, transparent);
  }
`;

const StyledSun = styled.span`
  position: absolute;
  right: 1rem;
  top: 0.6rem;
  width: 0.825rem;
  height: 0.825rem;
  transform-origin: 3.3125rem 0.625rem;
  animation: ${Keyframes.sun} 0.8s forwards ease;
  border-radius: 1.5625rem;
  opacity: 1;
`;

const Shortcut = styled.span<IisDarkProps>`
  display: flex;
  padding: 0.1rem 0.3rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.bgColor2};
  color: ${({ theme }) => theme.fontColor2};
  font-size: 0.7rem;
  transition: 0.2s linear;
  margin-left: -0.3125rem;
  position: relative;
  height: fit-content;

  ::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -0.625rem;
    margin-top: -0.3125rem;
    border-width: 0.3125rem;
    border-style: solid;
    border-color: transparent ${({ theme }) => theme.bgColor2} transparent
      transparent;
    transition: 0.2s linear;
  }

  ${({ theme }) => theme.media.max.tablet`
      display: none;
  `}
`;

const Switch = styled.label`
  display: block;
  position: relative;
  z-index: 1;
  cursor: pointer;
  margin-left: 0.5rem;
  width: 5.625rem;
  height: 2.5rem;
  filter: ${({ theme }) => theme.shadow.drop};
  transform: scale(0.7);
`;

const Input = styled.input`
  display: none;
  &:checked + ${Switch} {
    & > .switch__button {
      transition: 0.3s ease-in-out all;
      box-shadow: inset 0.1875rem 0.3125rem 0.1875rem #edf1f9;
      background: #c3c9d2;
      ul {
        opacity: 1;
        transition: 1s ease;
      }
      &:before {
        content: '';
        display: block;
        position: absolute;
        left: 0.9375rem;
        top: 0.3125rem;
        height: 0.5625rem;
        width: 0.5625rem;
        border-radius: 0.5625rem;
        background: #949ead;
        box-shadow: inset 0.125rem 0.0625rem 0.0625rem #848e9b;
        opacity: 1;
      }

      &:after {
        content: '';
        display: block;
        position: absolute;
        left: 0.25rem;
        top: 0.8125rem;
        height: 0.75rem;
        width: 0.75rem;
        border-radius: 0.75rem;
        background: #949ead;
        box-shadow: inset 0.125rem 0.125rem 0.125rem #848e9b;
        opacity: 1;
      }
    }

    & > .switch__background {
      background-position: 20% 0%;
      &:before {
        content: '';
        width: 0.9375rem;
        height: 0.9375rem;
        border-radius: 50%;
        position: absolute;
        left: -4.8rem;
        top: 0.5rem;
        transform-origin: 3.3125rem 0.625rem;
        animation: ${Keyframes.moon} 0.4s forwards ease;
        transform: rotate(170deg);
      }
      &:after {
        transform: translateY(-250%);
        opacity: 0.5;
      }
    }
  }
`;

const Wrapper = styled.div<{ side: boolean }>`
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  ${({ theme }) => theme.CursorActive};
  opacity: 0.8;
  transition: 0.2s ease;
  &:hover {
    opacity: 1;
  }
  &:hover ${Shortcut} {
    background: ${({ theme }) => theme.colors.brand};
    color: ${({ theme }) => theme.fontColor2};
    &:after {
      border-color: transparent ${({ theme }) => theme.colors.brand} transparent
        transparent;
    }
  }

  ${({ theme, side }) => theme.media.max.desktop`
    display: ${side ? 'flex' : 'none'} ;

    ${Shortcut} {
      display: none;
    }
  `}
`;
