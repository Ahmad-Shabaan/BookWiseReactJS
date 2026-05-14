import gsap from 'gsap';
import { useGSAP } from '@gsap/react'

type Link = {
    name: string;
    href: string;
}

const links: Link[] = [
    {
        name: 'Home',
        href: '#',
    },
    {
        name: 'About',
        href: '#',
    },
    {
        name: 'Contact',
        href: '#',
    },
]
const Navbar = () => {

    useGSAP(() => {
        gsap.fromTo('nav', { backgroundColor: 'transparent', backdropFilter: "blur(0px)" }, {
            scrollTrigger: { trigger: document.body, start: "top top", scrub: true },
            backgroundColor: '#00000050',
            backdropFilter: 'blur(100px)',
            duration: 1,
            ease: 'power1.inOut'
        });

    }, [])
    return (
        <nav id="nav">
            <div>
                <a href="/home" className="flex items-center gap-2">
                    <img src="/vite.svg" alt="logo" />
                    <p>Book Wise</p>
                </a>
                <ul>
                    {links.map((link) => (
                        <li key={link.name}>
                            <a href={link.href}>{link.name}</a>
                        </li>
                    ))}
                </ul>
            </div>

        </nav>
    )
}

export default Navbar