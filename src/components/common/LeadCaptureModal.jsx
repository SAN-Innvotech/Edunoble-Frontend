import { useEffect, useState, useCallback } from "react";
import { getApiUrl } from "@/config/api";
import { trackEvent } from "@/utils/analytics";

const SESSION_KEY = "edunoble_lead_shown";
const TRIGGER_DELAY_MS = 30000;
const PHONE_REGEX = /^[6-9]\d{9}$/;

const GRADE_OPTIONS = [
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "Other",
];

const SUBJECT_OPTIONS = [
  "Mathematics",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "All Subjects",
  "Career Guidance",
];

const MODE_OPTIONS = ["Online", "Offline"];

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "16px",
    opacity: 0,
    transition: "opacity 280ms ease",
  },
  overlayVisible: {
    opacity: 1,
  },
  card: {
    position: "relative",
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "480px",
    maxHeight: "92vh",
    overflowY: "auto",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
    transform: "translateY(12px)",
    transition: "transform 280ms ease, opacity 280ms ease",
    opacity: 0,
    fontFamily: "inherit",
  },
  cardVisible: {
    transform: "translateY(0)",
    opacity: 1,
  },
  closeBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "transparent",
    border: "none",
    fontSize: "22px",
    lineHeight: 1,
    width: "32px",
    height: "32px",
    cursor: "pointer",
    color: "#6b7280",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    margin: "0 0 8px 0",
    fontSize: "24px",
    fontWeight: 700,
    color: "#111827",
    lineHeight: 1.25,
  },
  subhead: {
    margin: "0 0 22px 0",
    fontSize: "16px",
    color: "#6b7280",
    lineHeight: 1.4,
  },
  field: {
    marginBottom: "14px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#ffffff",
    color: "#111827",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  radioGroup: {
    display: "flex",
    gap: "16px",
    marginTop: "4px",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    color: "#374151",
    cursor: "pointer",
  },
  fieldError: {
    color: "#ef4444",
    fontSize: "12px",
    marginTop: "4px",
  },
  submitBtn: {
    width: "100%",
    padding: "14px",
    fontSize: "15px",
    fontWeight: 700,
    color: "#ffffff",
    backgroundColor: "#22C55E",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  submitBtnDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255, 255, 255, 0.4)",
    borderTopColor: "#ffffff",
    borderRadius: "50%",
    animation: "edunoble-lead-spin 0.8s linear infinite",
  },
  errorBanner: {
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
    padding: "10px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "12px",
  },
  thankYouWrap: {
    textAlign: "center",
    padding: "10px 0 4px 0",
  },
  thankYouIcon: {
    fontSize: "44px",
    marginBottom: "8px",
  },
  thankYouTitle: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 10px 0",
  },
  thankYouText: {
    fontSize: "15px",
    color: "#374151",
    lineHeight: 1.5,
    margin: "0 0 18px 0",
  },
  callLink: {
    color: "#22C55E",
    fontWeight: 700,
    textDecoration: "none",
  },
  whatsappBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    backgroundColor: "#25D366",
    color: "#ffffff",
    padding: "12px 22px",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "15px",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
  },
};

const spinnerKeyframes = `@keyframes edunoble-lead-spin { to { transform: rotate(360deg); } }`;

const initialForm = {
  name: "",
  phone: "",
  grade: "",
  subject: "",
  mode: "",
};

const LeadCaptureModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});

  const markShown = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage may be unavailable (e.g., private mode); fail silently.
    }
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
    // Trigger fade-in on next frame so the transition runs.
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
    markShown();
    // Wait for fade-out before unmounting.
    setTimeout(() => setIsOpen(false), 280);
  }, [markShown]);

  // Trigger setup: 30s timer + exit-intent mouseout listener.
  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadyShown = false;
    }
    if (alreadyShown) return undefined;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      openModal();
    };

    const timerId = setTimeout(trigger, TRIGGER_DELAY_MS);

    const handleMouseOut = (e) => {
      if (e.clientY < 0 && e.relatedTarget === null) {
        trigger();
      }
    };
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      clearTimeout(timerId);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [openModal]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (!PHONE_REGEX.test(form.phone.trim())) {
      errs.phone = "Enter a valid 10-digit Indian mobile number.";
    }
    if (!form.grade) errs.grade = "Please select a grade.";
    if (!form.subject) errs.subject = "Please select a subject.";
    if (!form.mode) errs.mode = "Please choose a preferred mode.";
    return errs;
  };

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch(getApiUrl("leads"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          number: form.phone.trim(),
          grade: form.grade,
          subject: `${form.subject} (${form.mode})`,
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
      setSubmitted(true);
      trackEvent("generate_lead", { method: "lead_modal" });
      markShown();
    } catch (err) {
      setError(err?.message || "Unable to submit right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!isOpen) return null;

  const overlayStyle = {
    ...styles.overlay,
    ...(visible ? styles.overlayVisible : {}),
  };
  const cardStyle = {
    ...styles.card,
    ...(visible ? styles.cardVisible : {}),
  };

  return (
    <div
      style={overlayStyle}
      onClick={handleBackdropClick}
      role="presentation"
      aria-hidden={!visible}
    >
      <style>{spinnerKeyframes}</style>
      <div
        style={cardStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edunoble-lead-heading"
      >
        <button
          type="button"
          onClick={closeModal}
          style={styles.closeBtn}
          aria-label="Close"
        >
          {"×"}
        </button>

        {submitted ? (
          <div style={styles.thankYouWrap}>
            <div style={styles.thankYouIcon} aria-hidden="true">
              {"🎉"}
            </div>
            <h3 style={styles.thankYouTitle}>Thank you!</h3>
            <p style={styles.thankYouText}>
              Our counsellor will reach out within 24 hours. Or call us now:{" "}
              <a href="tel:+918878868600" style={styles.callLink}>
                +91 8878868600
              </a>
            </p>
            <a
              href="https://wa.me/918878868600"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.whatsappBtn}
            >
              <span aria-hidden="true">{"💬"}</span>
              Chat on WhatsApp
            </a>
          </div>
        ) : (
          <>
            <h2 id="edunoble-lead-heading" style={styles.headline}>
              {"🎓 Get a Free Demo Class!"}
            </h2>
            <p style={styles.subhead}>
              Talk to our counsellor and find the right course for you.
            </p>

            {error ? <div style={styles.errorBanner}>{error}</div> : null}

            <form onSubmit={handleSubmit} noValidate>
              <div style={styles.field}>
                <label htmlFor="lead-name" style={styles.label}>
                  Name
                </label>
                <input
                  id="lead-name"
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                  style={{
                    ...styles.input,
                    ...(fieldErrors.name ? styles.inputError : {}),
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
                <label htmlFor="lead-phone" style={styles.label}>
                  Phone
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  inputMode="numeric"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  style={{
                    ...styles.input,
                    ...(fieldErrors.phone ? styles.inputError : {}),
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
                <label htmlFor="lead-grade" style={styles.label}>
                  Grade
                </label>
                <select
                  id="lead-grade"
                  value={form.grade}
                  onChange={handleChange("grade")}
                  style={{
                    ...styles.input,
                    ...(fieldErrors.grade ? styles.inputError : {}),
                  }}
                  required
                >
                  <option value="">Select your grade</option>
                  {GRADE_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {fieldErrors.grade ? (
                  <span style={styles.fieldError}>{fieldErrors.grade}</span>
                ) : null}
              </div>

              <div style={styles.field}>
                <label htmlFor="lead-subject" style={styles.label}>
                  Subject of interest
                </label>
                <select
                  id="lead-subject"
                  value={form.subject}
                  onChange={handleChange("subject")}
                  style={{
                    ...styles.input,
                    ...(fieldErrors.subject ? styles.inputError : {}),
                  }}
                  required
                >
                  <option value="">Select a subject</option>
                  {SUBJECT_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {fieldErrors.subject ? (
                  <span style={styles.fieldError}>{fieldErrors.subject}</span>
                ) : null}
              </div>

              <div style={styles.field}>
                <span style={styles.label}>Preferred mode</span>
                <div
                  style={styles.radioGroup}
                  role="radiogroup"
                  aria-label="Preferred mode"
                >
                  {MODE_OPTIONS.map((m) => (
                    <label key={m} style={styles.radioLabel}>
                      <input
                        type="radio"
                        name="lead-mode"
                        value={m}
                        checked={form.mode === m}
                        onChange={handleChange("mode")}
                        required
                      />
                      {m}
                    </label>
                  ))}
                </div>
                {fieldErrors.mode ? (
                  <span style={styles.fieldError}>{fieldErrors.mode}</span>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  ...styles.submitBtn,
                  ...(submitting ? styles.submitBtnDisabled : {}),
                }}
              >
                {submitting ? (
                  <>
                    <span style={styles.spinner} aria-hidden="true" />
                    Submitting...
                  </>
                ) : (
                  "Book My Free Demo"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadCaptureModal;
