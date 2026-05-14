import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { useRef, type ReactElement, type ReactHTMLElement } from 'react';
const Ball = () => {

    const scrollRef = useRef<HTMLDivElement | null>(null);
    useGSAP(() => {

        gsap.to('#ball', {
            x: 200,
            duration: 2,
            rotate: 360,
            borderRadius: '100%',
            ease: "power1.inOut", // to add easing to the animation
            scrollTrigger: {
                trigger: '#ball', // to trigger the animation when the box enters the viewport
                start: "top-=140 top", // to start the animation when the bottom of the box enters the bottom of the viewport
                end: "bottom 5%", // to end the animation when the bottom of the box is 20% from the top of the viewport
                scrub: true, // to synchronize the animation with the scroll position
                // markers: true, // to show the start and end markers for debugging purposes
            }
        })
    }, { scope: scrollRef })
    return (
        <div ref={scrollRef} className=' w-full '>

            <div id='ball' className='w-10 h-10  bg-amber-200'></div>
        </div>
    )
}

export default Ball