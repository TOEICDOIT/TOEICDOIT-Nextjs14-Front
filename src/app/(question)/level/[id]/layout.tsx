'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function LevelLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="w-full total_padding h-min-screen">
                <QueryClientProvider client={new QueryClient()}>
                    {children}
                </QueryClientProvider>
            </div>
        </>

    );
}
