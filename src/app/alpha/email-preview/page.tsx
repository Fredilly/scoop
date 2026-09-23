import type { Metadata } from "next";

export const metadata: Metadata = { title: "Scoop Alpha Email Preview", robots: { index: false, follow: false } };

export default function EmailPreview() {
  return (
    <main style={{minHeight:"100vh",background:"#f3f4f6",padding:"48px 20px",fontFamily:"Manrope,Arial,sans-serif",color:"#111318"}}>
      <article style={{maxWidth:640,margin:"0 auto",background:"#fff",borderRadius:24,padding:"42px 38px",boxShadow:"0 8px 30px rgba(17,19,24,.08)"}}>
        <div style={{fontWeight:800,fontSize:24,color:"#1769FF"}}>Scoop</div>
        <div style={{marginTop:40,fontSize:12,fontWeight:800,letterSpacing:".14em",color:"#1769FF"}}>FOUNDING ALPHA</div>
        <h1 style={{fontSize:48,lineHeight:1,letterSpacing:"-.04em",margin:"12px 0 20px"}}>You’re in.</h1>
        <p style={{fontSize:18,lineHeight:1.6}}>You’re one of the first people getting access to Scoop.</p>
        <p style={{fontSize:18,lineHeight:1.6,fontWeight:700}}>See something you want in a video. Click it. Scoop finds where to buy it.</p>
        <a href="https://scoop.article6.org/alpha?code={{invite_code}}" style={{display:"inline-block",margin:"18px 0 22px",padding:"14px 22px",borderRadius:999,background:"#1769FF",color:"#fff",fontWeight:800,textDecoration:"none"}}>Install Scoop →</a>
        <p style={{lineHeight:1.7}}>Works with <b>Chrome and Brave</b>. Your invite is personal and activates up to two browser installs.</p>
        <div style={{height:1,background:"#e5e7eb",margin:"30px 0"}} />
        <h2 style={{fontSize:20}}>Try it</h2>
        <ol style={{lineHeight:1.8,paddingLeft:22}}>
          <li>Open a YouTube video.</li>
          <li>See something you want.</li>
          <li>Click Scoop and select the item.</li>
          <li>Use 👍 or 👎 on the result.</li>
        </ol>
        <p style={{lineHeight:1.7,color:"#4b5563"}}>Bad results are useful right now. Your feedback helps Scoop learn which product mappings are useful and which are wrong.</p>
        <p style={{marginTop:32,lineHeight:1.7}}>Fred<br/>Founder, Scoop</p>
        <div style={{marginTop:32,fontWeight:800,color:"#1769FF"}}>See it. Scoop it.</div>
      </article>
    </main>
  );
}
