import { useEffect, useRef, useState } from "react";
import { getApiUrl } from "@/config/api";
import { trackEvent } from "@/utils/analytics";

// 10-digit Indian mobile validation (mirrors LeadCaptureModal.jsx)
const PHONE_REGEX = /^[6-9]\d{9}$/;

const GREETING =
  "Hi! 👋 I'm the EduNoble Assistant. Ask me about our Commerce programs, " +
  "admissions, the founder — anything about EduNoble. How can I help?";

const CLASS_OPTIONS = ["Class 9", "Class 10", "Class 11", "Class 12", "Other"];

const WHATSAPP_HREF = "https://wa.me/918878868699?text=Hi%20EduNoble";

// Brand palette
const C = {
  navy: "#1a1050",
  navyDark: "#140342",
  green: "#22C55E",
  greenBright: "#00e5a0",
};

const keyframes = `
@keyframes edunoble-chat-in {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes edunoble-chat-spin { to { transform: rotate(360deg); } }
@keyframes edunoble-chat-dot {
  0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-3px); }
}
`;

const styles = {
  launcher: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyDark} 100%)`,
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
    zIndex: 9999,
    transition: "transform 0.2s ease",
    padding: 0,
  },
  panel: {
    position: "fixed",
    bottom: "96px",
    right: "24px",
    width: "min(370px, calc(100vw - 32px))",
    height: "min(540px, calc(100vh - 130px))",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 18px 50px rgba(0,0,0,0.32)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 9999,
    fontFamily: "inherit",
    animation: "edunoble-chat-in 260ms ease",
  },
  header: {
    background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyDark} 100%)`,
    padding: "16px 18px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderBottom: `2px solid ${C.green}`,
    flexShrink: 0,
  },
  headerAvatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${C.green} 0%, ${C.greenBright} 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  headerTextWrap: { flex: 1, minWidth: 0 },
  headerTitle: {
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 700,
    margin: 0,
    lineHeight: 1.2,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "12px",
    margin: "2px 0 0 0",
    lineHeight: 1.3,
  },
  headerClose: {
    background: "rgba(255,255,255,0.12)",
    border: "none",
    color: "#ffffff",
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "18px",
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  actionsRow: {
    display: "flex",
    gap: "8px",
    padding: "10px 12px",
    background: "#f5f4fb",
    borderBottom: "1px solid #e8e8f0",
    flexShrink: 0,
  },
  actionBtn: {
    flex: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontSize: "12px",
    fontWeight: 600,
    padding: "8px 6px",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none",
    border: "1px solid transparent",
    lineHeight: 1.2,
    textAlign: "center",
  },
  callbackBtn: {
    background: C.navy,
    color: "#ffffff",
  },
  whatsappBtn: {
    background: "#25D366",
    color: "#ffffff",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#fbfbfd",
  },
  bubbleBase: {
    maxWidth: "82%",
    padding: "10px 13px",
    fontSize: "14px",
    lineHeight: 1.5,
    borderRadius: "14px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  bubbleAssistant: {
    alignSelf: "flex-start",
    background: "#eef0f4",
    color: "#1f2233",
    borderBottomLeftRadius: "4px",
  },
  bubbleUser: {
    alignSelf: "flex-end",
    background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyDark} 100%)`,
    color: "#ffffff",
    borderBottomRightRadius: "4px",
  },
  typingWrap: {
    alignSelf: "flex-start",
    background: "#eef0f4",
    borderRadius: "14px",
    borderBottomLeftRadius: "4px",
    padding: "12px 14px",
    display: "flex",
    gap: "4px",
  },
  typingDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#9aa0b4",
    animation: "edunoble-chat-dot 1.2s infinite ease-in-out",
  },
  inputRow: {
    display: "flex",
    gap: "8px",
    padding: "12px",
    borderTop: "1px solid #e8e8f0",
    background: "#ffffff",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    outline: "none",
    color: "#111827",
    fontFamily: "inherit",
    minWidth: 0,
  },
  sendBtn: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    background: `linear-gradient(135deg, ${C.green} 0%, ${C.greenBright} 100%)`,
    border: "none",
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  // Callback form
  formWrap: {
    flex: 1,
    overflowY: "auto",
    padding: "18px 16px",
    background: "#fbfbfd",
  },
  formTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: C.navy,
    margin: "0 0 4px 0",
  },
  formIntro: {
    fontSize: "13px",
    color: "#6b7280",
    margin: "0 0 16px 0",
    lineHeight: 1.4,
  },
  field: { marginBottom: "12px", display: "flex", flexDirection: "column" },
  label: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "5px",
  },
  fieldInput: {
    width: "100%",
    padding: "9px 11px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#ffffff",
    color: "#111827",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  fieldInputError: { borderColor: "#ef4444" },
  fieldError: { color: "#ef4444", fontSize: "11px", marginTop: "4px" },
  errorBanner: {
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
    padding: "9px 11px",
    borderRadius: "8px",
    fontSize: "12px",
    marginBottom: "12px",
  },
  formBtnRow: { display: "flex", gap: "8px", marginTop: "6px" },
  formSubmit: {
    flex: 1,
    padding: "11px",
    fontSize: "14px",
    fontWeight: 700,
    color: "#ffffff",
    backgroundColor: C.green,
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  formCancel: {
    padding: "11px 16px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#374151",
    backgroundColor: "#eef0f4",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  btnDisabled: { opacity: 0.65, cursor: "not-allowed" },
  spinner: {
    width: "15px",
    height: "15px",
    border: "2px solid rgba(255,255,255,0.4)",
    borderTopColor: "#ffffff",
    borderRadius: "50%",
    animation: "edunoble-chat-spin 0.8s linear infinite",
  },
};

// Inline SVG icons
const ChatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="28"
    height="28"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 2C6.486 2 2 6.038 2 11c0 2.7 1.32 5.11 3.4 6.74V22l3.94-2.17c.85.21 1.74.33 2.66.33 5.514 0 10-4.038 10-9S17.514 2 12 2zm-4 8a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 8 10zm4 0a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 12 10zm4 0a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 16 10z" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="26"
    height="26"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const initialForm = { name: "", phone: "", grade: "" };

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: GREETING },
  ]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);

  // Callback-request form state
  const [showCallback, setShowCallback] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to the newest message / typing indicator.
  useEffect(() => {
    if (open && !showCallback) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, open, showCallback]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open && !showCallback) {
      const id = setTimeout(() => inputRef.current?.focus(), 280);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [open, showCallback]);

  const togglePanel = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) trackEvent("chatbot_open", { method: "chatbot" });
      return next;
    });
  };

  const closePanel = () => setOpen(false);

  const sendMessage = async () => {
    const text = draft.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setDraft("");
    setLoading(true);
    trackEvent("chatbot_message", { method: "chatbot" });

    try {
      const response = await fetch(getApiUrl("chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      if (!response.ok) throw new Error("Request failed");
      const result = await response.json();
      const reply = result?.data?.reply;
      if (!reply) throw new Error("Empty reply");
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble right now — please try again, or " +
            "reach us on WhatsApp.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openCallback = () => {
    setShowCallback(true);
    setFormError("");
    setFieldErrors({});
    trackEvent("chatbot_callback_open", { method: "chatbot" });
  };

  const handleFormChange = (key) => (e) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (!PHONE_REGEX.test(form.phone.trim())) {
      errs.phone = "Enter a valid 10-digit Indian mobile number.";
    }
    if (!form.grade) errs.grade = "Please select a class.";
    return errs;
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setFormError("");
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setSubmitting(true);
    const name = form.name.trim();
    try {
      const response = await fetch(getApiUrl("leads"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          number: form.phone.trim(),
          grade: form.grade,
          subject: "Website chatbot — callback request",
        }),
      });
      if (!response.ok) {
        let message = "Something went wrong. Please try again.";
        try {
          const data = await response.json();
          if (data?.message) message = data.message;
          else if (data?.error) message = data.error;
        } catch {
          // ignore JSON parse errors
        }
        throw new Error(message);
      }
      trackEvent("generate_lead", { method: "chatbot_callback" });
      setShowCallback(false);
      setForm(initialForm);
      setFieldErrors({});
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Thanks, ${name}! Our counsellor will call you soon. 📞`,
        },
      ]);
    } catch (err) {
      setFormError(
        err?.message || "Unable to submit right now. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{keyframes}</style>

      {open ? (
        <div
          style={styles.panel}
          role="dialog"
          aria-label="EduNoble Assistant chat"
        >
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerAvatar} aria-hidden="true">
              <ChatIcon />
            </div>
            <div style={styles.headerTextWrap}>
              <p style={styles.headerTitle}>EduNoble Assistant</p>
              <p style={styles.headerSubtitle}>
                Ask about courses, admissions &amp; more
              </p>
            </div>
            <button
              type="button"
              onClick={closePanel}
              style={styles.headerClose}
              aria-label="Close chat"
            >
              {"×"}
            </button>
          </div>

          {/* Action buttons */}
          <div style={styles.actionsRow}>
            <button
              type="button"
              onClick={openCallback}
              style={{ ...styles.actionBtn, ...styles.callbackBtn }}
            >
              <span aria-hidden="true">{"📞"}</span>
              Request a callback
            </button>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.actionBtn, ...styles.whatsappBtn }}
              onClick={() =>
                trackEvent("contact", { method: "chatbot_whatsapp" })
              }
            >
              <span aria-hidden="true">{"💬"}</span>
              WhatsApp
            </a>
          </div>

          {showCallback ? (
            /* Callback request form */
            <div style={styles.formWrap}>
              <h3 style={styles.formTitle}>Request a callback</h3>
              <p style={styles.formIntro}>
                Share your details and our counsellor will call you back.
              </p>

              {formError ? (
                <div style={styles.errorBanner}>{formError}</div>
              ) : null}

              <form onSubmit={handleCallbackSubmit} noValidate>
                <div style={styles.field}>
                  <label htmlFor="chatbot-cb-name" style={styles.label}>
                    Name
                  </label>
                  <input
                    id="chatbot-cb-name"
                    type="text"
                    value={form.name}
                    onChange={handleFormChange("name")}
                    style={{
                      ...styles.fieldInput,
                      ...(fieldErrors.name ? styles.fieldInputError : {}),
                    }}
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                  />
                  {fieldErrors.name ? (
                    <span style={styles.fieldError}>{fieldErrors.name}</span>
                  ) : null}
                </div>

                <div style={styles.field}>
                  <label htmlFor="chatbot-cb-phone" style={styles.label}>
                    Phone
                  </label>
                  <input
                    id="chatbot-cb-phone"
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={handleFormChange("phone")}
                    style={{
                      ...styles.fieldInput,
                      ...(fieldErrors.phone ? styles.fieldInputError : {}),
                    }}
                    placeholder="10-digit mobile number"
                    autoComplete="tel"
                    maxLength={10}
                    required
                  />
                  {fieldErrors.phone ? (
                    <span style={styles.fieldError}>{fieldErrors.phone}</span>
                  ) : null}
                </div>

                <div style={styles.field}>
                  <label htmlFor="chatbot-cb-grade" style={styles.label}>
                    Class
                  </label>
                  <select
                    id="chatbot-cb-grade"
                    value={form.grade}
                    onChange={handleFormChange("grade")}
                    style={{
                      ...styles.fieldInput,
                      ...(fieldErrors.grade ? styles.fieldInputError : {}),
                    }}
                    required
                  >
                    <option value="">Select your class</option>
                    {CLASS_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.grade ? (
                    <span style={styles.fieldError}>{fieldErrors.grade}</span>
                  ) : null}
                </div>

                <div style={styles.formBtnRow}>
                  <button
                    type="button"
                    onClick={() => setShowCallback(false)}
                    style={styles.formCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      ...styles.formSubmit,
                      ...(submitting ? styles.btnDisabled : {}),
                    }}
                  >
                    {submitting ? (
                      <>
                        <span style={styles.spinner} aria-hidden="true" />
                        Submitting...
                      </>
                    ) : (
                      "Request callback"
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div style={styles.messages}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      ...styles.bubbleBase,
                      ...(msg.role === "user"
                        ? styles.bubbleUser
                        : styles.bubbleAssistant),
                    }}
                  >
                    {msg.content}
                  </div>
                ))}
                {loading ? (
                  <div style={styles.typingWrap} aria-label="Assistant is typing">
                    <span style={styles.typingDot} />
                    <span
                      style={{ ...styles.typingDot, animationDelay: "0.15s" }}
                    />
                    <span
                      style={{ ...styles.typingDot, animationDelay: "0.3s" }}
                    />
                  </div>
                ) : null}
                <div ref={messagesEndRef} />
              </div>

              {/* Input row */}
              <div style={styles.inputRow}>
                <input
                  ref={inputRef}
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type your message..."
                  style={styles.input}
                  disabled={loading}
                  aria-label="Message"
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={loading || !draft.trim()}
                  style={{
                    ...styles.sendBtn,
                    ...(loading || !draft.trim() ? styles.btnDisabled : {}),
                  }}
                  aria-label="Send message"
                >
                  <SendIcon />
                </button>
              </div>
            </>
          )}
        </div>
      ) : null}

      {/* Launcher button */}
      <button
        type="button"
        onClick={togglePanel}
        style={styles.launcher}
        aria-label={open ? "Close chat" : "Open EduNoble Assistant chat"}
        aria-expanded={open}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>
    </>
  );
};

export default ChatBot;
