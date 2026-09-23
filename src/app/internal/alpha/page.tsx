"use client";

import { useState } from "react";

export default function AlphaInviteAdmin() {
  const [adminToken, setAdminToken] = useState("");
  const [inviteId, setInviteId] = useState("");
  const [result, setResult] = useState<{ invite_url?: string; token?: string; error?: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function generate() {
    setBusy(true); setResult(null);
    try {
      const response = await fetch("https://api.vcl.article6.org/alpha/admin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Scoop-Admin-Token": adminToken },
        body: JSON.stringify({ invite_id: inviteId, ttl_days: 7, max_installs: 2 }),
      });
      setResult(await response.json());
    } catch {
      setResult({ error: "Could not reach the Scoop API." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{minHeight:"100vh",background:"#fff",color:"#111318",fontFamily:"Manrope,Arial,sans-serif",padding:"48px 24px"}}>
      <div style={{maxWidth:680,margin:"0 auto"}}>
        <div style={{fontWeight:800,fontSize:24,color:"#1769FF"}}>Scoop</div>
        <h1 style={{fontSize:42,letterSpacing:"-0.04em"}}>Create alpha invite</h1>
        <p style={{color:"#6b7280"}}>Internal only. The admin token is sent directly to the Scoop API and is not saved by this page.</p>
        <label style={{display:"block",fontWeight:700,marginTop:24}}>Tester ID</label>
        <input value={inviteId} onChange={(e)=>setInviteId(e.target.value)} placeholder="fred-test-01" style={{width:"100%",boxSizing:"border-box",padding:14,border:"1px solid #d1d5db",borderRadius:12,fontSize:16,marginTop:8}} />
        <label style={{display:"block",fontWeight:700,marginTop:18}}>Admin token</label>
        <input type="password" value={adminToken} onChange={(e)=>setAdminToken(e.target.value)} style={{width:"100%",boxSizing:"border-box",padding:14,border:"1px solid #d1d5db",borderRadius:12,fontSize:16,marginTop:8}} />
        <button disabled={busy || !inviteId || !adminToken} onClick={generate} style={{marginTop:20,border:0,borderRadius:999,padding:"14px 20px",background:"#1769FF",color:"#fff",fontWeight:800,cursor:"pointer"}}>{busy ? "Creating…" : "Create invite"}</button>
        {result && <pre style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere",marginTop:24,padding:18,borderRadius:14,background:"#f3f4f6"}}>{result.error || result.invite_url}</pre>}
      </div>
    </main>
  );
}
