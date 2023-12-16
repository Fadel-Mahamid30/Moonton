import { useState } from "react";

export default function FlashMessage({
    message="",
    type,
    className=""
}) {

    const [hiddenFlash, setHiddenFlash] = useState(false);
    const onHendleClick = () => {
        setHiddenFlash(!hiddenFlash)
    }
    return (
        <div
            className={`w-full flex-row justify-between items-center flash-${type} rounded-lg py-4 px-4 ${className} ${hiddenFlash === false ? "flex" : "hidden"}`}
        >
            <span className="text-base font-semibold">{message}</span>
            <div className="text-3xl flex items-center cursor-pointer" onClick={onHendleClick}>
                <ion-icon className="block" name="close-outline"></ion-icon>
            </div>

        </div>
    );
}
