import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import fangLogo from '../assets/images/logo_fang.png';

// Customizable X (Twitter) links - update these with your official X profile & tweet URLs
const X_PROFILE_URL = "https://x.com/fangonchain?s=11";
const X_PINNED_POST_URL = "https://x.com/fangonchain/status/2081787400255390061?s=46";

export default function WhitelistChecklist() {
  const [address, setAddress] = useState('');
  const [xHandle, setXHandle] = useState('');
  const [addressSubmitted, setAddressSubmitted] = useState(false);
  const [followedX, setFollowedX] = useState(false);
  const [retweetedPost, setRetweetedPost] = useState(false);
  const [alertChecked, setAlertChecked] = useState(false);
  const [taggedFriends, setTaggedFriends] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [attemptWarning, setAttemptWarning] = useState('');

  // Calculate completed steps count out of 6
  const completedCount = [
    addressSubmitted || address.trim().length > 0,
    xHandle.trim().length > 0,
    followedX,
    retweetedPost,
    alertChecked,
    taggedFriends
  ].filter(Boolean).length;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    setAddressSubmitted(true);
    
    // Log wallet address & X username to API & Google Sheet Webhook
    fetch('/api/wallet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: address.trim(),
        xHandle: xHandle.trim(),
        walletType: 'TRAIL_LIST_ENTRY'
      })
    }).then(res => res.json())
      .then(data => {
        if (data.webhookSuccess) {
          console.log("Successfully synced to Google Sheet!");
        }
      })
      .catch(err => console.error("Error logging whitelist entry:", err));
  };

  const handleFollowX = () => {
    setFollowedX(true);
    window.open(X_PROFILE_URL, '_blank');
  };

  const handleOpenPost = () => {
    setRetweetedPost(true);
    window.open(X_PINNED_POST_URL, '_blank');
  };

  const handleFinalChecklistSubmit = () => {
    if (!address.trim()) {
      alert("Please enter your Wallet / Whitelist Address in Step 1 first.");
      return;
    }

    const nextAttempts = attemptCount + 1;
    setAttemptCount(nextAttempts);

    const isAllTasksDone = completedCount >= 5 || (addressSubmitted && xHandle.trim().length > 0 && followedX && retweetedPost && alertChecked && taggedFriends);

    // If all tasks are completed OR if the user has reached 4 attempts, force auto-verify & show green box!
    if (isAllTasksDone || nextAttempts >= 4) {
      setSubmissionSuccess(true);
      setAttemptWarning('');

      // Auto check address & handle state
      setAddressSubmitted(true);
      if (!followedX) setFollowedX(true);
      if (!retweetedPost) setRetweetedPost(true);
      if (!alertChecked) setAlertChecked(true);
      if (!taggedFriends) setTaggedFriends(true);

      // Sync final checklist entry to backend & Google Sheet
      fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: address.trim(),
          xHandle: xHandle.trim(),
          walletType: 'TRAIL_LIST_VERIFIED_COMPLETE'
        })
      }).catch(err => console.error("Error confirming whitelist entry:", err));
    } else {
      setAttemptWarning(`Verification Check Attempt ${nextAttempts}/4: Please make sure all steps are checked above. (Will auto-confirm on attempt 4)`);
    }
  };

  return (
    <section id="whitelist-section" className="relative z-10 py-20 border-t border-[rgba(143,227,138,0.18)] bg-[#050e0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-10 font-display">
          <h2 className="font-black text-4xl sm:text-5xl md:text-6xl text-[#ece6d6] tracking-wide uppercase leading-none mb-3">
            PROVE YOU'RE PACK MATERIAL
          </h2>
          <p className="text-[#a39d8c] font-mono text-xs sm:text-sm max-w-2xl">
            Six steps. No transaction, no gas — just your name carved into the trail list before mint.
          </p>
        </div>

        {/* Outer Card Grid Layout */}
        <div className="box-3d-deep grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-[12px_12px_0px_#020805,0_20px_50px_rgba(0,0,0,0.85)]">
          
          {/* Left Panel: Circular Radar & Branding */}
          <div className="lg:col-span-4 bg-[#07130e] p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-[rgba(143,227,138,0.15)] relative min-h-[300px]">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8fe38a_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Radar Circular Target */}
            <div className="relative w-48 h-48 rounded-full border border-[#8fe38a]/20 flex items-center justify-center">
              <div className="absolute w-36 h-36 rounded-full border border-dashed border-[#8fe38a]/30 animate-[spin_20s_linear_infinite]" />
              <div className="w-24 h-24 rounded-full border border-[#8fe38a]/40 overflow-hidden p-1 bg-[#0d2218] shadow-[0_0_20px_rgba(143,227,138,0.3)]">
                <img src={fangLogo} alt="FANG Logo" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>

            <div className="mt-8 text-center font-mono relative z-10">
              <span className="text-[10px] text-[#8fe38a] font-bold uppercase tracking-widest block mb-1">// TRAIL_LIST_SYSTEM</span>
              <span className="text-xs text-[#a39d8c] uppercase font-semibold">VERIFICATION_STATUS</span>
              <div className="mt-2 text-2xl font-black text-[#ece6d6]">
                {completedCount === 6 ? "PACK READY" : `${6 - completedCount} STEPS REMAINING`}
              </div>
            </div>
          </div>

          {/* Right Panel: The Checklist Form */}
          <div className="lg:col-span-8 p-6 sm:p-10 font-mono">
            
            {/* Header statistics bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(143,227,138,0.15)] mb-8">
              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#ece6d6] uppercase tracking-wider">
                  THE WHITELIST CHECKLIST
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 bg-[#081410] border border-[#8fe38a]/30 px-3 py-1.5 text-xs font-bold text-[#8fe38a] uppercase tracking-widest self-start sm:self-auto">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{completedCount} / 6 COMPLETE</span>
              </div>
            </div>



            {/* Checklist Items */}
            <div className="space-y-8">
              
              {/* Step 1: Wallet address / Whitelist handle */}
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 flex items-center justify-center font-bold text-xs flex-shrink-0 border ${addressSubmitted ? 'bg-[#8fe38a] text-[#081410] border-[#8fe38a]' : 'border-[rgba(143,227,138,0.3)] text-[#a39d8c]'}`}>
                  {addressSubmitted ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-sm text-[#ece6d6] uppercase">Wallet / Whitelist Address</h4>
                  <p className="text-xs text-[#a39d8c] mt-0.5 mb-3">Carve your Ethereum address or identifier into the pack list.</p>
                  
                  {!addressSubmitted ? (
                    <form onSubmit={handleAddressSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Paste Ethereum address (0x...) or ID"
                        className="flex-1 bg-[#07130e] border border-[rgba(143,227,138,0.3)] focus:border-[#8fe38a] px-3.5 py-2.5 text-xs text-[#ece6d6] outline-none"
                      />
                      <button
                        type="submit"
                        className="btn-fang-primary text-xs uppercase px-5 py-2.5 cursor-pointer font-bold"
                      >
                        SAVE ADDRESS
                      </button>
                    </form>
                  ) : (
                    <div className="inline-flex items-center gap-2 bg-[#07130e] border border-[#8fe38a]/40 px-3 py-1.5 text-xs text-[#8fe38a] font-bold">
                      <Check className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[220px]">{address}</span>
                      <button onClick={() => setAddressSubmitted(false)} className="text-[10px] text-[#a39d8c] underline ml-2 cursor-pointer hover:text-[#ece6d6]">Edit</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2: X username */}
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 flex items-center justify-center font-bold text-xs flex-shrink-0 border ${xHandle.trim().length > 0 ? 'bg-[#8fe38a] text-[#081410] border-[#8fe38a]' : 'border-[rgba(143,227,138,0.3)] text-[#a39d8c]'}`}>
                  {xHandle.trim().length > 0 ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-sm text-[#ece6d6] uppercase">X Username</h4>
                  <p className="text-xs text-[#a39d8c] mt-0.5 mb-3">So we know who to notify when the trail opens.</p>
                  <input
                    type="text"
                    value={xHandle}
                    onChange={(e) => setXHandle(e.target.value)}
                    placeholder="@yourhandle"
                    className="max-w-md w-full bg-[#07130e] border border-[rgba(143,227,138,0.3)] focus:border-[#8fe38a] px-3.5 py-2.5 text-xs text-[#ece6d6] outline-none"
                  />
                </div>
              </div>

              {/* Step 3: Follow Fangonchain */}
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 flex items-center justify-center font-bold text-xs flex-shrink-0 border ${followedX ? 'bg-[#8fe38a] text-[#081410] border-[#8fe38a]' : 'border-[rgba(143,227,138,0.3)] text-[#a39d8c]'}`}>
                  {followedX ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-sm text-[#ece6d6] uppercase">Follow Fangonchain</h4>
                  <p className="text-xs text-[#a39d8c] mt-0.5 mb-3">Follow the pack's home base on X.</p>
                  <button
                    onClick={handleFollowX}
                    className="btn-fang-ghost text-xs uppercase px-4 py-2 font-bold cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>{followedX ? 'FOLLOWED ON X ✓' : 'FOLLOW ON X'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Step 4: Like & retweet post */}
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 flex items-center justify-center font-bold text-xs flex-shrink-0 border ${retweetedPost ? 'bg-[#8fe38a] text-[#081410] border-[#8fe38a]' : 'border-[rgba(143,227,138,0.3)] text-[#a39d8c]'}`}>
                  {retweetedPost ? <Check className="w-4 h-4 stroke-[3]" /> : '4'}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-sm text-[#ece6d6] uppercase">Like & Retweet the Post</h4>
                  <p className="text-xs text-[#a39d8c] mt-0.5 mb-3">Boost the pinned announcement.</p>
                  <button
                    onClick={handleOpenPost}
                    className="btn-fang-ghost text-xs uppercase px-4 py-2 font-bold cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>{retweetedPost ? 'OPENED POST ✓' : 'OPEN THE POST'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Step 5: Stay alert checkbox */}
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 flex items-center justify-center font-bold text-xs flex-shrink-0 border ${alertChecked ? 'bg-[#8fe38a] text-[#081410] border-[#8fe38a]' : 'border-[rgba(143,227,138,0.3)] text-[#a39d8c]'}`}>
                  {alertChecked ? <Check className="w-4 h-4 stroke-[3]" /> : '5'}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-sm text-[#ece6d6] uppercase">Stay Alert for Spots</h4>
                  <p className="text-xs text-[#a39d8c] mt-0.5 mb-3">Trail list spots open without much warning. Turn on notifications.</p>
                  
                  <label className="inline-flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={alertChecked}
                      onChange={(e) => setAlertChecked(e.target.checked)}
                      className="w-4 h-4 accent-[#e05a3a] cursor-pointer"
                    />
                    <span className="text-xs font-bold text-[#ece6d6]">I'll stay alert</span>
                  </label>
                </div>
              </div>

              {/* Step 6: Tag 3 friends checkbox */}
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 flex items-center justify-center font-bold text-xs flex-shrink-0 border ${taggedFriends ? 'bg-[#8fe38a] text-[#081410] border-[#8fe38a]' : 'border-[rgba(143,227,138,0.3)] text-[#a39d8c]'}`}>
                  {taggedFriends ? <Check className="w-4 h-4 stroke-[3]" /> : '6'}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-sm text-[#ece6d6] uppercase">Tag 3 Friends in the Comments</h4>
                  <p className="text-xs text-[#a39d8c] mt-0.5 mb-3">Drop 3 names under the pinned post — the pack grows together.</p>
                  
                  <label className="inline-flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={taggedFriends}
                      onChange={(e) => setTaggedFriends(e.target.checked)}
                      className="w-4 h-4 accent-[#e05a3a] cursor-pointer"
                    />
                    <span className="text-xs font-bold text-[#ece6d6]">Done — I tagged 3 friends</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Submission / Confirmation */}
            <div className="mt-10 pt-6 border-t border-[rgba(143,227,138,0.15)] flex flex-col items-center sm:items-start text-left w-full">
              {submissionSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full bg-[#081e13] border-2 border-[#8fe38a] p-6 rounded-xl text-[#8fe38a] shadow-[0_0_30px_rgba(143,227,138,0.35)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#8fe38a]/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#8fe38a]/20 border border-[#8fe38a] flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(143,227,138,0.5)]">
                      <ShieldCheck className="w-7 h-7 text-[#8fe38a]" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="inline-block px-2.5 py-0.5 rounded bg-[#8fe38a] text-black font-black text-[10px] uppercase tracking-widest mb-2">
                        VERIFIED & REGISTERED ✓
                      </div>
                      <h5 className="font-display font-black text-xl sm:text-2xl text-[#ece6d6] uppercase tracking-wide leading-tight">
                        TRAIL LIST SPOTS CONFIRMED!
                      </h5>
                      <p className="text-xs sm:text-sm text-[#8fe38a] font-medium mt-2 leading-relaxed">
                        Your wallet address and X handle are successfully carved into our pack ledger. <strong className="text-white underline">Please wait for spots allocation in the box</strong> — stay alert on X (@Fangonchain) for spot drop notifications!
                      </p>

                      <div className="mt-4 pt-4 border-t border-[#8fe38a]/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="bg-[#030d07] p-2.5 rounded border border-[#8fe38a]/30">
                          <span className="text-[10px] text-[#a39d8c] uppercase block font-bold">Registered Wallet</span>
                          <span className="text-[#ece6d6] font-mono font-bold truncate block">{address}</span>
                        </div>
                        <div className="bg-[#030d07] p-2.5 rounded border border-[#8fe38a]/30">
                          <span className="text-[10px] text-[#a39d8c] uppercase block font-bold">X Handle</span>
                          <span className="text-[#8fe38a] font-mono font-bold truncate block">{xHandle || "Not provided"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="w-full">
                  <button
                    onClick={handleFinalChecklistSubmit}
                    className="btn-fang-primary w-full sm:w-auto px-8 py-3.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(224,90,58,0.3)] hover:scale-105 transition-transform"
                  >
                    <span>CONFIRM WHITELIST SPOTS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {attemptWarning && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-amber-950/80 border border-amber-500/60 text-amber-300 font-mono text-xs rounded"
                    >
                      ⚠️ {attemptWarning}
                    </motion.div>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
