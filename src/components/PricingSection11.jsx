import React from "react";

const plans = [
  {
    title: "Growth",
    emoji: "👋",
    price: "49",
    desc: "Build your presence",
    features: [
      "Basic Collaborations (TFP)",
      "Instagram Promotion (1–2 posts)",
      "Monthly Magazine Feature",
      "Interview Feature",
      "Priority Placement",
    ],
  },
  {
    title: "Elite",
    emoji: "💪",
    price: "99",
    desc: "Grow your brand",
    popular: true,
    features: [
      "Priority Collaborations",
      "Instagram Promotion (strong push)",
      "Monthly Magazine Feature",
      "Interview Feature",
      "Priority Placement",
      "Cover Feature Opportunity",
      "25% OFF on services & magazine purchases",
    ],
  },
  {
    title: "Pro",
    emoji: "💎",
    price: "149",
    desc: "Scale & go premium",
    features: [
      "Paid Collaboration Access",
      "Photoshoot Opportunities",
      "Instagram Promotion (max push)",
      "Monthly Magazine Feature",
      "Interview Feature",
      "Top Priority Placement",
      "Cover Feature",
      "NYC Billboard (every 3 months)",
      "Dedicated Support",
      "35% OFF on services & magazine purchases",
    ],
  },
];

export default function PremiumPricing() {
  return (
    <>
      {/* FONT */}
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
          
          {/* HEADER */}
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h1 style={{ fontSize: "38px", fontWeight: 600, color: "#0f172a" }}>
              Plans that elevate your brand
            </h1>
            <p style={{ color: "#64748b", marginTop: "10px" }}>
              Premium collaborations, visibility, and growth — designed for creators.
            </p>
          </div>

          {/* CARDS */}
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

              return (
                <div
                  key={i}
                  style={{
                    width: "320px",
                    padding: "28px",
                    borderRadius: "20px",
                    position: "relative",
                    cursor: "pointer",
                    transition: "all 0.4s ease",

                    // ✨ GLASS EFFECT
                    background: "rgba(255,255,255,0.65)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.4)",

                    // ✨ DEPTH
                    boxShadow: isMiddle
                      ? "0 25px 60px rgba(0,0,0,0.08)"
                      : "0 10px 30px rgba(0,0,0,0.05)",

                    transform: isMiddle
                      ? "scale(1.06)"
                      : "scale(1)",

                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px) scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 30px 70px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = isMiddle
                      ? "scale(1.06)"
                      : "scale(1)";
                    e.currentTarget.style.boxShadow = isMiddle
                      ? "0 25px 60px rgba(0,0,0,0.08)"
                      : "0 10px 30px rgba(0,0,0,0.05)";
                  }}
                >
                  {/* MOST POPULAR */}
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

                  {/* TITLE */}
                  <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#0f172a" }}>
                    {plan.emoji} {plan.title}
                  </h3>

                  <p style={{ color: "#64748b", margin: "8px 0 18px" }}>
                    {plan.desc}
                  </p>

                  {/* PRICE */}
                  <h2 style={{ fontSize: "44px", marginBottom: "20px" , color: "#0f172a"}}>
                    ${plan.price}
                    <span style={{ fontSize: "14px", color: "#64748b" }}>
                      /month
                    </span>
                  </h2>

                  {/* BUTTON */}
                  <button
                    style={{
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

                  {/* FEATURES */}
                  <ul
                    style={{
                      marginTop: "25px",
                      padding: 0,
                      listStyle: "none",
                      fontSize: "14px",
                      color: "#334155",
                      lineHeight: "1.9",
                    }}
                  >
                    {plan.features.map((f, idx) => (
                      <li key={idx}>• {f}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}