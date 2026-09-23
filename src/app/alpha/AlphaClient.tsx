"use client";

import { useEffect, useState } from "react";

export default function AlphaClient() {
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get("code") ?? "");
  }, []);
  const downloadUrl = process.env.NEXT_PUBLIC_ALPHA_EXTENSION_URL || "";

  async function copyCode() {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main style={{minHeight:"100vh",background:"#fff",color:"#111318",fontFamily:"Manrope,Arial,sans-serif",padding:"48px 24px"}}>
      <div style={{maxWidth:720,margin:"0 auto"}}>
        <a href="/" style={{fontWeight:800,fontSize:24,color:"#1769FF",textDecoration:"none"}}>Scoop</a>
        <div style={{marginTop:72}}>
          <div style={{fontSize:13,fontWeight:800,letterSpacing:"0.16em",color:"#1769FF"}}>FOUNDING ALPHA</div>
          <h1 style={{fontSize:"clamp(42px,8vw,76px)",lineHeight:.95,letterSpacing:"-0.05em",margin:"14px 0 22px"}}>You’re in.</h1>
          <p style={{fontSize:21,lineHeight:1.55,maxWidth:620,margin:0}}>See something you want in a video. Click it. Scoop finds where to buy it.</p>
        </div>

        <section style={{marginTop:48,padding:"28px",border:"1px solid #e5e7eb",borderRadius:24}}>
          <h2 style={{fontSize:22,margin:"0 0 10px"}}>Install Scoop</h2>
          <p style={{lineHeight:1.6,color:"#4b5563"}}>Alpha supports Chrome and Brave. Your personal invite activates up to two browser installs.</p>
          {downloadUrl ? (
            <a href={downloadUrl} style={{display:"inline-block",marginTop:12,padding:"14px 20px",borderRadius:999,background:"#1769FF",color:"#fff",fontWeight:800,textDecoration:"none"}}>Download Scoop →</a>
          ) : (
            <div style={{marginTop:12,padding:"14px 18px",borderRadius:14,background:"#f3f4f6",color:"#6b7280"}}>Extension download is being prepared.</div>
          )}
        </section>

        {code ? (
          <section style={{marginTop:22,padding:"28px",border:"1px solid #dbeafe",background:"#f8fbff",borderRadius:24}}>
            <div style={{fontSize:13,fontWeight:800,color:"#1769FF"}}>YOUR PERSONAL INVITE CODE</div>
            <code style={{display:"block",margin:"14px 0",padding:"14px",borderRadius:12,background:"#fff",border:"1px solid #e5e7eb",overflowWrap:"anywhere",fontSize:12}}>{code}</code>
            <button onClick={copyCode} style={{border:0,borderRadius:999,padding:"12px 18px",fontWeight:800,cursor:"pointer",background:"#111318",color:"#fff"}}>{copied ? "Copied" : "Copy invite code"}</button>
            <p style={{margin:"14px 0 0",fontSize:14,color:"#6b7280"}}>When Scoop asks for your invite on first use, paste this code. Please don’t forward it.</p>
          </section>
        ) : (
          <section style={{marginTop:22,padding:"24px",borderRadius:20,background:"#fff7ed",color:"#9a3412"}}>Open the personal invite link from your Scoop alpha email.</section>
        )}

        <section style={{marginTop:38}}>
          <h2 style={{fontSize:22}}>Install in 30 seconds</h2>
          <ol style={{paddingLeft:22,lineHeight:1.9,color:"#374151"}}>
            <li>Unzip the Scoop download.</li>
            <li>Open <b>chrome://extensions</b> or <b>brave://extensions</b>.</li>
            <li>Turn on <b>Developer mode</b>.</li>
            <li>Choose <b>Load unpacked</b> and select the unzipped Scoop folder.</li>
            <li>Open YouTube, click Scoop, and paste your invite code once.</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
