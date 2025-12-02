const BASE = "http://localhost:3000";

async function handleResp(res) {
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "Erro na requisição");
  }
  return res.json();
}

export const getProducts = () =>
  fetch(`${BASE}/products`).then(handleResp);

export const getProductById = (id) =>
  fetch(`${BASE}/products/${id}`).then(handleResp);

export const createProduct = (data) =>
  fetch(`${BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(handleResp);

export const updateProduct = (id, data) =>
  fetch(`${BASE}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(handleResp);

export const deleteProduct = (id) =>
  fetch(`${BASE}/products/${id}`, {
    method: "DELETE",
  }).then(handleResp);

