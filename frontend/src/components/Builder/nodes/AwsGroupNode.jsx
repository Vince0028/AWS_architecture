import React from 'react';
import { NodeResizer } from '@xyflow/react';
import { Cloud, Lock, Shield, Server, Box, Globe, Grid } from 'lucide-react';

const ICON_MAP = {
    'cloud': Cloud,
    'lock': Lock,
    'shield': Shield,
    'server': Server,
    'box': Box,
    'globe': Globe,
    'grid': Grid,
    'none': () => null
};

export const AwsGroupNode = ({ data, selected }) => {
    // defaults
    const type = data.groupType;
    const colorTheme = data.color || 'slate';
    const fillStyle = data.fillStyle || (type.includes('subnet') ? 'solid' : 'outline'); 
    const borderStyle = data.borderStyle || (type === 'region' || type === 'vpc' ? 'solid' : 'dashed');
    const label = data.label || (type === 'custom' ? 'Group' : type.replace('-', ' ').toUpperCase());
    const iconName = data.iconName || (type === 'region' ? 'globe' : type === 'vpc' ? 'cloud' : type.includes('subnet') ? 'lock' : 'box');
    
    // Hardcoded color hexes to avoid Tailwind purge issues on dynamic classes
    const colors = {
        blue:   { main: '#3b82f6', bg: 'rgba(239, 246, 255, 0.90)', text: '#1e3a8a' },
        green:  { main: '#22c55e', bg: 'rgba(240, 253, 244, 0.90)', text: '#14532d' },
        red:    { main: '#ef4444', bg: 'rgba(254, 242, 242, 0.90)', text: '#7f1d1d' },
        purple: { main: '#a855f7', bg: 'rgba(250, 245, 255, 0.90)', text: '#581c87' },
        orange: { main: '#f97316', bg: 'rgba(255, 237, 213, 0.90)', text: '#7c2d12' },
        slate:  { main: '#64748b', bg: 'rgba(241, 245, 249, 0.90)', text: '#0f172a' },
        dark:   { main: '#232f3e', bg: 'rgba(248, 250, 252, 0.90)', text: '#0f172a' }
    };

    let theme = colors[colorTheme] || colors.slate;
    if (type === 'region' && !data.color) theme = colors.dark;
    if (type === 'vpc' && !data.color) theme = colors.green;
    if (type === 'subnet-public' && !data.color) theme = colors.blue;
    if (type === 'subnet-private' && !data.color) theme = colors.blue;

    const isSolid = fillStyle === 'solid';
    const isDashed = borderStyle === 'dashed';

    const IconData = ICON_MAP[iconName] || ICON_MAP['box'];

    // Outer Container Inline Styles
    const containerStyles = {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        borderWidth: typeof data.borderWidth !== 'undefined' ? `${data.borderWidth}px` : '2px',
        borderStyle: isDashed ? 'dashed' : 'solid',
        borderColor: theme.main,
        backgroundColor: isSolid ? theme.bg : 'transparent',
        boxShadow: selected ? `0 0 0 4px rgba(59, 130, 246, 0.3)` : 'none',
        pointerEvents: 'all' // important for React Flow custom bounds
    };

    const strokeOffset = typeof data.borderWidth !== 'undefined' ? `-${data.borderWidth}px` : '-2px';

    return (
        <div style={containerStyles} className="relative group rounded-sm">
            <NodeResizer 
                color="#0073bb" 
                isVisible={selected} 
                minWidth={100} 
                minHeight={100} 
                handleClassName="w-3 h-3 bg-white border-2 border-blue-500 rounded"
            />
            
            {isSolid ? (
                // Solid Fill Style (Subnet style: simple inner text with icon, no outer tab box)
                <div className="absolute top-0 left-0 p-2 flex items-center gap-1.5 pointer-events-none w-full">
                    {iconName !== 'none' && <IconData size={14} color={theme.main} strokeWidth={2.5} />}
                    <span style={{ color: theme.main }} className={`text-xs font-bold font-sans tracking-wide`}>
                        {label}
                    </span>
                </div>
            ) : (
                // Outline Style (Match exact AWS standard look)
                <div 
                    style={{ 
                        top: strokeOffset, 
                        left: strokeOffset, 
                    }} 
                    className={`absolute flex items-stretch h-8 pointer-events-none`}
                >
                    {/* Icon Square */}
                    <div style={{ backgroundColor: theme.main }} className={`flex items-center justify-center h-full w-8 shrink-0`}>
                        {iconName !== 'none' && <IconData size={16} color="#ffffff" strokeWidth={2} />}
                    </div>
                    {/* Label Area (overlapping the border) */}
                    <div className="flex items-center justify-center h-full px-2" style={{ backgroundColor: '#ffffff' }}>
                        <span style={{ color: theme.main, lineHeight: 1 }} className={`text-xs font-bold font-sans tracking-wide`}>
                            {label}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
