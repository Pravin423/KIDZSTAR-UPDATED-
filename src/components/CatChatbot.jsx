"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

// ── Navigation routes the bot knows about ──────────────────────────────────
const ROUTES = {
    home: "/",
    about: "/about",
    programs: "/programs",
    admission: "/admission",
    contact: "/contact",
    gallery: "/gallery",
};

// ── Conversation flow steps ────────────────────────────────────────────────
const STEPS = [
    {
        id: "welcome", bot: "Meow! 🐾 I'm Kidzstar's little helper! What would you like to do?", type: "menu",
        options: [
            { label: "📋 Admission Enquiry", next: "childName" },
            { label: "📍 Navigate to a page", next: "navigate" },
            { label: "📞 Contact info", next: "contactInfo" },
        ]
    },
    {
        id: "navigate", bot: "Sure! Where would you like to go?", type: "menu",
        options: [
            { label: "🏠 Home", action: "nav", route: "/" },
            { label: "ℹ️ About Us", action: "nav", route: "/about" },
            { label: "📚 Programs", action: "nav", route: "/programs" },
            { label: "🎓 Admission", action: "nav", route: "/admission" },
            { label: "📞 Contact", action: "nav", route: "/contact" },
            { label: "🖼️ Gallery", action: "nav", route: "/gallery" },
        ]
    },
    {
        id: "contactInfo", bot: "📞 Phone: +91 9876543210\n📧 Email: info@kidzstar.com\n📍 Address: Kidzstar Preschool, Your City\n\nWould you like to do anything else?", type: "menu",
        options: [
            { label: "📋 Start Enquiry", next: "childName" },
            { label: "👋 That's all, thanks!", next: "bye" },
        ]
    },
    { id: "childName", bot: "Great! Let's get your enquiry started 🌟\n\nWhat is your child's name?", type: "input", field: "childName", next: "parentName", validate: v => v.trim().length >= 2 ? null : "Please enter at least 2 characters." },
    { id: "parentName", bot: "Lovely! And your name (parent/guardian)?", type: "input", field: "parentName", next: "phone", validate: v => v.trim().length >= 2 ? null : "Please enter your name." },
    { id: "phone", bot: "What's the best phone number to reach you?", type: "input", field: "phone", next: "email", validate: v => /^[6-9]\d{9}$/.test(v.trim()) ? null : "Please enter a valid 10-digit Indian mobile number." },
    { id: "email", bot: "And your email address?", type: "input", field: "email", next: "program", validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : "Please enter a valid email." },
    {
        id: "program", bot: "Which program are you interested in?", type: "menu", field: "program",
        options: [
            { label: "🌱 Playgroup (2.5–3.5 yrs)", value: "Playgroup", next: "message" },
            { label: "🌼 Nursery (3.5–4.5 yrs)", value: "Nursery", next: "message" },
            { label: "⭐ Junior KG (4.5–5.5 yrs)", value: "Junior KG", next: "message" },
            { label: "🏆 Senior KG (5.5–6.5 yrs)", value: "Senior KG", next: "message" },
        ]
    },
    { id: "message", bot: "Any additional message or questions? (or type 'skip')", type: "input", field: "message", next: "confirm", validate: () => null },
    { id: "confirm", bot: null, type: "confirm" },
    { id: "submitting", bot: "Submitting your enquiry... ✨", type: "loading" },
    {
        id: "success", bot: "🎉 Enquiry submitted successfully!\n\nWe'll get back to you within 24 hours. Thank you for choosing Kidzstar! 🌟", type: "menu",
        options: [
            { label: "🏠 Go to Home", action: "nav", route: "/" },
            { label: "📋 New Enquiry", next: "childName" },
            { label: "👋 Close", action: "close" },
        ]
    },
    {
        id: "error", bot: "😿 Oops! Something went wrong. Please try again or call us directly at +91 9876543210.", type: "menu",
        options: [
            { label: "🔄 Try Again", next: "confirm" },
            { label: "👋 Close", action: "close" },
        ]
    },
    { id: "bye", bot: "Bye bye! 🐾 Come visit us anytime!", type: "end" },
];

const stepMap = Object.fromEntries(STEPS.map(s => [s.id, s]));

