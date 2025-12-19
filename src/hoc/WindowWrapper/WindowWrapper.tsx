import useWindowStore from "@store/window.ts";
import React, {useLayoutEffect, useRef} from "react";
import type {windowKey} from "@constants";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {Draggable} from "gsap/all";

const WindowWrapper = <P extends object>(Component: React.ComponentType<P>, windowKey: windowKey) => {

    const Wrapped: React.FC<P> = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef<HTMLElement>(null);

        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            el.style.display = "block";

            gsap.fromTo(el, {
                    scale: .8,
                    opacity: 0,
                    y: 40,
                },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power3.out",
                })
        }, [isOpen]);

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            const [instance] = Draggable.create(el, {
                type: "x,y",
                onPressed: () => focusWindow(windowKey),
                trigger: el.querySelector("#window-header") ?? el,
            })

            return () => instance.kill();
        })


        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            el.style.display = isOpen ? "block" : "none";
        }, [isOpen])

        return <section id={windowKey} ref={ref} style={{zIndex}} className="absolute">

            <Component {...props} />

        </section>
    }

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

    return Wrapped;
}
export default WindowWrapper
