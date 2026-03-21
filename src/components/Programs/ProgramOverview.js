import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { UserCheck } from 'lucide-react';

const programs = [
    {
        place: 'Playgroup',
        title: 'PLAY',
        title2: 'GROUP',
        description: 'Play Group aims to provide a safe and stimulating environment where toddlers can explore, make choices and interact with others.',
        image: '/child1.png',
        age: "2.5–3.5 yrs",
        daysWeekly: "3 days weekly",
        hoursPeriod: "3.30 hrs period"
    },
    {
        place: 'Nursery',
        title: 'NURSERY',
        title2: 'CLASS',
        description: 'In Nursery, we encourage children to use materials in flexible and imaginative ways, sustaining their interests and extending knowledge.',
        image: '/child2.png',
        age: "3.5–4.5 yrs",
        daysWeekly: "3 days weekly",
        hoursPeriod: "3.30 hrs period"
    },
    {
        place: 'Junior KG',
        title: 'JUNIOR',
        title2: 'KINDERGARTEN',
        description: 'Junior KG introduces basic academic concepts through collaborative play, developing an understanding of themselves and the world.',
        image: '/child3.png',
        age: "4.5–5.5 yrs",
        daysWeekly: "3 days weekly",
        hoursPeriod: "3.30 hrs period"
    },
    {
        place: 'Senior KG',
        title: 'SENIOR',
        title2: 'KINDERGARTEN',
        description: 'Senior KG prepares kids for primary school by encouraging them to initiate inquiry, ask questions, and build foundational skills.',
        image: '/child4.png',
        age: "5.5–6.5 yrs",
        daysWeekly: "3 days weekly",
        hoursPeriod: "3.30 hrs period"
    }
];

