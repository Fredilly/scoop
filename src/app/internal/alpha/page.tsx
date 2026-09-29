"use client";

import { useState } from "react";

type Result = {
  invite_url?: string;
  token?: string;
  error?: string;
  email_sent?: boolean;
  email_error?: string;
};

export default function AlphaInviteAdmin() {
  const [adminToken, setAdminToken] = useState("");
  const [inviteId, setInviteId] = useState("");
  const [testerName, setTesterName] = useState("");
  const [testerEmail, setTesterEmail] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    setBusy(true);
    setCopied(false);
    setResult(null);

    try {
      const response = await fetch("https://api.vcl.article6.org/alpha/admin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Scoop-Admin-Token": adminToken },
        body: JSON.stringify({ invite_id: inviteId, ttl_days: 7, max_installs: 2 }),
      });
      const invite = await response.json();

      if (!response.ok || !invite?.invite_url) {
        setResult({ error: invite?.error || "Could not create the Scoop invite." });
        return;
      }

      const emailResponse = await fetch("https://article6.org/api/scoop-alpha-invite-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Scoop-Admin-Token": adminToken,
        },
        body: JSON.stringify({
          name: testerName,
          email: testerEmail,
          invite_url: invite.invite_url,
        }),
      });
      const emailResult = await emailResponse.json().catch(() => ({}));

      setResult({
        invite_url: invite.invite_url,
        token: invite.token,
        email_sent: emailResponse.ok,
        email_error: emailResponse.ok ? undefined : (emailResult?.error || "Invite created, but email failed."),
      });
    } catch {
      setResult({ error: "Could not complete the Scoop invite flow." });
    } finally {
      setBusy(false);
    }
  }

  async function copyInvite() {
    if (!result?.invite_url) return;
    await navigator.clipboard.writeText(result.invite_url);
    setCopied(true);
  }

  const field = {
    width: "100%",
    boxSizing: "border-box" as const,
    padding: 14,
    border: "1px solid #d1d5db",
    borderRadius: 12,
    fontSize: 16,
    marginTop: 8,
  };

  return (
    <main style={{minHeight:"100vh",background:"#fff",color:"#111318",fontFamily:"Manrope,Arial,sans-serif",padding:"48px 24px"}}>
      <div style={{maxWidth:680,margin:"0 auto"}}>
        <div style={{fontWeight:800,fontSize:24,color:"#1769FF"}}>Scoop</div>
        <h1 style={{fontSize:42,letterSpacing:"-0.04em"}}>Approve alpha tester</h1>
        <p style={{color:"#6b7280"}}>Creates a personal Scoop invite and sends the tester their install email.</p>

        <label style={{display:"block",fontWeight:700,marginTop:24}}>Tester name</label>
        <input value={testerName} onChange={(e)=>setTesterName(e.target.value)} placeholder="Jane Doe" style={field} />

        <label style={{display:"block",fontWeight:700,marginTop:18}}>Tester email</label>
        <input type="email" value={testerEmail} onChange={(e)=>setTesterEmail(e.target.value)} placeholder="jane@example.com" style={field} />

        <label style={{display:"block",fontWeight:700,marginTop:18}}>Tester ID</label>
        <input value={inviteId} onChange={(e)=>setInviteId(e.target.value)} placeholder="jane-01" style={field} />

        <label style={{display:"block",fontWeight:700,marginTop:18}}>Admin token</label>
        <input type="password" value={adminToken} onChange={(e)=>setAdminToken(e.target.value)} style={field} />

        <button
          disabled={busy || !testerName || !testerEmail || !inviteId || !adminToken}
          onClick={generate}
          style={{marginTop:20,border:0,borderRadius:999,padding:"14px 20px",background:"#1769FF",color:"#fff",fontWeight:800,cursor:"pointer"}}
        >
          {busy ? "Approving…" : "Approve & send invite"}
        </button>

        {result?.error && (
          <pre style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere",marginTop:24,padding:18,borderRadius:14,background:"#f3f4f6"}}>
            {result.error}
          </pre>
        )}

        {result?.invite_url && (
          <div style={{marginTop:24,padding:18,borderRadius:14,background:"#f3f4f6"}}>
            <div style={{fontWeight:800,marginBottom:8,color:result.email_sent ? "#166534" : "#9a3412"}}>
              {result.email_sent ? "Invite email sent" : "Invite created; email not sent"}
            </div>
            {result.email_error && <div style={{marginBottom:12,color:"#9a3412"}}>{result.email_error}</div>}
            <div style={{fontWeight:700,marginBottom:10}}>Invite link</div>
            <div style={{overflowWrap:"anywhere",lineHeight:1.5}}>{result.invite_url}</div>
            <button onClick={copyInvite} style={{marginTop:14,border:"1px solid #d1d5db",borderRadius:999,padding:"10px 14px",background:"#fff",color:"#111318",fontWeight:700,cursor:"pointer"}}>
              {copied ? "Copied" : "Copy invite link"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
