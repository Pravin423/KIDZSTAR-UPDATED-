import re

with open("c:\\Users\\Pravin\\Desktop\\kidzstar updated\\preschool-website\\src\\components\\Programs\\ProgramOverview.js", "r", encoding="utf-8") as f:
    content = f.read()

new_use_effect = """    useEffect(() => {
        let loopContext = true;
        let timeoutId;

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

            function getCard(index) { return comp.current?.querySelector(`#card${index}`); }
            function getCardContent(index) { return comp.current?.querySelector(`#card-content-${index}`); }
            function getSliderItem(index) { return comp.current?.querySelector(`#slide-item-${index}`); }

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
                const height = Math.max(window.innerHeight, 1000);

                offsetTop = height - 430;
                offsetLeft = Math.max(650, width - 830);

                if (width < 768) {
                    offsetLeft = Math.max(40, width - (cardWidth + gap) * 1.5);
                }

                gsap.set(comp.current?.querySelector("#pagination"), {
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
                gsap.set(comp.current?.querySelector(detailsActive), { opacity: 0, zIndex: 22, x: -200 });
                gsap.set(comp.current?.querySelector(detailsInactive), { opacity: 0, zIndex: 12 });
                gsap.set(comp.current?.querySelector(`${detailsInactive} .text`), { y: 100 });
                gsap.set(comp.current?.querySelector(`${detailsInactive} .title-1`), { y: 100 });
                gsap.set(comp.current?.querySelector(`${detailsInactive} .title-2`), { y: 100 });
                gsap.set(comp.current?.querySelector(`${detailsInactive} .desc`), { y: 50 });
                gsap.set(comp.current?.querySelector(`${detailsInactive} .cta`), { y: 60 });
                gsap.set(comp.current?.querySelector(`${detailsInactive} .age-container`), { y: 50 });

                gsap.set(comp.current?.querySelector(".progress-sub-foreground"), {
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

                gsap.set(comp.current?.querySelector(".indicator"), { x: -window.innerWidth });

                const startDelay = 0.6;

                gsap.to(comp.current?.querySelector(".cover"), {
                    x: width + 400,
                    delay: 0.5,
                    ease,
                    onComplete: () => {
                        updateContent(detailsActive, order[0]);
                        timeoutId = setTimeout(() => {
                            if (loopContext) loop();
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

                gsap.to(comp.current?.querySelector("#pagination"), { y: 0, opacity: 1, ease, delay: startDelay });
                gsap.to(comp.current?.querySelector(detailsActive), { opacity: 1, x: 0, ease, delay: startDelay });
            }

            function step() {
                return new Promise((resolve) => {
                    if (!loopContext) return resolve();
                    order.push(order.shift());
                    detailsEven = !detailsEven;

                    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
                    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

                    updateContent(detailsActive, order[0]);

                    gsap.set(comp.current?.querySelector(detailsActive), { zIndex: 22 });
                    gsap.to(comp.current?.querySelector(detailsActive), { opacity: 1, delay: 0.4, ease });
                    gsap.to(comp.current?.querySelector(`${detailsActive} .text`), { y: 0, delay: 0.1, duration: 0.7, ease });
                    gsap.to(comp.current?.querySelector(`${detailsActive} .title-1`), { y: 0, delay: 0.15, duration: 0.7, ease });
                    gsap.to(comp.current?.querySelector(`${detailsActive} .title-2`), { y: 0, delay: 0.15, duration: 0.7, ease });
                    gsap.to(comp.current?.querySelector(`${detailsActive} .desc`), { y: 0, delay: 0.3, duration: 0.4, ease });
                    gsap.to(comp.current?.querySelector(`${detailsActive} .age-container`), { y: 0, delay: 0.32, duration: 0.4, ease });
                    gsap.to(comp.current?.querySelector(`${detailsActive} .cta`), { y: 0, delay: 0.35, duration: 0.4, ease, onComplete: resolve });
                    
                    gsap.set(comp.current?.querySelector(detailsInactive), { zIndex: 12 });

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
                    gsap.to(comp.current?.querySelector(".progress-sub-foreground"), {
                        width: 500 * (1 / order.length) * (active + 1),
                        ease,
                    });

                    gsap.to(getCard(active), {
                        x: 0,
                        y: 0,
                        ease,
                        width: window.innerWidth,
                        height: Math.max(window.innerHeight, 1000),
                        borderRadius: 0,
                        onComplete: () => {
                            if (!loopContext) return;
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

                            gsap.set(comp.current?.querySelector(detailsInactive), { opacity: 0 });
                            gsap.set(comp.current?.querySelector(`${detailsInactive} .text`), { y: 100 });
                            gsap.set(comp.current?.querySelector(`${detailsInactive} .title-1`), { y: 100 });
                            gsap.set(comp.current?.querySelector(`${detailsInactive} .title-2`), { y: 100 });
                            gsap.set(comp.current?.querySelector(`${detailsInactive} .desc`), { y: 50 });
                            gsap.set(comp.current?.querySelector(`${detailsInactive} .cta`), { y: 60 });
                            gsap.set(comp.current?.querySelector(`${detailsInactive} .age-container`), { y: 50 });
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

            async function loop() {
                if (!loopContext) return;
                await animate(comp.current?.querySelector(".indicator"), 2, { x: 0 });
                if (!loopContext) return;
                await animate(comp.current?.querySelector(".indicator"), 0.8, { x: window.innerWidth, delay: 0.3 });
                if (!loopContext) return;
                gsap.set(comp.current?.querySelector(".indicator"), { x: -window.innerWidth });
                if (!loopContext) return;
                await step();
                if (!loopContext) return;
                loop();
            }

            init();

            const rightArrow = comp.current?.querySelector('.arrow-right');
            const leftArrow = comp.current?.querySelector('.arrow-left');

            const handleRight = async () => {
                if (isAnimating || !loopContext) return;
                isAnimating = true;
                loopContext = false;
                gsap.killTweensOf(comp.current?.querySelector(".indicator"));
                gsap.set(comp.current?.querySelector(".indicator"), { x: -window.innerWidth });
                await step();
                isAnimating = false;
            };

            if (rightArrow) rightArrow.addEventListener('click', handleRight);

            return () => {
                if (rightArrow) rightArrow.removeEventListener('click', handleRight);
            };

        }, comp);

        return () => {
            loopContext = false;
            clearTimeout(timeoutId);
            ctx.revert();
        };
    }, []);"""

new_content = re.sub(r'    useEffect\(\(\) => \{.*?\n    \}, \[\]\);', new_use_effect, content, flags=re.DOTALL)

with open("c:\\Users\\Pravin\\Desktop\\kidzstar updated\\preschool-website\\src\\components\\Programs\\ProgramOverview.js", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Done")
