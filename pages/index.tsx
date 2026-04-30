import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Widget Pro", price: 29.99, description: "The best widget for all your needs" },
  { id: 2, name: "Gadget Plus", price: 49.99, description: "Next-generation gadget technology" },
  { id: 3, name: "Toolset Deluxe", price: 89.99, description: "Complete professional toolset" },
];

export default function StorePage() {
  const [cart, setCart] = useState<number[]>([]);

  function addToCart(id: number) {
    setCart((prev) => [...prev, id]);
  }

  const total = cart.reduce((sum, id) => {
    const p = PRODUCTS.find((p) => p.id === id);
    return sum + (p?.price ?? 0);
  }, 0);

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1>Dogfood Store</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
        {PRODUCTS.map((p) => (
          <div
            key={p.id}
            style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}
          >
            <h3 style={{ margin: "0 0 8px" }}>{p.name}</h3>
            <p style={{ color: "#555", fontSize: 14, margin: "0 0 12px" }}>{p.description}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>${p.price.toFixed(2)}</strong>
              <button
                style={{
                  padding: "6px 14px",
                  background: "#0070f3",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
                onClick={() => addToCart(p.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 20, background: "#f9f9f9" }}>
        <h2 style={{ margin: "0 0 12px" }}>Cart ({cart.length} items)</h2>
        {cart.length === 0 ? (
          <p style={{ color: "#999" }}>No items yet. Add something from the store!</p>
        ) : (
          <>
            {cart.map((id, i) => {
              const p = PRODUCTS.find((p) => p.id === id)!;
              return (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span>{p.name}</span>
                  <span>${p.price.toFixed(2)}</span>
                </div>
              );
            })}
            <div style={{ borderTop: "1px solid #ddd", marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              style={{
                marginTop: 16,
                width: "100%",
                padding: "10px",
                background: "#22c55e",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              Checkout (placeholder)
            </button>
          </>
        )}
      </div>
    </main>
  );
}
