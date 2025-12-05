import * as React from "react";
import gsap from "gsap";
import {ScrollTrigger, SplitText} from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);


const App: React.FC = () => {
    return (
        <div
            className="text-center text-blue-400 text-6xl bg-zinc-900 w-full h-dvh flex justify-center items-center">test</div>
    );
}

export default App;