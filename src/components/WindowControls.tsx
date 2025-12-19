import {type windowKey} from "@constants"
import useWindowStore from "@store/window.ts";

const WindowControls = ({target}: { target: windowKey }) => {

    const {closeWindow} = useWindowStore();

    return (
        <div id="window-controls">
            <div className="close" onClick={() => closeWindow(target)} />
            <div className="minimize"/>
            <div className="maximize"/>
        </div>
    )
}
export default WindowControls
