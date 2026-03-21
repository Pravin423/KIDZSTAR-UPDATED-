import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const programs = [
    {
        place: 'Playgroup',
        title: 'PLAY GROUP',
        description: 'Play Group aims to provide a safe and stimulating environment where toddlers can explore, make choices and interact with others.',
        image: '/child1.png',
        age: "2.5–3.5 yrs",
        daysWeekly: "3 days weekly",
        hoursPeriod: "3.30 hrs period"
    },
    {
        place: 'Nursery',
        title: 'NURSERY CLASS',
        description: 'In Nursery, we encourage children to use materials in flexible and imaginative ways, sustaining their interests and extending knowledge.',
        image: '/child2.png',
        age: "3.5–4.5 yrs",
        daysWeekly: "3 days weekly",
        hoursPeriod: "3.30 hrs period"
    },
    {
        place: 'Junior KG',
        title: 'JUNIOR KINDERGARTEN',
        description: 'Junior KG introduces basic academic concepts through collaborative play, developing an understanding of themselves and the world.',
        image: '/child3.png',
        age: "4.5–5.5 yrs",
        daysWeekly: "3 days weekly",
        hoursPeriod: "3.30 hrs period"
    },
    {
        place: 'Senior KG',
        title: 'SENIOR KINDERGARTEN',
        description: 'Senior KG prepares kids for primary school by encouraging them to initiate inquiry, ask questions, and build foundational skills.',
        image: '/child4.png',
        age: "5.5–6.5 yrs",
        daysWeekly: "3 days weekly",
        hoursPeriod: "3.30 hrs period"
    }
];

