import React from "react";

const verifiedBadgeIcon = "/icons/verified-badge-slate.png";
const billboardNote =
  "After 2 paid months";

const comparisonFeatures = [
  { id: "collaboration", label: "Collaboration" },
  { id: "promotion", label: "Promotion" },
  { id: "editorial", label: "Editorial" },
  { id: "placement", label: "Placement" },
  { id: "cover", label: "Cover" },
  { id: "extras", label: "Discounts" },
  { id: "billboard", label: "NYC Billboard" },
];

const plans = [
  {
    title: "Growth",
    emoji: "👋",
    price: "49",
    desc: "Build your presence",
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
    title: "Elite",
    emoji: "💪",
    price: "99",
    desc: "Grow your brand",
    popular: true,
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
    title: "Pro",
    emoji: "💎",
    price: "149",
    desc: "Scale & go premium",
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

export default function PremiumPricing() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        * {
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <section
        style={{
          background: "linear-gradient(180deg, #f8fafc, #eef2ff)",
          padding: "80px 20px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h1 style={{ fontSize: "38px", fontWeight: 600, color: "#0f172a" }}>
              Plans that elevate your brand
            </h1>
            <p style={{ color: "#64748b", marginTop: "10px" }}>
              Premium collaborations, visibility, and growth - designed for creators.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              flexWrap: "wrap",
            }}
          >
            {plans.map((plan, i) => {
              const isMiddle = i === 1;
              const baseTransform = isMiddle ? "scale(1.06)" : "scale(1)";
              const baseShadow = isMiddle
                ? "0 25px 60px rgba(0,0,0,0.08)"
                : "0 10px 30px rgba(0,0,0,0.05)";

              return (
                <div
                  key={i}
                  style={{
                    width: "320px",
                    padding: "28px",
                    borderRadius: "20px",
                    position: "relative",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    background: "rgba(255,255,255,0.65)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.4)",
                    boxShadow: baseShadow,
                    transform: baseTransform,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = isMiddle
                      ? "translateY(-4px) scale(1.055)"
                      : "translateY(-4px) scale(1.015)";
                    e.currentTarget.style.boxShadow =
                      "0 18px 40px rgba(0,0,0,0.09)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = baseTransform;
                    e.currentTarget.style.boxShadow = baseShadow;
                  }}
                >
                  {plan.popular && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-14px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "linear-gradient(135deg, #6366f1, #3b82f6)",
                        color: "#fff",
                        fontSize: "12px",
                        padding: "6px 14px",
                        borderRadius: "999px",
                        fontWeight: 500,
                        boxShadow: "0 10px 20px rgba(99,102,241,0.3)",
                      }}
                    >
                      Most popular
                    </div>
                  )}

                  <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#0f172a" }}>
                    {plan.emoji} {plan.title}
                  </h3>

                  <p style={{ color: "#64748b", margin: "8px 0 18px" }}>
                    {plan.desc}
                  </p>

                  <h2 style={{ fontSize: "44px", marginBottom: "20px", color: "#0f172a" }}>
                    ${plan.price}
                    <span style={{ fontSize: "14px", color: "#64748b" }}>
                      /month
                    </span>
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
                              ? "linear-gradient(135deg, #0f172a, #334155)"
                              : isIncluded
                              ? "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(248,250,252,0.95))"
                              : "rgba(241,245,249,0.82)",
                            border: isSpotlight
                              ? "1px solid rgba(148,163,184,0.3)"
                              : isIncluded
                              ? "1px solid rgba(226,232,240,0.95)"
                              : "1px solid rgba(226,232,240,0.78)",
                            boxShadow: isSpotlight
                              ? "0 14px 28px rgba(15,23,42,0.18)"
                              : "none",
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
                                    ? "#1e293b"
                                    : "#64748b",
                                  whiteSpace: "nowrap",
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
                                  ? "#475569"
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
                                border: "1px solid rgba(148,163,184,0.18)",
                              }}
                            >
                              {billboardNote}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>

/** Button code starts here **/
                  <button
                        style={{
                          marginTop: "20px",
                          width: "100%",
                          padding: "12px",
                          borderRadius: "12px",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: 500,
                          transition: "0.3s",
                          background: plan.popular
                            ? "linear-gradient(135deg, #6366f1, #3b82f6)"
                            : "#e2e8f0",
                          color: plan.popular ? "#fff" : "#0f172a",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.03)";
                          e.currentTarget.style.opacity = "0.9";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.opacity = "1";
                        }}
                      >
                        Get Started
                      </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