// ── Helper: format confirm message ────────────────────────────────────────
function confirmMsg(data) {
    return `Please confirm your details:\n\n👶 Child: ${data.childName}\n👤 Parent: ${data.parentName}\n📱 Phone: ${data.phone}\n📧 Email: ${data.email}\n📚 Program: ${data.program}\n💬 Message: ${data.message || "—"}\n\nShall I submit this?`;
}

export default function CatChatbot({ isOpen: propsOpen, onClose: propsOnClose, customTrigger = false }) {
    const router = useRouter();
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = typeof propsOpen !== "undefined";
    const open = isControlled ? propsOpen : internalOpen;
    const setOpen = (val) => {
        if (isControlled) {
            if (!val && propsOnClose) propsOnClose();
        } else {
            setInternalOpen(val);
        }
    };

    const [showPopup, setShowPopup] = useState(false);
    const [messages, setMessages] = useState([]);
    const [stepId, setStepId] = useState("welcome");
    const [inputVal, setInputVal] = useState("");
    const [inputErr, setInputErr] = useState("");
    const [formData, setFormData] = useState({});
    const [popupDismissed, setPopupDismissed] = useState(false);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    // Show popup after 2s, hide after 5s
    useEffect(() => {
        if (popupDismissed || open) return;
        const show = setTimeout(() => setShowPopup(true), 2000);
        const hide = setTimeout(() => setShowPopup(false), 7000);
        return () => { clearTimeout(show); clearTimeout(hide); };
    }, [popupDismissed, open]);

    // Push initial bot message when chat opens
    useEffect(() => {
        if (open && messages.length === 0) {
            pushBot(stepMap["welcome"]);
        }
    }, [open]);

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input
    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 100);
    }, [open, stepId]);

    function pushBot(step, overrideText) {
        const text = overrideText ?? step.bot;
        if (!text) return;
        setMessages(m => [...m, { from: "bot", text }]);
    }

    function pushUser(text) {
        setMessages(m => [...m, { from: "user", text }]);
    }

    function goToStep(id, extraData = {}) {
        const merged = { ...formData, ...extraData };
        setFormData(merged);
        const step = stepMap[id];
        if (!step) return;
        setStepId(id);
        setInputVal("");
        setInputErr("");

        if (id === "confirm") {
            pushBot(step, confirmMsg(merged));
        } else if (id === "submitting") {
            pushBot(step);
            submitForm(merged);
        } else if (step.bot) {
            pushBot(step);
        }
    }

    async function submitForm(data) {
        try {
            const res = await fetch("/api/admission", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    childName: data.childName,
                    parentName: data.parentName,
                    phone: data.phone,
                    email: data.email,
                    message: `Program: ${data.program}. ${data.message || ""}`.trim(),
                }),
            });
            if (!res.ok) throw new Error("Failed");
            goToStep("success");
        } catch {
            goToStep("error");
        }
    }

    function handleOptionClick(opt) {
        pushUser(opt.label);

        if (opt.action === "nav") {
            router.push(opt.route);
            return;
        }
        if (opt.action === "close") {
            setOpen(false);
            return;
        }
        // menu step with field (program picker)
        const currentStep = stepMap[stepId];
        if (currentStep.field && opt.value) {
            goToStep(opt.next, { [currentStep.field]: opt.value });
        } else {
            goToStep(opt.next);
        }
    }

    function handleInputSubmit() {
        const currentStep = stepMap[stepId];
        if (currentStep.type !== "input") return;
        const val = inputVal.trim() === "" && currentStep.field === "message" ? "—" : inputVal.trim();
        const err = currentStep.validate(val);
        if (err) { setInputErr(err); return; }
        pushUser(val === "—" ? "(no message)" : val);
        goToStep(currentStep.next, { [currentStep.field]: val });
    }

    function handleConfirmYes() {
        pushUser("✅ Yes, submit!");
        goToStep("submitting");
    }
    function handleConfirmNo() {
        pushUser("❌ Let me change something");
        setMessages(m => [...m, { from: "bot", text: "No problem! Which field would you like to change?" }]);
        setMessages(m => [...m, {
            from: "bot-menu",
            options: [
                { label: "👶 Child name", next: "childName" },
                { label: "👤 Parent name", next: "parentName" },
                { label: "📱 Phone", next: "phone" },
                { label: "📧 Email", next: "email" },
                { label: "📚 Program", next: "program" },
                { label: "💬 Message", next: "message" },
            ]
        }]);
        setStepId("editing");
    }

    function resetChat() {
        setMessages([]);
        setStepId("welcome");
        setFormData({});
        setInputVal("");
        setInputErr("");
        setTimeout(() => pushBot(stepMap["welcome"]), 100);
    }

    const currentStep = stepMap[stepId] || {};

    return (
        <>
            {/* ── Popup bubble ── */}
            <AnimatePresence>
                {showPopup && !open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        onClick={() => { setOpen(true); setShowPopup(false); setPopupDismissed(true); }}
                        style={{
                            position: "fixed",
                            bottom: "210px",
                            right: "24px",
                            zIndex: 9999,
                            background: "linear-gradient(135deg, #00218E, #1a3fa8)",
                            color: "#fff",
                            borderRadius: "18px 18px 4px 18px",
                            padding: "12px 18px",
                            maxWidth: "220px",
                            fontSize: "13px",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600,
                            cursor: "pointer",
                            boxShadow: "0 8px 32px rgba(0,33,142,0.35)",
                            lineHeight: 1.5,
                            userSelect: "none",
                        }}
                    >
                        😺 Meow! Let&apos;s connect!<br />
                        <span style={{ fontWeight: 400, fontSize: "11px", opacity: 0.85 }}>
                            Admission enquiry? I can help! 🌟
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Floating cat button ── */}
            {!customTrigger && (
                <motion.div
                    onClick={() => { setOpen(o => !o); setShowPopup(false); setPopupDismissed(true); }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    style={{
                        position: "fixed",
                        bottom: "28px",
                        right: "28px",
                        zIndex: 9999,
                        cursor: "pointer",
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #00218E 0%, #1a3fa8 100%)",
                        boxShadow: open
                            ? "0 0 0 4px #F5C842, 0 8px 32px rgba(0,33,142,0.4)"
                            : "0 4px 24px rgba(0,33,142,0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "36px",
                        transition: "box-shadow 0.3s",
                        userSelect: "none",
                    }}
                >
                    {open ? "✕" : "🐱"}
                </motion.div>
            )}

            {/* ── Chat window ── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 280, damping: 26 }}
                        style={{
                            position: "fixed",
                            bottom: "116px",
                            right: "28px",
                            zIndex: 9998,
                            width: "340px",
                            maxHeight: "520px",
                            borderRadius: "20px",
                            overflow: "hidden",
                            boxShadow: "0 20px 60px rgba(0,33,142,0.25), 0 4px 16px rgba(0,0,0,0.12)",
                            display: "flex",
                            flexDirection: "column",
                            fontFamily: "Poppins, sans-serif",
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            background: "linear-gradient(135deg, #00218E 0%, #1a3fa8 100%)",
                            padding: "14px 18px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flexShrink: 0,
                        }}>
                            <span style={{ fontSize: "28px" }}>🐱</span>
                            <div>
                                <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>Kidzstar Assistant</div>
                                <div style={{ color: "#F5C842", fontSize: "11px", fontWeight: 500 }}>● Online — here to help!</div>
                            </div>
                            <button
                                onClick={resetChat}
                                title="Restart chat"
                                style={{
                                    marginLeft: "auto", background: "rgba(255,255,255,0.15)",
                                    border: "none", borderRadius: "8px", color: "#fff",
                                    padding: "4px 8px", fontSize: "11px", cursor: "pointer",
                                    fontFamily: "Poppins, sans-serif",
                                }}
                            >↺ Restart</button>
                        </div>

                        {/* Messages */}
                        <div style={{
                            flex: 1,
                            overflowY: "auto",
                            padding: "14px 14px 8px",
                            background: "#f8faff",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}>
                            {messages.map((msg, i) => {
                                if (msg.from === "bot") return (
                                    <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                                        <span style={{ fontSize: "20px", flexShrink: 0 }}>🐱</span>
                                        <div style={{
                                            background: "#fff",
                                            border: "1px solid #e0e7ff",
                                            borderRadius: "16px 16px 16px 4px",
                                            padding: "10px 13px",
                                            fontSize: "12.5px",
                                            color: "#1e293b",
                                            maxWidth: "230px",
                                            lineHeight: 1.55,
                                            whiteSpace: "pre-line",
                                            boxShadow: "0 2px 8px rgba(0,33,142,0.06)",
                                        }}>{msg.text}</div>
                                    </div>
                                );
                                if (msg.from === "user") return (
                                    <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div style={{
                                            background: "linear-gradient(135deg, #00218E, #1a3fa8)",
                                            color: "#fff",
                                            borderRadius: "16px 16px 4px 16px",
                                            padding: "10px 13px",
                                            fontSize: "12.5px",
                                            maxWidth: "220px",
                                            lineHeight: 1.55,
                                            boxShadow: "0 2px 8px rgba(0,33,142,0.18)",
                                        }}>{msg.text}</div>
                                    </div>
                                );
                                if (msg.from === "bot-menu") return (
                                    <div key={i} style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingLeft: "28px" }}>
                                        {msg.options.map((opt, j) => (
                                            <button key={j} onClick={() => { pushUser(opt.label); goToStep(opt.next); }}
                                                style={optBtnStyle}>{opt.label}</button>
                                        ))}
                                    </div>
                                );
                                return null;
                            })}

                            {/* Current step options / input / confirm */}
                            {currentStep.type === "menu" && currentStep.options && (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingLeft: "28px" }}>
                                    {currentStep.options.map((opt, i) => (
                                        <button key={i} onClick={() => handleOptionClick(opt)} style={optBtnStyle}>
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {currentStep.type === "confirm" && (
                                <div style={{ display: "flex", gap: "8px", paddingLeft: "28px" }}>
                                    <button onClick={handleConfirmYes} style={{ ...optBtnStyle, background: "#00218E", color: "#fff" }}>
                                        ✅ Yes, submit!
                                    </button>
                                    <button onClick={handleConfirmNo} style={optBtnStyle}>
                                        ✏️ Edit
                                    </button>
                                </div>
                            )}

                            {currentStep.type === "loading" && (
                                <div style={{ paddingLeft: "28px", fontSize: "12px", color: "#64748b" }}>
                                    <span style={{ animation: "chatDots 1.2s infinite" }}>● ● ●</span>
                                </div>
                            )}

                            <div ref={bottomRef} />
                        </div>

                        {/* Input area */}
                        {currentStep.type === "input" && (
                            <div style={{
                                padding: "10px 12px",
                                background: "#fff",
                                borderTop: "1px solid #e0e7ff",
                                flexShrink: 0,
                            }}>
                                {inputErr && (
                                    <div style={{ color: "#ef4444", fontSize: "11px", marginBottom: "4px", paddingLeft: "4px" }}>
                                        ⚠️ {inputErr}
                                    </div>
                                )}
                                <div style={{ display: "flex", gap: "8px" }}>
                                    <input
                                        ref={inputRef}
                                        value={inputVal}
                                        onChange={e => { setInputVal(e.target.value); setInputErr(""); }}
                                        onKeyDown={e => e.key === "Enter" && handleInputSubmit()}
                                        placeholder={currentStep.field === "message" ? "Type or press Enter to skip..." : "Type your answer..."}
                                        style={{
                                            flex: 1,
                                            border: inputErr ? "1.5px solid #ef4444" : "1.5px solid #e0e7ff",
                                            borderRadius: "10px",
                                            padding: "8px 12px",
                                            fontSize: "12.5px",
                                            outline: "none",
                                            fontFamily: "Poppins, sans-serif",
                                            color: "#1e293b",
                                            background: "#f8faff",
                                        }}
                                    />
                                    <button
                                        onClick={handleInputSubmit}
                                        style={{
                                            background: "linear-gradient(135deg, #00218E, #1a3fa8)",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "10px",
                                            padding: "8px 14px",
                                            fontSize: "16px",
                                            cursor: "pointer",
                                        }}
                                    >➤</button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
        @keyframes chatDots {
          0%, 100% { opacity: 0.3 }
          50%       { opacity: 1 }
        }
      `}</style>
        </>
    );
}

const optBtnStyle = {
    background: "#fff",
    border: "1.5px solid #c7d2fe",
    borderRadius: "20px",
    padding: "6px 12px",
    fontSize: "11.5px",
    color: "#00218E",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
};