export default function ProgramOverview() {
    const rootRef = useRef(null);
    const canvasContainerRef = useRef(null);

    useEffect(() => {
        if (!canvasContainerRef.current) return;

        const CONFIG = {
            slideCount: programs.length,
            spacingX: 45,
            
            pWidth: 14,
            pHeight: 18,
            
            camZ: 30,
            wallAngleY: -0.25,

            snapDelay: 300,
            lerpSpeed: 0.06
        };

        const totalGalleryWidth = CONFIG.slideCount * CONFIG.spacingX;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf7f7f5);
        scene.fog = new THREE.Fog(0xf7f7f5, 10, 110); 

        const containerNode = rootRef.current;
        const width = containerNode.offsetWidth || window.innerWidth;
        const height = containerNode.offsetHeight || window.innerHeight;

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, CONFIG.camZ);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Clean up any existing canvas
        while(canvasContainerRef.current.firstChild) {
            canvasContainerRef.current.removeChild(canvasContainerRef.current.firstChild);
        }
        canvasContainerRef.current.appendChild(renderer.domElement);

        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambient);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
        dirLight.position.set(10, 20, 10);
        scene.add(dirLight);

        const galleryGroup = new THREE.Group();
        scene.add(galleryGroup);

        const textureLoader = new THREE.TextureLoader();
        const planeGeo = new THREE.PlaneGeometry(CONFIG.pWidth, CONFIG.pHeight);

        const paintingGroups = [];

        for(let i=0; i<CONFIG.slideCount; i++) {
            const group = new THREE.Group();
            group.position.set(i * CONFIG.spacingX, 0, 0);
            
            // Note: Transparent child.png images can cause overlap sorting issues in WebGL
            // Adding transparent:true and adjusting depth writes if necessary.
            const mat = new THREE.MeshBasicMaterial({ 
                map: textureLoader.load(programs[i].image),
                transparent: true,
                side: THREE.DoubleSide
            });
            const mesh = new THREE.Mesh(planeGeo, mat);
            const edges = new THREE.EdgesGeometry(planeGeo);
            const outline = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x222222 }));

            const shadowGeo = new THREE.PlaneGeometry(CONFIG.pWidth, CONFIG.pHeight);
            const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.15 });
            const shadow = new THREE.Mesh(shadowGeo, shadowMat);
            shadow.position.set(0.8, -0.8, -0.5); 

            const lineZ = -1;
            const lineLen = CONFIG.spacingX;
            const lineGeo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(-lineLen/2, 14, lineZ), new THREE.Vector3(lineLen/2, 14, lineZ),
                new THREE.Vector3(-lineLen/2, -14, lineZ), new THREE.Vector3(lineLen/2, -14, lineZ)
            ]);
            const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0xdddddd }));

            group.add(shadow);
            group.add(mesh);
            group.add(outline);
            group.add(lines);
            
            galleryGroup.add(group);
            paintingGroups.push(group);
        }

        galleryGroup.rotation.y = CONFIG.wallAngleY;
        galleryGroup.position.x = 8; 

        let currentScroll = 0;
        let targetScroll = 0;
        let snapTimer = null;
        let mouse = { x: 0, y: 0 };

        let autoSwipeInterval = null;

        function snapToNearest() {
            const index = Math.round(targetScroll / CONFIG.spacingX);
            targetScroll = index * CONFIG.spacingX;
        }

        function runAutoSwipe() {
            const currentIndex = Math.round(targetScroll / CONFIG.spacingX);
            targetScroll = (currentIndex + 1) * CONFIG.spacingX;
        }

        function startAutoSwipe() {
            if(autoSwipeInterval) clearInterval(autoSwipeInterval);
            autoSwipeInterval = setInterval(runAutoSwipe, 4000);
        }

        function stopAutoSwipe() {
            if(autoSwipeInterval) clearInterval(autoSwipeInterval);
        }

        startAutoSwipe();

        let touchStart = 0;
        const handleTouchStart = (e) => {
            touchStart = e.touches[0].clientX;
            stopAutoSwipe();
            if(snapTimer) clearTimeout(snapTimer);
        };
        
        const handleTouchMove = (e) => {
            const diff = touchStart - e.touches[0].clientX;
            targetScroll += diff * 0.6;
            touchStart = e.touches[0].clientX;
            if(snapTimer) clearTimeout(snapTimer);
        };

        const handleTouchEnd = () => {
            snapToNearest();
            startAutoSwipe();
        };

        const handleMouseMove = (e) => {
            const rect = containerNode.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;
            mouse.x = (relX / containerNode.offsetWidth) * 2 - 1;
            mouse.y = -(relY / containerNode.offsetHeight) * 2 + 1;
        };

        const handleResize = () => {
            if (!containerNode) return;
            const newWidth = containerNode.offsetWidth || window.innerWidth;
            const newHeight = containerNode.offsetHeight || window.innerHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        // We bind events directly to window / specific elements
        containerNode.addEventListener('touchstart', handleTouchStart, { passive: true });
        containerNode.addEventListener('touchmove', handleTouchMove, { passive: true });
        containerNode.addEventListener('touchend', handleTouchEnd);
        containerNode.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        let animationFrameId;

        function updateUI(scrollX) {
            const rawIndex = Math.round(scrollX / CONFIG.spacingX);            
            const safeIndex = ((rawIndex % CONFIG.slideCount) + CONFIG.slideCount) % CONFIG.slideCount;     
            for(let i=0; i<CONFIG.slideCount; i++) {
                const el = rootRef.current?.querySelector(`#po-slide-${i}`);
                if(el) {
                    if(i === safeIndex) el.classList.add('active');
                    else el.classList.remove('active');
                }
            }
        }

        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            currentScroll += (targetScroll - currentScroll) * CONFIG.lerpSpeed;
            const xMove = currentScroll * Math.cos(CONFIG.wallAngleY);
            const zMove = currentScroll * Math.sin(CONFIG.wallAngleY);
            camera.position.x = xMove;
            camera.position.z = CONFIG.camZ - zMove;
            paintingGroups.forEach((group, i) => {
                const originalX = i * CONFIG.spacingX;
                const distFromCam = currentScroll - originalX;
                const shift = Math.round(distFromCam / totalGalleryWidth) * totalGalleryWidth;
                group.position.x = originalX + shift;
            });
            camera.rotation.x = mouse.y * 0.05; 
            camera.rotation.y = -mouse.x * 0.05;
            updateUI(currentScroll);
            renderer.render(scene, camera);
        }

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            stopAutoSwipe();
            containerNode.removeEventListener('touchstart', handleTouchStart);
            containerNode.removeEventListener('touchmove', handleTouchMove);
            containerNode.removeEventListener('touchend', handleTouchEnd);
            containerNode.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (canvasContainerRef.current && renderer.domElement) {
                canvasContainerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div className="po-container" ref={rootRef}>
            <div className="logo">KIDZSTAR PROGRAMS</div>

            <div className="canvas-container" ref={canvasContainerRef}></div>

            <div className="ui-layer">
                {programs.map((prog, index) => (
                    <div 
                        className={`slide-content ${index === 0 ? 'active' : ''}`} 
                        id={`po-slide-${index}`}
                        key={index}
                    >
                        <span className="catalogue-number">0{index + 1} / Collection</span>
                        <h1>{prog.place}</h1>
                        <div className="description">
                            {prog.description}
                        </div>
                        <div className="meta-grid">
                            <span className="meta-label">Title</span> <span className="meta-value">{prog.title}</span>
                            <span className="meta-label">Age</span> <span className="meta-value">{prog.age}</span>
                            <span className="meta-label">Time</span> <span className="meta-value">{prog.hoursPeriod}</span>
                            <span className="meta-label">Days</span> <span className="meta-value">{prog.daysWeekly}</span>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                .po-container {
                    position: relative;
                    width: 100%;
                    height: calc(100vh - 97px);
                    min-height: 700px;
                    overflow: hidden;
                    scroll-margin-top: 97px;
                    background-color: #f7f7f5;
                    font-family: 'Montserrat', Arial, sans-serif;
                    color: #111;
                }

                .po-container .canvas-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }

                .po-container .ui-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 2;
                    pointer-events: none;
                }

                .po-container .logo {
                    position: absolute;
                    top: 40px;
                    left: 50px;
                    font-family: 'Montserrat', Arial, sans-serif;
                    font-weight: 800;
                    letter-spacing: 2px;
                    font-size: 1rem;
                    text-transform: uppercase;
                    z-index: 10;
                }

                .po-container .slide-content {
                    position: absolute;
                    top: 25%;
                    left: 16%;
                    width: 30%;
                    min-width: 300px;
                    max-width: 450px;
                    opacity: 0;
                    pointer-events: none;
                    z-index: 10;
                }

                .po-container .slide-content.active {
                    opacity: 1;
                    pointer-events: auto;
                }

                .po-container .slide-content > * {
                    opacity: 0;
                    transform: translateY(15px);
                    transition: all 0.6s ease-out;
                }

                .po-container .slide-content.active > * {
                    opacity: 1;
                    transform: translateY(0);
                }

                .po-container .slide-content.active .catalogue-number { transition-delay: 0.1s; }
                .po-container .slide-content.active h1 { transition-delay: 0.2s; }
                .po-container .slide-content.active .description { transition-delay: 0.3s; }
                .po-container .slide-content.active .meta-grid { transition-delay: 0.4s; }

                .po-container h1 {
                    font-family: 'Montserrat', Arial, sans-serif;
                    font-weight: 900;
                    font-size: 4.5rem;
                    margin: 0 0 1rem 0;
                    line-height: 1.1;
                    color: #0D3697;
                }

                @media (max-width: 768px) {
                    .po-container h1 { font-size: 3.5rem; }
                    .po-container .slide-content { top: 15%; width: 80%; left: 10%; }
                }

                .po-container .catalogue-number {
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: #fff;
                    background-color: #E6AF2E;
                    padding: 6px 14px;
                    border-radius: 99px;
                    margin-bottom: 1.5rem;
                    display: inline-block;
                }

                .po-container .description {
                    font-size: 1.1rem;
                    font-weight: 500;
                    line-height: 1.8;
                    color: #444;
                    margin-bottom: 2.5rem;
                    text-align: left;
                }

                .po-container .meta-grid {
                    display: grid;
                    grid-template-columns: 80px 1fr;
                    row-gap: 1.2rem;
                    border-top: 2px solid rgba(230, 175, 46, 0.4);
                    padding-top: 1.5rem;
                }

                .po-container .meta-label {
                    font-size: 0.7rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    color: #FF4081;
                    align-self: center;
                }

                .po-container .meta-value {
                    font-family: 'Montserrat', Arial, sans-serif;
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: #0D3697;
                }
            `}</style>
        </div>
    );
}
