import React, { useEffect, useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { ToolSidebar } from './ToolSidebar';
import { DiagramCanvas } from './DiagramCanvas';
import '@xyflow/react/dist/style.css';

export const BuilderLayout = ({ allTools, isDarkMode }) => {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(max-width: 1024px)').matches;
    });
    const [sidebarOpen, setSidebarOpen] = useState(() => !isMobile);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const media = window.matchMedia('(max-width: 1024px)');
        const updateLayout = (event) => {
            const mobile = event.matches;
            setIsMobile(mobile);
            setSidebarOpen(!mobile);
        };

        setIsMobile(media.matches);
        setSidebarOpen(!media.matches);

        if (media.addEventListener) {
            media.addEventListener('change', updateLayout);
            return () => media.removeEventListener('change', updateLayout);
        }

        media.addListener(updateLayout);
        return () => media.removeListener(updateLayout);
    }, []);

    return (
        <div className={`flex w-full h-full relative overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <ReactFlowProvider>
                <div className="flex-1 h-full relative min-w-0" >
                    <DiagramCanvas allTools={allTools} isDarkMode={isDarkMode} />

                    {isMobile && !sidebarOpen && (
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className={`absolute top-3 right-3 z-30 px-3 py-2 text-xs font-semibold rounded-md shadow-md border ${isDarkMode ? 'bg-slate-800 border-slate-600 text-slate-100' : 'bg-white border-gray-300 text-[#232f3e]'}`}
                        >
                            Open Tools
                        </button>
                    )}
                </div>

                {isMobile && sidebarOpen && (
                    <button
                        aria-label="Close tools sidebar overlay"
                        className="absolute inset-0 z-30 bg-slate-950/30"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <ToolSidebar
                    allTools={allTools}
                    isDarkMode={isDarkMode}
                    isMobile={isMobile}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />
            </ReactFlowProvider>
        </div>
    );
};
