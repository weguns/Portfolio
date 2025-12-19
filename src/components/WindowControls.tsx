import {type windowKey} from "@constants"
import useWindowStore from "@store/window.ts";

const WindowControls = ({target}: { target: windowKey }) => {

    const {closeWindow} = useWindowStore();
    // TODO: Implement minimize and maximize functionality
    return (
        <div id="window-controls">
            <div className="close" onClick={() => closeWindow(target)}/>
            <div className="minimize" aria-disabled="true"/>
            <div className="maximize" aria-disabled="true"/>
        </div>
    )
}
export default WindowControls
