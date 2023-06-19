import { Blog, Github } from 'assets/svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ISocialLinkProps {
  side: boolean;
}

export const SocialLink = ({ side }: ISocialLinkProps) => {
  return (
    <Wrapper side={side}>
      <SocialAnchor
        to="https://github.com/Seogun95"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github />
      </SocialAnchor>
      <SocialAnchor
        to="https://seons-dev.tistory.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Blog />
      </SocialAnchor>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ side: boolean }>`
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  margin-left: 1rem;
  gap: 0.7rem;

  ${({ theme, side }) => theme.media.max.desktop`
    display: ${side ? 'flex' : 'none'};
  `}
`;

const SocialAnchor = styled(Link)`
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
`;
