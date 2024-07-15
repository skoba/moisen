'use client';

import { useInitStore } from "../hooks/useInitStore";

export default function EventHandler() {
    const { restCommand } = useInitStore();

    // return <p className="whitespace-pre">{JSON.stringify(restCommand.map(c => c?.toString?.()), undefined, 2)}</p>;
    return null;
}
