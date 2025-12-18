import {useRef} from "react";
import {Tooltip} from "react-tooltip";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

import {dockApps, type app} from "@constants/main.ts";
import useWindowStore from "@store/window.ts";

const Dock = () => {
    const {openWindow, closeWindow, windows} = useWindowStore();

    const dockRef = useRef<HTMLDivElement>(null)

    useGSAP((): () => void => {
        const dock = dockRef.current;
        if (!dock) return () => {
        };

        const icons: Element[] = gsap.utils.toArray(".dock-icon", dock) as Element[];

        const animateIcons: (mouseX: number) => void = (mouseX) => {
            const {left} = dock.getBoundingClientRect();

            icons.forEach((icon: Element): void => {
                const {left: iconLeft, width} = icon.getBoundingClientRect();
                const center: number = iconLeft - left + width / 2;
                const distance: number = Math.abs(mouseX - center);
                const intensity: number = Math.max(0, 1 - (distance / 40) ** 2);
                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power1.out",
                });
            });
        };

        const handleMouseMove: (e: MouseEvent) => void = (e) => {
            const {left} = dock.getBoundingClientRect();

            animateIcons(e.clientX - left)
        };

        const resetIcons: () => void = () => icons.forEach((icon: Element) => gsap.to(icon, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power1.out",
            }),
        );

        dock.addEventListener('mousemove', handleMouseMove)
        dock.addEventListener('mouseleave', resetIcons)

        return () => {
            dock.removeEventListener('mousemove', handleMouseMove)
            dock.removeEventListener('mouseleave', resetIcons)
        }
    }, []);

    const toggleApp = (app: app): void => {
        if (!app.canOpen) return;

        const window = windows[app.id]

        if (!window) {
            console.error("Window not found for app: ", app.id);
            return;
        }

        if (window.isOpen) {
            closeWindow(app.id);
        } else {
            openWindow(app.id);
        }
    }

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map(({id, name, icon, canOpen}: app) => (
                    <div key={id} className="relative flex justify-center">
                        <button type="button"
                                className="dock-icon"
                                aria-label={name}
                                data-tooltip-id="dock-tooltip"
                                data-tooltip-content={name}
                                data-tooltip-delay-show={150}
                                disabled={!canOpen}
                                onClick={() => toggleApp({id, name, icon, canOpen})}
                        >
                            <img
                                src={`/images/${icon}`}
                                alt={name}
                                loading="lazy"
                                className={canOpen ? '' : 'opacity-60'}
                            />
                        </button>
                    </div>
                ))}

                <Tooltip id="dock-tooltip" place="top" className="tooltip"/>
            </div>
        </section>
    );
}
export default Dock