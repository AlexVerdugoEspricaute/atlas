import { useEffect, useState } from "react";

import { STORAGE_KEY } from "../sidebar.config";

export default function useSidebar(defaultOpen = true) {
    const [open, setOpen] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);

        return saved !== null ? saved === "true" : defaultOpen;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, String(open));
    }, [open]);

    const toggle = () => setOpen((v) => !v);

    return {
        open,
        toggle,
        setOpen,
    };
}
