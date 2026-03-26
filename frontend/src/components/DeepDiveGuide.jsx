import React, { useState } from 'react';

/* ─── Inline SVG icon components ─── */
const IconChevronDown = ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);
const IconChevronRight = ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);
const IconLocation = ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);
const IconInfo = ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" d="M12 16v-4M12 8h.01" />
    </svg>
);
const IconWarning = ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);
const IconXCircle = ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6M9 9l6 6" />
    </svg>
);
const IconCheckCircle = ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const IconZap = ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);
const IconBug = ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a3 3 0 00-3 3v1H6a1 1 0 00-1 1v1a7 7 0 007 7 7 7 0 007-7V7a1 1 0 00-1-1h-3V5a3 3 0 00-3-3zM5 10H3M21 10h-2M5 14H3M21 14h-2M12 18v4M8 22h8" />
    </svg>
);
const IconClipboard = ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
);
const IconTerminal = ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);
const IconSquare = ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
);
const IconFolder = ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);


const AccordionStep = ({ step, index, isDarkMode }) => {
    const [open, setOpen] = useState(false);

    return (
        <div style={{
            borderBottom: `1px solid ${isDarkMode ? '#1e293b' : '#f3f4f6'}`,
        }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '14px 16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: isDarkMode ? '#f1f5f9' : '#16191f',
                    fontFamily: 'inherit',
                }}
            >
                <div style={{
                    width: 28, height: 28,
                    borderRadius: '50%',
                    background: open
                        ? (isDarkMode ? '#0369a1' : '#0073bb')
                        : (isDarkMode ? '#1e293b' : '#f1f5f9'),
                    color: open ? '#fff' : (isDarkMode ? '#cbd5e1' : '#545b64'),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 700, flexShrink: 0,
                    border: open ? 'none' : `1px solid ${isDarkMode ? '#475569' : '#d1d5db'}`,
                    transition: 'all 0.2s ease',
                }}>
                    {index + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.4 }}>
                        {step.title}
                    </div>
                    {step.summary && (
                        <div style={{ fontSize: '0.78rem', color: isDarkMode ? '#94a3b8' : '#6b7280', marginTop: 2 }}>
                            {step.summary}
                        </div>
                    )}
                </div>
                <div style={{ flexShrink: 0, marginTop: 4, color: isDarkMode ? '#64748b' : '#9ca3af', transition: 'transform 0.2s' }}>
                    {open ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
                </div>
            </button>

            {open && (
                <div style={{ padding: '0 16px 16px 56px' }}>
                    {/* Console Path */}
                    {step.consolePath && (
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            background: isDarkMode ? '#1e293b' : '#f8f9fa',
                            border: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
                            borderRadius: 6, padding: '4px 10px', marginBottom: 12,
                            fontSize: '0.75rem', fontFamily: 'monospace',
                            color: isDarkMode ? '#7dd3fc' : '#0073bb',
                        }}>
                            <IconFolder size={12} color={isDarkMode ? '#7dd3fc' : '#0073bb'} />
                            {step.consolePath}
                        </div>
                    )}

                    {/* Detail text */}
                    {step.detail && (
                        <p style={{
                            fontSize: '0.85rem', lineHeight: 1.6,
                            color: isDarkMode ? '#cbd5e1' : '#374151',
                            margin: '0 0 12px',
                        }}>
                            {step.detail}
                        </p>
                    )}

                    {/* Exact inputs */}
                    {step.inputs && step.inputs.length > 0 && (
                        <div style={{
                            background: isDarkMode ? '#0c1a2e' : '#f0f9ff',
                            border: `1px solid ${isDarkMode ? '#1e3a5f' : '#bae6fd'}`,
                            borderRadius: 8, padding: '10px 14px', marginBottom: 12,
                        }}>
                            <div style={{
                                fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                                color: isDarkMode ? '#7dd3fc' : '#0369a1', marginBottom: 6,
                                display: 'flex', alignItems: 'center', gap: 5,
                            }}>
                                <IconTerminal size={12} color={isDarkMode ? '#7dd3fc' : '#0369a1'} />
                                What to Enter / Select
                            </div>
                            {step.inputs.map((input, ii) => (
                                <div key={ii} style={{
                                    display: 'flex', gap: 8, alignItems: 'baseline',
                                    padding: '4px 0', fontSize: '0.8rem', flexWrap: 'wrap',
                                }}>
                                    <span style={{
                                        fontWeight: 600, color: isDarkMode ? '#e2e8f0' : '#1e293b',
                                        minWidth: 120, flexShrink: 0,
                                    }}>
                                        {input.field}:
                                    </span>
                                    <code style={{
                                        background: isDarkMode ? '#1e293b' : '#e0f2fe',
                                        padding: '1px 6px', borderRadius: 4,
                                        fontSize: '0.78rem', fontWeight: 600,
                                        color: isDarkMode ? '#38bdf8' : '#0c4a6e',
                                    }}>
                                        {input.value}
                                    </code>
                                    {input.note && (
                                        <span style={{ fontSize: '0.75rem', color: isDarkMode ? '#94a3b8' : '#6b7280' }}>
                                            {input.note}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Sub-steps */}
                    {step.substeps && step.substeps.length > 0 && (
                        <div style={{ marginBottom: 12 }}>
                            {step.substeps.map((sub, si) => (
                                <div key={si} style={{
                                    display: 'flex', gap: 8, alignItems: 'flex-start',
                                    padding: '6px 0', fontSize: '0.82rem',
                                    color: isDarkMode ? '#e2e8f0' : '#1f2937',
                                    borderBottom: si < step.substeps.length - 1
                                        ? `1px solid ${isDarkMode ? '#1e293b' : '#f3f4f6'}` : 'none',
                                }}>
                                    <span style={{
                                        color: isDarkMode ? '#38bdf8' : '#0073bb',
                                        fontWeight: 700, fontSize: '0.75rem',
                                        minWidth: 18, flexShrink: 0,
                                    }}>
                                        {String.fromCharCode(97 + si)}.
                                    </span>
                                    <span style={{ lineHeight: 1.5 }}>{sub}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tip */}
                    {step.tip && (
                        <div style={{
                            display: 'flex', gap: 8, alignItems: 'flex-start',
                            background: isDarkMode ? '#1a1c2e' : '#fefce8',
                            border: `1px solid ${isDarkMode ? '#3b3a52' : '#fde68a'}`,
                            borderRadius: 8, padding: '10px 14px', marginBottom: 8,
                            fontSize: '0.8rem', color: isDarkMode ? '#fde68a' : '#92400e',
                        }}>
                            <span style={{ flexShrink: 0, marginTop: 2 }}>
                                <IconInfo size={14} color={isDarkMode ? '#fde68a' : '#b45309'} />
                            </span>
                            <span style={{ lineHeight: 1.5 }}>{step.tip}</span>
                        </div>
                    )}

                    {/* Warning */}
                    {step.warning && (
                        <div style={{
                            display: 'flex', gap: 8, alignItems: 'flex-start',
                            background: isDarkMode ? '#2d1215' : '#fef2f2',
                            border: `1px solid ${isDarkMode ? '#5c1e1e' : '#fecaca'}`,
                            borderRadius: 8, padding: '10px 14px', marginBottom: 8,
                            fontSize: '0.8rem', color: isDarkMode ? '#fca5a5' : '#991b1b',
                        }}>
                            <span style={{ flexShrink: 0, marginTop: 2 }}>
                                <IconWarning size={14} color={isDarkMode ? '#fca5a5' : '#dc2626'} />
                            </span>
                            <span style={{ lineHeight: 1.5 }}>{step.warning}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export const DeepDiveGuide = ({ data, isDarkMode }) => {
    if (!data) return null;

    return (
        <div>
            {/* Prerequisites */}
            {data.prereqs && data.prereqs.length > 0 && (
                <div style={{
                    background: isDarkMode ? '#0f1729' : '#fffbeb',
                    border: `1px solid ${isDarkMode ? '#334155' : '#fde68a'}`,
                    borderRadius: 8, padding: '14px 18px', marginBottom: 16,
                }}>
                    <div style={{
                        fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                        color: isDarkMode ? '#fbbf24' : '#b45309', marginBottom: 8,
                        display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        <IconZap size={13} color={isDarkMode ? '#fbbf24' : '#b45309'} />
                        Prerequisites
                    </div>
                    {data.prereqs.map((prereq, i) => (
                        <div key={i} style={{
                            display: 'flex', gap: 8, alignItems: 'center',
                            padding: '3px 0', fontSize: '0.82rem',
                            color: isDarkMode ? '#e2e8f0' : '#374151',
                        }}>
                            <span style={{ width: 4, height: 4, borderRadius: '50%', background: isDarkMode ? '#fbbf24' : '#d97706', flexShrink: 0 }} />
                            {prereq}
                        </div>
                    ))}
                </div>
            )}

            {/* Detailed Steps */}
            {data.steps && data.steps.length > 0 && (
                <div style={{
                    border: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
                    borderRadius: 8, overflow: 'hidden', marginBottom: 16,
                }}>
                    <div style={{
                        padding: '10px 16px',
                        background: isDarkMode ? '#0f172a' : '#f8fafc',
                        borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
                        fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                        color: isDarkMode ? '#86efac' : '#166534',
                        display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        <IconClipboard size={13} color={isDarkMode ? '#86efac' : '#166534'} />
                        Step-by-Step Walkthrough ({data.steps.length} steps)
                    </div>
                    {data.steps.map((step, i) => (
                        <AccordionStep key={i} step={step} index={i} isDarkMode={isDarkMode} />
                    ))}
                </div>
            )}

            {/* Common Pitfalls */}
            {data.pitfalls && data.pitfalls.length > 0 && (
                <div style={{
                    border: `1px solid ${isDarkMode ? '#5c1e1e' : '#fecaca'}`,
                    borderRadius: 8, overflow: 'hidden', marginBottom: 16,
                }}>
                    <div style={{
                        padding: '10px 16px',
                        background: isDarkMode ? '#1f0f0f' : '#fef2f2',
                        borderBottom: `1px solid ${isDarkMode ? '#5c1e1e' : '#fecaca'}`,
                        fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                        color: isDarkMode ? '#fca5a5' : '#991b1b',
                        display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        <IconBug size={13} color={isDarkMode ? '#fca5a5' : '#991b1b'} />
                        Common Pitfalls & Debugging
                    </div>
                    {data.pitfalls.map((pitfall, i) => (
                        <div key={i} style={{
                            padding: '12px 16px',
                            borderBottom: i < data.pitfalls.length - 1
                                ? `1px solid ${isDarkMode ? '#2d1215' : '#fee2e2'}` : 'none',
                        }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                fontWeight: 600, fontSize: '0.82rem',
                                color: isDarkMode ? '#fca5a5' : '#dc2626', marginBottom: 4,
                            }}>
                                <IconXCircle size={14} color={isDarkMode ? '#fca5a5' : '#dc2626'} />
                                {pitfall.problem}
                            </div>
                            <div style={{
                                display: 'flex', alignItems: 'flex-start', gap: 6,
                                fontSize: '0.8rem', lineHeight: 1.5,
                                color: isDarkMode ? '#e2e8f0' : '#374151', paddingLeft: 20,
                            }}>
                                <span style={{ flexShrink: 0, marginTop: 3 }}>
                                    <IconCheckCircle size={13} color={isDarkMode ? '#4ade80' : '#16a34a'} />
                                </span>
                                <span><strong>Fix:</strong> {pitfall.solution}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Verification Checklist */}
            {data.verify && data.verify.length > 0 && (
                <div style={{
                    border: `1px solid ${isDarkMode ? '#1e3a5f' : '#bae6fd'}`,
                    borderRadius: 8, overflow: 'hidden',
                }}>
                    <div style={{
                        padding: '10px 16px',
                        background: isDarkMode ? '#0c1a2e' : '#f0f9ff',
                        borderBottom: `1px solid ${isDarkMode ? '#1e3a5f' : '#bae6fd'}`,
                        fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                        color: isDarkMode ? '#7dd3fc' : '#0369a1',
                        display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        <IconCheckCircle size={13} color={isDarkMode ? '#7dd3fc' : '#0369a1'} />
                        Verify It's Working
                    </div>
                    {data.verify.map((item, i) => (
                        <div key={i} style={{
                            display: 'flex', gap: 8, alignItems: 'center',
                            padding: '8px 16px', fontSize: '0.82rem',
                            color: isDarkMode ? '#e2e8f0' : '#374151',
                            borderBottom: i < data.verify.length - 1
                                ? `1px solid ${isDarkMode ? '#0f2440' : '#e0f2fe'}` : 'none',
                        }}>
                            <span style={{ flexShrink: 0 }}>
                                <IconSquare size={15} color={isDarkMode ? '#4ade80' : '#16a34a'} />
                            </span>
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
