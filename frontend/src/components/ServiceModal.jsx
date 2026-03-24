import React from 'react';
import { getIcon } from '../utils/icons';
import { PipelineFlow } from './PipelineFlow';

export const ServiceModal = ({ 
    selectedTool, 
    setSelectedTool, 
    activeTab, 
    setActiveTab, 
    handleConnectionClick,
    isDarkMode
}) => {
    return (
        <div className="modal-overlay" onClick={() => setSelectedTool(null)}>
            <div className={`modal-content ${isDarkMode ? 'modal-content-dark' : ''}`} onClick={e => e.stopPropagation()}>
                <div style={{padding:"1rem 1.5rem",display:"flex",alignItems:"center",gap:"1rem",borderBottom:`1px solid ${isDarkMode ? '#334155' : '#eaeded'}`,flexShrink:0}}>
                    <div style={{width:48,height:48,borderRadius:4,border:`1px solid ${isDarkMode ? '#334155' : '#eaeded'}`,display:"flex",alignItems:"center",justifyContent:"center",padding:6,background:isDarkMode ? '#0f172a' : '#fafafa',flexShrink:0}}>
                        <img src={"/" + selectedTool.icon} style={{width:"100%",height:"100%",objectFit:"contain"}} onError={(e)=>e.target.style.display="none"} />
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                        <h2 style={{margin:0,fontSize:"1.3rem",fontWeight:700,color:isDarkMode ? '#f1f5f9' : '#16191f'}}>{selectedTool.name}</h2>
                        <span style={{color:isDarkMode ? '#94a3b8' : '#545b64',fontSize:"0.8rem"}}>{selectedTool.category}</span>
                    </div>
                    <button onClick={() => setSelectedTool(null)} style={{background:isDarkMode ? '#0f172a' : '#fafafa',border:`1px solid ${isDarkMode ? '#334155' : '#eaeded'}`,borderRadius:4,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:isDarkMode ? '#cbd5e1' : '#545b64',flexShrink:0}}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <div style={{display:"flex",borderBottom:`1px solid ${isDarkMode ? '#334155' : '#eaeded'}`,padding:"0 1.5rem",flexShrink:0}}>
                    <button className={"playbook-tab " + (activeTab === "vibe" ? "active" : "")} onClick={() => setActiveTab("vibe")}>Overview</button>
                    <button className={"playbook-tab " + (activeTab === "setup" ? "active" : "")} onClick={() => setActiveTab("setup")}>Setup Guide</button>
                    <button className={"playbook-tab " + (activeTab === "connections" ? "active" : "")} onClick={() => setActiveTab("connections")}>Connections{selectedTool.connections ? " (" + selectedTool.connections.length + ")" : ""}</button>
                </div>
                <div style={{padding:"1.5rem",overflowY:"auto",flex:1, background:isDarkMode ? '#0f172a' : '#ffffff'}}>
                    {activeTab === "vibe" && (
                        <div>
                            <div className="mb-6">
                                <span className="vibe-title">THE VIBE</span>
                                <p style={{fontSize:"1rem",color:isDarkMode ? '#f1f5f9' : '#334155',lineHeight:1.6}}>{selectedTool.vibe}</p>
                            </div>
                            <div className="mb-6">
                                <span className="simple-desc-title">SIMPLE EXPLANATION</span>
                                <p style={{fontSize:"1rem",color:isDarkMode ? '#e2e8f0' : '#334155',lineHeight:1.6}}>{selectedTool.explanation}</p>
                            </div>
                            <div className="analogy-box" style={isDarkMode ? { background: '#10253a', borderLeftColor: '#38bdf8' } : undefined}>
                                <span className="analogy-title">THE ANALOGY</span>
                                <p style={{fontSize:"1.05rem",color:isDarkMode ? '#e0f2fe' : '#00529b',fontStyle:"italic",lineHeight:1.5}}>{selectedTool.analogy}</p>
                            </div>
                            <div style={{marginTop:"1.5rem",paddingTop:"1rem",borderTop:`1px solid ${isDarkMode ? '#334155' : '#eaeded'}`}}>
                                <p className="fact-text">FACT: {selectedTool.fact}</p>
                            </div>
                        </div>
                    )}
                    {activeTab === "setup" && (
                        <div>
                            {!selectedTool.setup ? (
                                <p style={{color:isDarkMode ? '#cbd5e1' : '#8a94a6',fontStyle:"italic"}}>Setup playbook coming soon for this service.</p>
                            ) : (
                                <div>
                                    <div className="mb-4"><span style={{color:isDarkMode ? '#86efac' : '#1e7e34',fontWeight:700,fontSize:"0.8rem",textTransform:"uppercase"}}>CONSOLE WALKTHROUGH</span></div>
                                    {selectedTool.setup.map((step, i) => (
                                        <div key={i} className="setup-step">
                                            <div className="step-num">{step.s}</div>
                                            <div>
                                                <p style={{margin:0,color:isDarkMode ? '#f8fafc' : '#16191f',fontWeight:500,fontSize:"0.9rem"}}>{step.a}</p>
                                                <span style={{color:isDarkMode ? '#e2e8f0' : '#8a94a6',fontSize:"0.75rem",fontFamily:"monospace",background:isDarkMode ? '#1e293b' : '#f2f3f3',padding:"2px 6px",borderRadius:4,marginTop:4,display:"inline-block",border:`1px solid ${isDarkMode ? '#475569' : '#eaeded'}`}}>{step.l}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {selectedTool.pipelines && selectedTool.pipelines.length > 0 && (
                                        <div style={{marginTop:"1.5rem",paddingTop:"1rem",borderTop:`1px solid ${isDarkMode ? '#334155' : '#eaeded'}`}}>
                                            <span style={{color:isDarkMode ? '#c4b5fd' : '#6b3fa0',fontWeight:700,fontSize:"0.8rem",textTransform:"uppercase",display:"block",marginBottom:"1rem"}}>COMMON ARCHITECTURES</span>
                                            {selectedTool.pipelines.map((pipeline, pi) => (
                                                <div key={pi} className="pipeline-card">
                                                    <div style={{marginBottom:"0.4rem"}}>
                                                        <span style={{fontWeight:700,color:isDarkMode ? '#f8fafc' : '#16191f',fontSize:"0.9rem"}}>{pipeline.name}</span>
                                                        <span style={{color:isDarkMode ? '#cbd5e1' : '#8a94a6',fontSize:"0.8rem",marginLeft:"0.5rem"}}>— {pipeline.desc}</span>
                                                    </div>
                                                    <PipelineFlow steps={pipeline.steps} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === "connections" && (
                        <div>
                            {!selectedTool.connections || selectedTool.connections.length === 0 ? (
                                <p style={{color:isDarkMode ? '#cbd5e1' : '#8a94a6',fontStyle:"italic"}}>Connection details coming soon for this service.</p>
                            ) : (
                                <div>
                                    <div className="mb-4"><span style={{color:isDarkMode ? '#7dd3fc' : '#0073bb',fontWeight:700,fontSize:"0.8rem",textTransform:"uppercase"}}>COMPATIBLE SERVICES ({selectedTool.connections.length})</span></div>
                                    {selectedTool.connections.map((conn, i) => {
                                        const cIcon = getIcon(conn.n);
                                        return (
                                        <div key={i} className="conn-row" onClick={() => handleConnectionClick(conn.id)} title={"View " + conn.n}>
                                            <span className="cat-badge">{conn.c}</span>
                                            {cIcon ? <img src={"/" + cIcon} style={{width:22,height:22,objectFit:"contain",flexShrink:0}} onError={(e)=>e.target.style.display="none"} /> : <div style={{width:22,height:22,borderRadius:4,background:isDarkMode ? '#334155' : '#eaeded',flexShrink:0}}></div>}
                                            <span style={{fontWeight:700,color:isDarkMode ? '#7dd3fc' : '#0073bb',fontSize:"0.85rem",minWidth:120,cursor:"pointer"}}>{conn.n}</span>
                                            <span style={{color:isDarkMode ? '#e2e8f0' : '#545b64',fontSize:"0.8rem",flex:1}}>{conn.d}</span>
                                        </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
