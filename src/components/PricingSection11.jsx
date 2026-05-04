import React, { useEffect, useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeevadbw";
const verifiedBadgeIcon = "/icons/verified-badge-slate.png";
const billboardNote = "After 2 paid months";

const initialFormValues = {
  fullName: "",
  email: "",
  instagram: "",
  phone: "",
  city: "",
  role: "Model",
  details: "",
};

const comparisonFeatures = [
  { id: "collaboration", label: "Collaboration" },
  { id: "promotion", label: "Promotion" },
  { id: "editorial", label: "Editorial" },
  { id: "placement", label: "Placement" },
  { id: "cover", label: "Cover" },
  { id: "billboard", label: "NYC Billboard" },
  { id: "extras", label: "Discounts" },
];

const plans = [
  {
    id: "growth",
    title: "Growth",
    emoji: "👋",
    price: 49,
    desc: "Build your presence",
    paypalPlanId: "P-6YE201636M3399105NHUJI4Y",
    paypalUrl:
      "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-6YE201636M3399105NHUJI4Y",
    features: {
      collaboration: "Basic",
      promotion: "1-2 posts",
      editorial: "Included",
      placement: "Priority",
      cover: null,
      billboard: null,
      extras: null,
    },
  },
  {
    id: "elite",
    title: "Elite",
    emoji: "💪",
    price: 99,
    desc: "Grow your brand",
    popular: true,
    paypalPlanId: "P-2GS95942VA380420FNHNTIFY",
    paypalUrl:
      "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-2GS95942VA380420FNHNTIFY",
    features: {
      collaboration: "Priority",
      promotion: "Strong push",
      editorial: "Included",
      placement: "Priority",
      cover: "Opportunity",
      billboard: null,
      extras: "25% off",
    },
  },
  {
    id: "pro",
    title: "Pro",
    emoji: "💎",
    price: 149,
    desc: "Scale & go premium",
    paypalPlanId: "P-9HJ82138NM274991HNHUJMKQ",
    paypalUrl:
      "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-9HJ82138NM274991HNHUJMKQ",
    features: {
      collaboration: "Paid access",
      promotion: "Max push",
      editorial: "Included",
      placement: "Top priority",
      cover: "Included",
      billboard: "Starts month 3",
      extras: "35% off",
    },
  },
];

function getFormspreeErrorMessage(result) {
  if (!result || !Array.isArray(result.errors) || result.errors.length === 0) {
    return "We could not save your details right now. Please try again.";
  }

  return result.errors.map((item) => item.message).join(" ");
}

export default function PremiumPricing() {
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState("form");
  const [formValues, setFormValues] = useState(initialFormValues);
  const [submitState, setSubmitState] = useState({
    submitting: false,
    error: "",
    success: "",
  });

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) || null;

  const closeCheckout = () => {
    setSelectedPlanId(null);
    setCheckoutStep("form");
    setFormValues(initialFormValues);
    setSubmitState({
      submitting: false,
      error: "",
      success: "",
    });
  };

  useEffect(() => {
    if (!selectedPlan) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeCheckout();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedPlan]);

  const openCheckout = (planId) => {
    setSelectedPlanId(planId);
    setCheckoutStep("form");
    setFormValues(initialFormValues);
    setSubmitState({
      submitting: false,
      error: "",
      success: "",
    });
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedPlan) {
      return;
    }

    if (!selectedPlan.paypalUrl) {
      setSubmitState({
        submitting: false,
        error: `PayPal link missing for the ${selectedPlan.title} plan.`,
        success: "",
      });
      return;
    }

    setSubmitState({
      submitting: true,
      error: "",
      success: "",
    });

    const payload = new FormData();
    payload.append("_subject", `New ${selectedPlan.title} plan lead - $${selectedPlan.price}/month`);
    payload.append("plan_name", selectedPlan.title);
    payload.append("plan_price", `$${selectedPlan.price}/month`);
    payload.append("paypal_plan_id", selectedPlan.paypalPlanId);
    payload.append("paypal_checkout_url", selectedPlan.paypalUrl);
    payload.append("full_name", formValues.fullName.trim());
    payload.append("email", formValues.email.trim());
    payload.append("instagram", formValues.instagram.trim());
    payload.append("phone_number", formValues.phone.trim());
    payload.append("city", formValues.city.trim());
    payload.append("role", formValues.role);
    payload.append("other_details", formValues.details.trim() || "None provided");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setSubmitState({
          submitting: false,
          error: getFormspreeErrorMessage(result),
          success: "",
        });
        return;
      }

      setSubmitState({
        submitting: false,
        error: "",
        success: `Details saved for the ${selectedPlan.title} plan. Continue when you're ready.`,
      });
      setCheckoutStep("payment");
    } catch {
      setSubmitState({
        submitting: false,
        error: "Network error. Please try again.",
        success: "",
      });
    }
  };

  return (
    <>
      <style>{`
        .pricing-section-shell,
        .pricing-section-shell *,
        .checkout-overlay,
        .checkout-overlay * {
          box-sizing: border-box;
          font-family: 'Manrope', sans-serif;
        }

        .checkout-overlay {
          position: fixed;
          inset: 0;
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(24, 33, 39, 0.18);
          backdrop-filter: blur(10px);
        }

        .checkout-modal {
          position: relative;
          width: min(100%, 760px);
          max-height: min(92vh, 920px);
          overflow-y: auto;
          border-radius: 24px;
          border: 1px solid #e2e8ec;
          background: #ffffff;
          padding: 28px;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
          color: #182127;
        }

        .checkout-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          border: 1px solid #e2e8ec;
          border-radius: 999px;
          background: #ffffff;
          color: #60707a;
          font-size: 1.2rem;
          cursor: pointer;
        }

        .checkout-kicker {
          margin: 0 0 8px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #60707a;
        }

        .checkout-title {
          margin: 0;
          font-size: clamp(1.5rem, 2vw, 2rem);
          font-weight: 600;
          color: #182127;
        }

        .checkout-subtitle {
          margin: 12px 0 0;
          max-width: 560px;
          color: #60707a;
          font-size: 0.94rem;
          line-height: 1.6;
        }

        .checkout-plan-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .checkout-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 32px;
          padding: 0 14px;
          border-radius: 999px;
          background: #f3f5f6;
          color: #182127;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .checkout-chip-muted {
          background: #fafbfb;
          color: #60707a;
        }

        .checkout-form {
          margin-top: 24px;
        }

        .checkout-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .checkout-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .checkout-field-full {
          grid-column: 1 / -1;
        }

        .checkout-label {
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #60707a;
        }

        .checkout-field input,
        .checkout-field select,
        .checkout-field textarea {
          width: 100%;
          border: 1px solid #e2e8ec;
          border-radius: 14px;
          padding: 13px 14px;
          background: #ffffff;
          color: #182127;
          font-size: 0.94rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .checkout-field input:focus,
        .checkout-field select:focus,
        .checkout-field textarea:focus {
          border-color: #b6c2c9;
          box-shadow: 0 0 0 4px rgba(182, 194, 201, 0.18);
        }

        .checkout-field textarea {
          min-height: 120px;
          resize: vertical;
        }

        .checkout-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 20px;
        }

        .checkout-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 14px;
          min-height: 48px;
          padding: 0 18px;
          min-width: 168px;
          font-size: 0.94rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease, background 0.2s ease;
          text-decoration: none;
          white-space: nowrap;
        }

        .checkout-button-primary {
          background: #182127;
          color: #ffffff;
        }

        .checkout-button-secondary {
          background: #f3f5f6;
          color: #182127;
          border: 1px solid #e2e8ec;
        }

        .checkout-button:disabled {
          cursor: wait;
          opacity: 0.7;
        }

        .checkout-status {
          margin-top: 18px;
          border-radius: 16px;
          padding: 14px 16px;
          font-size: 0.92rem;
          line-height: 1.5;
        }

        .checkout-status-error {
          background: rgba(254, 226, 226, 0.8);
          color: #991b1b;
          border: 1px solid rgba(248, 113, 113, 0.24);
        }

        .checkout-status-success {
          background: #f7f8f8;
          color: #182127;
          border: 1px solid #e2e8ec;
        }

        .checkout-redirect-wrap {
          margin-top: 24px;
          display: grid;
          gap: 16px;
        }

        .checkout-redirect-panel {
          border-radius: 20px;
          padding: 18px;
          background: #fafbfb;
          border: 1px solid #e2e8ec;
        }

        .checkout-redirect-title {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: #182127;
        }

        .checkout-redirect-copy {
          margin: 8px 0 0;
          color: #60707a;
          font-size: 0.92rem;
          line-height: 1.55;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          align-items: stretch;
        }

        .plan-card {
          width: 100%;
          min-width: 0;
        }

        @media (max-width: 720px) {
          .checkout-overlay {
            padding: 16px;
          }

          .checkout-modal {
            padding: 22px 18px 18px;
          }

          .checkout-form-grid {
            grid-template-columns: 1fr;
          }

          .checkout-actions {
            flex-direction: column-reverse;
          }

          .checkout-button {
            width: 100%;
            justify-content: center;
            display: inline-flex;
            align-items: center;
          }
        }

        @media (max-width: 960px) {
          .plans-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section
        className="pricing-section-shell"
        style={{
          background: "transparent",
          padding: "0",
        }}
      >
        <div
          style={{
            maxWidth: "100%",
            margin: "0 auto",
            padding: "28px",
            borderRadius: "24px",
            background: "#ffffff",
            border: "1px solid #e2e8ec",
            boxShadow: "0 16px 36px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p
              style={{
                margin: 0,
                color: "#60707a",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              Service Plans
            </p>
            <h1
              style={{
                margin: "10px 0 0",
                fontSize: "clamp(1.9rem, 4vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#182127",
              }}
            >
              Plans for steady brand growth
            </h1>
            <p
              style={{
                color: "#60707a",
                margin: "12px auto 0",
                maxWidth: "620px",
                lineHeight: 1.7,
                fontSize: "0.95rem",
              }}
            >
              Compare the options, choose the level that fits best, and continue with a simple
              intake flow.
            </p>
          </div>

          <div className="plans-grid">
            {plans.map((plan, index) => {
              const isMiddle = index === 1;
              const baseTransform = isMiddle ? "scale(1.015)" : "scale(1)";
              const baseShadow = isMiddle
                ? "0 18px 34px rgba(15, 23, 42, 0.08)"
                : "0 10px 24px rgba(15, 23, 42, 0.05)";

              return (
                <div
                  key={plan.id}
                  className="plan-card"
                  style={{
                    padding: "24px",
                    borderRadius: "20px",
                    position: "relative",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    background: "#fafbfb",
                    border: "1px solid #e2e8ec",
                    boxShadow: baseShadow,
                    transform: baseTransform,
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = isMiddle
                      ? "translateY(-3px) scale(1.02)"
                      : "translateY(-3px) scale(1.01)";
                    event.currentTarget.style.boxShadow = "0 14px 28px rgba(15, 23, 42, 0.08)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = baseTransform;
                    event.currentTarget.style.boxShadow = baseShadow;
                  }}
                >
                  {plan.popular && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-14px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#182127",
                        color: "#fff",
                        fontSize: "12px",
                        padding: "6px 14px",
                        borderRadius: "999px",
                        fontWeight: 600,
                        boxShadow: "0 10px 20px rgba(15, 23, 42, 0.12)",
                      }}
                    >
                      Most popular
                    </div>
                  )}

                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#182127" }}>
                    {plan.title}
                  </h3>

                  <p style={{ color: "#60707a", margin: "8px 0 18px", fontSize: "0.94rem" }}>
                    {plan.desc}
                  </p>

                  <h2 style={{ fontSize: "36px", marginBottom: "18px", color: "#182127" }}>
                    ${plan.price}
                    <span style={{ fontSize: "13px", color: "#60707a" }}>/month</span>
                  </h2>

                  <ul
                    style={{
                      marginTop: "22px",
                      padding: 0,
                      listStyle: "none",
                      display: "grid",
                      gap: "10px",
                    }}
                  >
                    {comparisonFeatures.map((feature) => {
                      const featureValue = plan.features[feature.id];
                      const isIncluded = Boolean(featureValue);
                      const isSpotlight = feature.id === "billboard" && isIncluded;

                      return (
                        <li
                          key={feature.id}
                          style={{
                            display: "flex",
                            flexDirection: isSpotlight ? "column" : "row",
                            alignItems: isSpotlight ? "stretch" : "center",
                            justifyContent: isSpotlight ? "flex-start" : "space-between",
                            gap: "12px",
                            padding: "10px 12px",
                            borderRadius: "14px",
                            background: isSpotlight
                              ? "#182127"
                              : isIncluded
                              ? "#ffffff"
                              : "#f3f5f6",
                            border: isSpotlight
                              ? "1px solid #182127"
                              : isIncluded
                              ? "1px solid #e2e8ec"
                              : "1px solid #e2e8ec",
                            boxShadow: isSpotlight ? "0 10px 20px rgba(15, 23, 42, 0.12)" : "none",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "12px",
                              minWidth: 0,
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                minWidth: 0,
                              }}
                            >
                              {isIncluded ? (
                                <span
                                  aria-hidden="true"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <img
                                    src={verifiedBadgeIcon}
                                    alt=""
                                    style={{
                                      width: "18px",
                                      height: "18px",
                                      display: "block",
                                      opacity: isSpotlight ? 1 : 0.85,
                                    }}
                                  />
                                </span>
                              ) : (
                                <span
                                  aria-hidden="true"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    color: "#94a3b8",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    width: "18px",
                                  }}
                                >
                                  -
                                </span>
                              )}
                              <span
                                style={{
                                  fontSize: "13px",
                                  fontWeight: 500,
                                  color: isSpotlight
                                    ? "#f8fafc"
                                    : isIncluded
                                    ? "#182127"
                                    : "#60707a",
                                  lineHeight: 1.35,
                                }}
                              >
                                {feature.label}
                              </span>
                            </div>

                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: isSpotlight
                                  ? "rgba(226,232,240,0.92)"
                                  : isIncluded
                                  ? "#60707a"
                                  : "#94a3b8",
                                textAlign: "right",
                              }}
                            >
                              {featureValue || "Locked"}
                            </span>
                          </div>

                          {isSpotlight && (
                            <div
                              style={{
                                marginLeft: "28px",
                                width: "fit-content",
                                padding: "4px 10px",
                                borderRadius: "999px",
                                fontSize: "10px",
                                lineHeight: "1.2",
                                fontWeight: 600,
                                letterSpacing: "0.02em",
                                color: "rgba(241,245,249,0.88)",
                                background: "rgba(255,255,255,0.08)",
                                border: "1px solid rgba(255,255,255,0.16)",
                              }}
                            >
                              {billboardNote}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  <button
                    type="button"
                    style={{
                      marginTop: "20px",
                      width: "100%",
                      padding: "12px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "0.3s",
                      background: plan.popular ? "#182127" : "#ffffff",
                      color: plan.popular ? "#fff" : "#182127",
                      border: "1px solid #e2e8ec",
                    }}
                    onClick={() => openCheckout(plan.id)}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.transform = "scale(1.03)";
                      event.currentTarget.style.opacity = "0.9";
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.transform = "scale(1)";
                      event.currentTarget.style.opacity = "1";
                    }}
                  >
                    Select Plan
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedPlan && (
        <div className="checkout-overlay" onClick={closeCheckout} role="presentation">
          <div
            className="checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="checkout-close"
              type="button"
              aria-label="Close checkout"
              onClick={closeCheckout}
            >
              ×
            </button>

            <p className="checkout-kicker">Secure checkout</p>
            <h2 className="checkout-title" id="checkout-title">
              {selectedPlan.title} plan
            </h2>
            <div className="checkout-plan-row">
              <span className="checkout-chip">${selectedPlan.price}/month</span>
              <span className="checkout-chip checkout-chip-muted">
                {checkoutStep === "form" ? "Step 1 of 2" : "Step 2 of 2"}
              </span>
            </div>
            <p className="checkout-subtitle">
              {checkoutStep === "form"
                ? "Before payment, share your details so the team knows who is joining this plan."
                : "Your details are saved. Review them or open the matching PayPal subscription page when you're ready."}
            </p>

            {checkoutStep === "form" ? (
              <form className="checkout-form" onSubmit={handleFormSubmit}>
                <div className="checkout-form-grid">
                  <label className="checkout-field">
                    <span className="checkout-label">Full name</span>
                    <input
                      type="text"
                      name="fullName"
                      value={formValues.fullName}
                      onChange={handleFieldChange}
                      placeholder="Your full name"
                      required
                    />
                  </label>

                  <label className="checkout-field">
                    <span className="checkout-label">Email</span>
                    <input
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleFieldChange}
                      placeholder="you@example.com"
                      required
                    />
                  </label>

                  <label className="checkout-field">
                    <span className="checkout-label">Instagram</span>
                    <input
                      type="text"
                      name="instagram"
                      value={formValues.instagram}
                      onChange={handleFieldChange}
                      placeholder="@yourhandle"
                      required
                    />
                  </label>

                  <label className="checkout-field">
                    <span className="checkout-label">Phone number</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleFieldChange}
                      placeholder="+44..."
                      required
                    />
                  </label>

                  <label className="checkout-field">
                    <span className="checkout-label">City</span>
                    <input
                      type="text"
                      name="city"
                      value={formValues.city}
                      onChange={handleFieldChange}
                      placeholder="Your city"
                      required
                    />
                  </label>

                  <label className="checkout-field">
                    <span className="checkout-label">You are a</span>
                    <select name="role" value={formValues.role} onChange={handleFieldChange} required>
                      <option value="Model">Model</option>
                      <option value="Photographer">Photographer</option>
                      <option value="Makeup Artist">Makeup Artist</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>

                  <label className="checkout-field checkout-field-full">
                    <span className="checkout-label">Other details</span>
                    <textarea
                      name="details"
                      value={formValues.details}
                      onChange={handleFieldChange}
                      placeholder="Share a few details about your profile, goals, or anything the team should know."
                    />
                  </label>
                </div>

                {submitState.error && (
                  <div className="checkout-status checkout-status-error">{submitState.error}</div>
                )}

                <div className="checkout-actions">
                  <button
                    className="checkout-button checkout-button-secondary"
                    type="button"
                    onClick={closeCheckout}
                  >
                    Cancel
                  </button>
                  <button
                    className="checkout-button checkout-button-primary"
                    type="submit"
                    disabled={submitState.submitting}
                  >
                    {submitState.submitting ? "Saving details..." : "Continue to PayPal"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="checkout-redirect-wrap">
                {submitState.success && (
                  <div className="checkout-status checkout-status-success">{submitState.success}</div>
                )}

                <div className="checkout-redirect-panel">
                  <h3 className="checkout-redirect-title">
                    Ready for {selectedPlan.title} - ${selectedPlan.price}/month
                  </h3>
                  <p className="checkout-redirect-copy">
                    Use the button below to open the correct PayPal subscription for this plan.
                  </p>
                </div>

                <div className="checkout-actions">
                  <button
                    className="checkout-button checkout-button-secondary"
                    type="button"
                    onClick={() => setCheckoutStep("form")}
                  >
                    Edit details
                  </button>
                  <a
                    className="checkout-button checkout-button-primary"
                    href={selectedPlan.paypalUrl}
                  >
                    Open PayPal
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
