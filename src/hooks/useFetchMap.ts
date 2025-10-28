import { useEffect, useState } from "react";

export function useFetchMap(endpoint: string): Record<string, string> {
    const [map, setMap] = useState<Record<string, string>>({});

    useEffect(() => {
        fetch(endpoint)
            .then((res) => res.json())
            .then((data: { id: number; name: string; url: string }[]) => {
                const result: Record<string, string> = {};
                data.forEach((item) => {
                    result[item.name] = item.url;
                });
                setMap(result);
            })
            .catch((err) => console.error(`${endpoint} fetch 실패:`, err));
    }, [endpoint]);

    return map;
}
