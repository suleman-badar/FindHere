import { useState } from "react";

export default function PasswordInput({ value, onChange, placeholder }) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative w-full max-w-[280px] m-2">
            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="rounded-sm h-10 w-full border px-4 pr-10"
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
            >
                {show ? "Hide" : "Show"}
            </button>
        </div>
    );
}
