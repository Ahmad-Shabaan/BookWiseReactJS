import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { SplitText } from "gsap/all";
const Paragraph = () => {
    useGSAP(() => {
        const paragraphSplit = new SplitText('.paragraph', { type: 'lines' });


        // paragraphSplit.lines.forEach((line, index) => {


        // }
        // )

        gsap.from(paragraphSplit.lines, {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.06,
        })
    }, [])
    return (
        <section className='w-40 '>
            <p className='paragraph'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem ratione dolores alias illo quas sit, cupiditate at voluptas ipsam hic id eos porro deserunt non dolorum quo, velit minima distinctio!
            </p>
        </section>
    )
}

export default Paragraph