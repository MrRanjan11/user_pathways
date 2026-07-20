"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Exclude the /token route from auth check to prevent infinite loops
        if (pathname === '/token') {
            setIsLoading(false);
            return;
        }

        const checkAuth = async () => {
            const userId = sessionStorage.getItem("user_id");

            if (userId) {
                setIsLoading(false);
                return;
            }

            const url = new URL(window.location.href);
            const token = url.searchParams.get("token");

            if (!token) {
                window.location.href = "/token";
                return;
            }

            try {
                const response = await fetch("https://api.mantracare.com/user/user-info", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data && data.user_id) {
                        sessionStorage.setItem("user_id", data.user_id);

                        // Clean the URL using history to avoid Next.js router reloading
                        url.searchParams.delete("token");
                        window.history.replaceState({}, "", url.toString());

                        setIsLoading(false);
                    } else {
                        throw new Error("Missing user_id in response");
                    }
                } else {
                    throw new Error("API request failed");
                }
            } catch (error) {
                console.error("Auth Handshake Error:", error);
                window.location.href = "/token";
            }
        };

        checkAuth();
    }, [pathname]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f4f7fa]">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                <p className="mt-4 text-sm font-medium text-slate-600 animate-pulse">Authenticating...</p>
            </div>
        );
    }

    return <>{children}</>;
}