export default function ProgramOverview() {
    const comp = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            let order = Array.from({ length: programs.length }, (_, i) => i);
            let detailsEven = true;

            let offsetTop = 200;
            let offsetLeft = 700;
            let cardWidth = 200;
            let cardHeight = 300;
            let gap = 40;
            let numberSize = 50;
            const ease = "sine.inOut";
            let clicks = 0;
            let isAnimating = false;

            function getCard(index) { return `#card${index}`; }
            function getCardContent(index) { return `#card-content-${index}`; }
            function getSliderItem(index) { return `#slide-item-${index}`; }

            function animate(target, duration, properties) {
                return new Promise((resolve) => {
                    gsap.to(target, {
                        ...properties,
                        duration: duration,
                        onComplete: resolve,
                    });
                });
            }

            function updateContent(containerSelector, itemIndex) {
                const container = comp.current?.querySelector(containerSelector);
                if (container) {
                    const tPlace = container.querySelector('.text');
                    const t1 = container.querySelector('.title-1');
                    const t2 = container.querySelector('.title-2');
                    const desc = container.querySelector('.desc');
                    const ageText = container.querySelector('.age-text');
                    const daysText = container.querySelector('.days-text');
                    const hoursText = container.querySelector('.hours-text');

                    if (tPlace) tPlace.textContent = programs[itemIndex].place;
                    if (t1) t1.textContent = programs[itemIndex].title;
                    if (t2) t2.textContent = programs[itemIndex].title2;
                    if (desc) desc.textContent = programs[itemIndex].description;
                    if (ageText) ageText.textContent = programs[itemIndex].age;
                    if (daysText) daysText.textContent = programs[itemIndex].daysWeekly;
                    if (hoursText) hoursText.textContent = programs[itemIndex].hoursPeriod;
                }
            }

            function init() {
                const [active, ...rest] = order;
                const detailsActive = detailsEven ? "#details-even" : "#details-odd";
                const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

                const width = window.innerWidth;
                const height = window.innerHeight;

                offsetTop = height - 430;
                offsetLeft = width - 830;

                // Add safeguard for smaller screens
                if (width < 1024) {
                    offsetLeft = width - (cardWidth + gap) * 1.5;
                }

                gsap.set("#pagination", {
                    top: offsetTop + 330,
                    left: offsetLeft,
                    y: 200,
                    opacity: 0,
                    zIndex: 60,
                });

                gsap.set(getCard(active), {
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                });
                gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
                gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
                gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
                gsap.set(`${detailsInactive} .text`, { y: 100 });
                gsap.set(`${detailsInactive} .title-1`, { y: 100 });
                gsap.set(`${detailsInactive} .title-2`, { y: 100 });
                gsap.set(`${detailsInactive} .desc`, { y: 50 });
                gsap.set(`${detailsInactive} .cta`, { y: 60 });
                gsap.set(`${detailsInactive} .age-container`, { y: 50 });

                gsap.set(".progress-sub-foreground", {
                    width: 500 * (1 / order.length) * (active + 1),
                });

                rest.forEach((i, index) => {
                    gsap.set(getCard(i), {
                        x: offsetLeft + 400 + index * (cardWidth + gap),
                        y: offsetTop,
                        width: cardWidth,
                        height: cardHeight,
                        zIndex: 30,
                        borderRadius: 10,
                    });
                    gsap.set(getCardContent(i), {
                        x: offsetLeft + 400 + index * (cardWidth + gap),
                        zIndex: 40,
                        y: offsetTop + cardHeight - 100,
                    });
                    gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
                });

                gsap.set(".indicator", { x: -window.innerWidth });

                const startDelay = 0.6;

                gsap.to(".cover", {
                    x: width + 400,
                    delay: 0.5,
                    ease,
                    onComplete: () => {
                        // Initial content set
                        updateContent(detailsActive, order[0]);
                        setTimeout(() => {
                            loop();
                        }, 500);
                    },
                });

                rest.forEach((i, index) => {
                    gsap.to(getCard(i), {
                        x: offsetLeft + index * (cardWidth + gap),
                        zIndex: 30,
                        delay: startDelay + 0.05 * index,
                        ease,
                    });
                    gsap.to(getCardContent(i), {
                        x: offsetLeft + index * (cardWidth + gap),
                        zIndex: 40,
                        delay: startDelay + 0.05 * index,
                        ease,
                    });
                });

                gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
                gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
            }

            function step() {
                return new Promise((resolve) => {
                    order.push(order.shift());
                    detailsEven = !detailsEven;

                    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
                    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

                    updateContent(detailsActive, order[0]);

                    gsap.set(detailsActive, { zIndex: 22 });
                    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
                    gsap.to(`${detailsActive} .text`, {
                        y: 0,
                        delay: 0.1,
                        duration: 0.7,
                        ease,
                    });
                    gsap.to(`${detailsActive} .title-1`, {
                        y: 0,
                        delay: 0.15,
                        duration: 0.7,
                        ease,
                    });
                    gsap.to(`${detailsActive} .title-2`, {
                        y: 0,
                        delay: 0.15,
                        duration: 0.7,
                        ease,
                    });
                    gsap.to(`${detailsActive} .desc`, {
                        y: 0,
                        delay: 0.3,
                        duration: 0.4,
                        ease,
                    });
                    gsap.to(`${detailsActive} .age-container`, {
                        y: 0,
                        delay: 0.32,
                        duration: 0.4,
                        ease,
                    });
                    gsap.to(`${detailsActive} .cta`, {
                        y: 0,
                        delay: 0.35,
                        duration: 0.4,
                        onComplete: resolve,
                        ease,
                    });
                    gsap.set(detailsInactive, { zIndex: 12 });

                    const [active, ...rest] = order;
                    const prv = rest[rest.length - 1];

                    gsap.set(getCard(prv), { zIndex: 10 });
                    gsap.set(getCard(active), { zIndex: 20 });
                    gsap.to(getCard(prv), { scale: 1.5, ease });

                    gsap.to(getCardContent(active), {
                        y: offsetTop + cardHeight - 10,
                        opacity: 0,
                        duration: 0.3,
                        ease,
                    });
                    gsap.to(getSliderItem(active), { x: 0, ease });
                    gsap.to(getSliderItem(prv), { x: -numberSize, ease });
                    gsap.to(".progress-sub-foreground", {
                        width: 500 * (1 / order.length) * (active + 1),
                        ease,
                    });

                    gsap.to(getCard(active), {
                        x: 0,
                        y: 0,
                        ease,
                        width: window.innerWidth,
                        height: window.innerHeight,
                        borderRadius: 0,
                        onComplete: () => {
                            const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
                            gsap.set(getCard(prv), {
                                x: xNew,
                                y: offsetTop,
                                width: cardWidth,
                                height: cardHeight,
                                zIndex: 30,
                                borderRadius: 10,
                                scale: 1,
                            });

                            gsap.set(getCardContent(prv), {
                                x: xNew,
                                y: offsetTop + cardHeight - 100,
                                opacity: 1,
                                zIndex: 40,
                            });
                            gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

                            gsap.set(detailsInactive, { opacity: 0 });
                            gsap.set(`${detailsInactive} .text`, { y: 100 });
                            gsap.set(`${detailsInactive} .title-1`, { y: 100 });
                            gsap.set(`${detailsInactive} .title-2`, { y: 100 });
                            gsap.set(`${detailsInactive} .desc`, { y: 50 });
                            gsap.set(`${detailsInactive} .cta`, { y: 60 });
                            gsap.set(`${detailsInactive} .age-container`, { y: 50 });
                            clicks -= 1;
                            if (clicks > 0) {
                                step();
                            }
                        },
                    });

                    rest.forEach((i, index) => {
                        if (i !== prv) {
                            const xNew = offsetLeft + index * (cardWidth + gap);
                            gsap.set(getCard(i), { zIndex: 30 });
                            gsap.to(getCard(i), {
                                x: xNew,
                                y: offsetTop,
                                width: cardWidth,
                                height: cardHeight,
                                ease,
                                delay: 0.1 * (index + 1),
                            });

                            gsap.to(getCardContent(i), {
                                x: xNew,
                                y: offsetTop + cardHeight - 100,
                                opacity: 1,
                                zIndex: 40,
                                ease,
                                delay: 0.1 * (index + 1),
                            });
                            gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
                        }
                    });
                });
            }

            let loopContext = true;
            async function loop() {
                if (!loopContext) return;
                await animate(".indicator", 2, { x: 0 });
                if (!loopContext) return;
                await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
                if (!loopContext) return;
                gsap.set(".indicator", { x: -window.innerWidth });
                await step();
                if (!loopContext) return;
                loop();
            }

            init();

            // Interactions
            const rightArrow = comp.current?.querySelector('.arrow-right');
            const leftArrow = comp.current?.querySelector('.arrow-left');

            const handleRight = async () => {
                if (isAnimating) return;
                isAnimating = true;
                loopContext = false;
                gsap.killTweensOf(".indicator");
                gsap.set(".indicator", { x: -window.innerWidth });
                await step();
                isAnimating = false;
            };

            if (rightArrow) rightArrow.addEventListener('click', handleRight);

            return () => {
                loopContext = false;
                if (rightArrow) rightArrow.removeEventListener('click', handleRight);
            };

        }, comp);

        return () => ctx.revert(); // cleanup
    }, []);

    return (
        <>
            <div className="po-container font-montserrat" ref={comp}>
                <div className="indicator"></div>

                <div id="demo">
                    {programs.map((p, index) => (
                        <div key={`card-${index}`} className="card" id={`card${index}`} style={{ backgroundImage: `url(${p.image})` }} />
                    ))}
                    {programs.map((p, index) => (
                        <div key={`cc-${index}`} className="card-content" id={`card-content-${index}`}>
                            <div className="content-start"></div>
                            <div className="content-place">{p.place}</div>
                            <div className="content-title-1">{p.title}</div>
                            <div className="content-title-2">{p.title2}</div>
                        </div>
                    ))}
                </div>

                {/* DETAILS - EVEN */}
                <div className="details" id="details-even">
                    <div className="place-box">
                        <div className="text text-white"></div>
                    </div>
                    <div className="title-box-1"><div className="title-1 text-white"></div></div>
                    <div className="title-box-2"><div className="title-2 text-white"></div></div>
                    <div className="desc text-white"></div>

                    <div className="flex flex-col gap-3 mt-6 text-white age-container relative">
                        <div className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-[#FF4081] flex items-center justify-center shadow-lg shadow-[#FF4081]/30">👶</span>
                            <span className="font-bold text-xl age-text tracking-wide"></span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-[#00BCD4] flex items-center justify-center shadow-lg shadow-[#00BCD4]/30">📅</span>
                            <span className="font-medium text-lg days-text text-gray-200 tracking-wide"></span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-[#8BC34A] flex items-center justify-center shadow-lg shadow-[#8BC34A]/30">⏰</span>
                            <span className="font-medium text-lg hours-text text-gray-200 tracking-wide"></span>
                        </div>
                    </div>

                    <div className="cta flex gap-4 mt-8 pt-4">
                        <button className="bookmark group flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button className="discover group relative overflow-hidden">
                            <span className="relative z-10 font-bold uppercase tracking-wider text-sm">Discover Program</span>
                        </button>
                    </div>
                </div>

                {/* DETAILS - ODD */}
                <div className="details" id="details-odd">
                    <div className="place-box">
                        <div className="text text-white"></div>
                    </div>
                    <div className="title-box-1"><div className="title-1 text-white"></div></div>
                    <div className="title-box-2"><div className="title-2 text-white"></div></div>
                    <div className="desc text-white"></div>

                    <div className="flex flex-col gap-3 mt-6 text-white age-container relative">
                        <div className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-[#FF4081] flex items-center justify-center shadow-lg shadow-[#FF4081]/30">👶</span>
                            <span className="font-bold text-xl age-text tracking-wide"></span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-[#00BCD4] flex items-center justify-center shadow-lg shadow-[#00BCD4]/30">📅</span>
                            <span className="font-medium text-lg days-text text-gray-200 tracking-wide"></span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-[#8BC34A] flex items-center justify-center shadow-lg shadow-[#8BC34A]/30">⏰</span>
                            <span className="font-medium text-lg hours-text text-gray-200 tracking-wide"></span>
                        </div>
                    </div>

                    <div className="cta flex gap-4 mt-8 pt-4">
                        <button className="bookmark group flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button className="discover group relative overflow-hidden">
                            <span className="relative z-10 font-bold uppercase tracking-wider text-sm">Discover Program</span>
                        </button>
                    </div>
                </div>

                <div className="pagination" id="pagination">
                    <div className="arrow arrow-left cursor-pointer hover:bg-white/10 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <div className="arrow arrow-right cursor-pointer hover:bg-white/10 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                    <div className="progress-sub-container">
                        <div className="progress-sub-background border border-white/20 rounded-full overflow-hidden">
                            <div className="progress-sub-foreground bg-[#FF4081]"></div>
                        </div>
                    </div>
                    <div className="slide-numbers" id="slide-numbers">
                        {programs.map((_, i) => <div key={`sn-${i}`} className="item" id={`slide-item-${i}`}>{i + 1}</div>)}
                    </div>
                </div>

                <div className="cover"></div>
            </div>

            <style jsx>{`
        .po-container {
          margin: 0;
          background-color: #0d3697;
          color: rgba(255, 255, 255, 0.87);
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 100vh;
          font-family: inherit;
        }

        .card {
          position: absolute;
          left: 0;
          top: 0;
          background-position: center;
          background-size: cover;
          box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.4);
        }

        .card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2) 60%, transparent);
        }

        .card-content {
          position: absolute;
          left: 0;
          top: 0;
          color: rgba(255, 255, 255, 0.87);
          padding-left: 16px;
        }

        .content-place {
          margin-top: 6px;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .content-title-1,
        .content-title-2 {
          font-weight: 800;
          font-size: 24px;
        }

        .content-start {
          width: 30px;
          height: 5px;
          border-radius: 99px;
          background-color: #FF4081;
        }

        .details {
          z-index: 22;
          position: absolute;
          top: 20%;
          left: 80px;
        }

        .place-box {
          height: 46px;
          overflow: hidden;
        }
        
        .place-box .text {
          padding-top: 16px;
          font-size: 22px;
          position: relative;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .place-box .text:before {
          top: 0;
          left: 0;
          position: absolute;
          content: "";
          width: 40px;
          height: 5px;
          border-radius: 99px;
          background-color: #FF4081;
        }

        .title-1,
        .title-2 {
          font-weight: 900;
          font-size: clamp(40px, 6vw, 84px);
          line-height: 1.1;
          color: white;
          text-transform: uppercase;
        }

        .title-box-1,
        .title-box-2 {
          height: auto;
          min-height: clamp(50px, 7vw, 100px);
          overflow: hidden;
        }

        .desc {
          margin-top: 24px;
          width: 550px;
          font-size: 18px;
          line-height: 1.7;
          opacity: 0.9;
        }
        
        @media (max-width: 768px) {
           .desc { width: 90vw; }
           .details { left: 40px; top: 15%; }
           .card-content { display: none; }
        }

        .cta .bookmark {
          border: none;
          background-color: #FF4081;
          width: 50px;
          height: 50px;
          border-radius: 99px;
          color: white;
          display: grid;
          place-items: center;
        }
        
        .cta .bookmark svg {
          width: 24px;
          height: 24px;
        }

        .cta .discover {
          border: 2px solid rgba(255,255,255,0.8);
          background-color: transparent;
          height: 50px;
          border-radius: 99px;
          color: #ffffff;
          padding: 0 32px;
          transition: all 0.3s ease;
        }
        
        .cta .discover:hover {
           background-color: white;
           color: #FF4081;
        }

        .indicator {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 6px;
          z-index: 60;
          background-color: #FF4081;
        }

        .pagination {
          position: absolute;
          left: 0px;
          top: 0px;
          display: inline-flex;
          align-items: center;
        }

        .arrow {
          z-index: 60;
          width: 50px;
          height: 50px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.4);
          display: grid;
          place-items: center;
        }
        
        .arrow:nth-child(2) {
          margin-left: 16px;
        }

        .arrow svg {
          width: 20px;
          height: 20px;
          stroke-width: 2;
          color: white;
        }

        .progress-sub-container {
          margin-left: 24px;
          z-index: 60;
          width: 400px;
          height: 50px;
          display: flex;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .progress-sub-container { width: 200px; }
        }

        .progress-sub-background {
          width: 100%;
          height: 4px;
          background-color: rgba(255,255,255,0.2);
        }

        .progress-sub-foreground {
          height: 4px;
          background-color: #FF4081;
        }

        .slide-numbers {
          width: 50px;
          height: 50px;
          overflow: hidden;
          z-index: 60;
          position: relative;
          margin-left: 16px;
        }

        .item {
          width: 50px;
          height: 50px;
          position: absolute;
          color: white;
          top: 0;
          left: 0;
          display: grid;
          place-items: center;
          font-size: 32px;
          font-weight: 800;
        }

        .cover {
          position: absolute;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          background-color: #0d3697;
          z-index: 100;
        }
      `}</style>
        </>
    );
}
