import { useScroll, motion, useTransform } from 'framer-motion';
import styled from 'styled-components';

/**
 * ✨ useViewportScroll(): ScrollMotionValues
 *  - 뷰포트가 스크롤될 때 업데이트되는 MotionValues를 리턴
 *  - 아래 값들은 모두 MotionValue< number >를 넘겨줌
 *  - scrollX: 실제 수평 스크롤 픽셀 ex) 500px
 *  - scrollY: 실제 수직 스크롤 픽셀 ex) 500px
 *  - scrollXProgress : 0 ~ 1 사이의 수평 스크롤
 *  - scrollYProgress : 0 ~ 1 사이의 수직 스크롤(가장 상단 0, 가장 하단 1)
 */

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const bgColor = useTransform(scrollYProgress, [0, 1], ['#5871ff', '#e14c35']);
  // const x = useMotionValue(0);
  // const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);
  // const dragRotate = useTransform(x, [-800, 0, 800], [-360, 0, 360]);

  const isScrollable = scrollYProgress.get() > 0;

  return (
    <>
      {isScrollable && (
        <ProgressBarWrapper
          style={{ scaleX: scrollYProgress, background: bgColor }}
        />
      )}
      {/* <Box
        drag="x"
        dragSnapToOrigin
        style={{ x, scale, rotateZ: dragRotate }}
      /> */}
    </>
  );
}

const ProgressBarWrapper = styled(motion.span)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 0.3125rem;
  border-radius: 0.625rem;
  transform-origin: 0%;
  z-index: 99999;
`;

// const Box = styled(motion.div)`
//   width: 200px;
//   height: 200px;
//   background-color: black;
//   border-radius: 15px;
//   box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
// `;
