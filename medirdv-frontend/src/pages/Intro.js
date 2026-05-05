import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

const IntroContainer = styled.div`
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  font-family: 'Syne', sans-serif;
`;

const Content = styled.div`
  font-size: clamp(24px, 5vw, 45px);
  letter-spacing: 1.5px;
  position: relative;
  width: 700px;
  height: 60px;
  display: flex;
  align-items: center;
`;

const Txt1 = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 400;
  position: relative;
`;

const Txt2 = styled.span`
  display: inline-block;
  font-weight: 700;
  color: #0047FF;
  opacity: 0;
  position: absolute;
  white-space: nowrap;
  
  .char {
    display: inline-block;
  }
`;

const Bar = styled.div`
  width: 3px;
  height: 1.2em;
  background: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1px;
  z-index: 2;
`;

export default function Intro({ onComplete }) {
  const txt1Ref = useRef(null);
  const txt2Ref = useRef(null);
  const barRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const txt1Str = "www.medirdv.io/";
    const txt2Str = "premium-care";
    
    // Split text 2 into characters manually (workaround for SplitText)
    const txt2Chars = txt2Str.split('').map(c => `<span class="char">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
    if (txt2Ref.current) txt2Ref.current.innerHTML = txt2Chars;

    const chars = txt2Ref.current.querySelectorAll('.char');
    const color1 = '#fff';
    const color2 = '#0047FF';

    const moveBar = () => {
      if (txt1Ref.current && barRef.current) {
        gsap.set(barRef.current, { left: txt1Ref.current.offsetWidth + 2 });
      }
    };

    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: onComplete
        });
      }
    });

    // Reset initial states
    tl.set(txt1Ref.current, { color: color1, width: 0 })
      .set(txt2Ref.current, { 
        color: color2, 
        opacity: 0, 
        immediateRender: true 
      })
      .set(barRef.current, { left: 1, backgroundColor: color1, immediateRender: true })

      // Initial blink
      .to(barRef.current, { duration: 0.1, opacity: 0, yoyo: true, repeat: 5, repeatDelay: 0.3 }, 0)
      
      // Type out txt1
      .to(txt1Ref.current, { 
        duration: 1.1, 
        width: "auto", 
        ease: `steps(${txt1Str.length})`, 
        onUpdate: moveBar 
      }, 2.5)
      
      // Color shift for bar
      .to(barRef.current, { duration: 0.05, backgroundColor: color2 }, '+=0.15')
      
      // Bar expansion effect
      .to(barRef.current, { 
        duration: 0.8, 
        width: 340, 
        ease: "power4.inOut" 
      }, '+=0.1')
      
      // Position txt2 accurately
      .set(txt2Ref.current, { 
        opacity: 1, 
        left: () => txt1Ref.current.offsetWidth + 6 
      }, '-=0.1')
      
      // Bar swipe effect
      .to(barRef.current, { 
        duration: 0.4, 
        x: 340, 
        width: 0, 
        ease: "power4.in" 
      })
      
      // Stagger in characters of txt2
      .from(chars, { 
        duration: 0.6, 
        opacity: 0, 
        y: 20,
        ease: "power3.out", 
        stagger: 0.04 
      }, '-=0.5')
      
      // Aesthetic fade for txt1
      .to(txt1Ref.current, { 
        duration: 1.5, 
        opacity: 0.2, 
        ease: "power3.inOut" 
      }, '-=1.2')
      
      .timeScale(1.85);

    return () => tl.kill();
  }, [onComplete]);

  return (
    <IntroContainer ref={containerRef}>
      <Content>
        <Txt1 ref={txt1Ref}>www.medirdv.io/</Txt1>
        <Txt2 ref={txt2Ref}></Txt2>
        <Bar ref={barRef} />
      </Content>
    </IntroContainer>
  );
}
