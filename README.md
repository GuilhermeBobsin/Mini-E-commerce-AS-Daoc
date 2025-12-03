# 🛒 Mini E-commerce React + JSON Server

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JSON Server](https://img.shields.io/badge/JSON%20Server-red?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-0ea5e9?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Status](https://img.shields.io/badge/Project-Finalizado-brightgreen?style=for-the-badge)

======================================================================
📌 SUMÁRIO
======================================================================
- Uso do useContext
- Como o contexto foi criado
- Quais dados ele armazena
- Como o carrinho é manipulado
- Em quais componentes é consumido e por quê
- Consumo da API (JSON Server)
- Endpoints utilizados
- Exemplos de requisições
- Tratamento de erros e loading
- Configuração do JSON Server
- Estrutura geral do projeto
- Páginas criadas
- Fluxo de navegação
- Funcionalidades implementadas
- Como rodar o projeto
- Dependências instaladas
- Como rodar o JSON Server


======================================================================
📚 USO DO useContext
======================================================================

O projeto usa o React Context API para controlar o estado global do carrinho.
Isso evita ficar passando props de componente para componente.

O contexto vive em:
src/context/CartContext.jsx


======================================================================
🧠 COMO O CONTEXTO FOI CRIADO
======================================================================

Dentro do CartContext.jsx:

- Criamos o contexto:
  createContext()

- Criamos o provider:
  CartProvider

- Armazenamos o estado:
  const [cart, setCart] = useState([])

- Exportamos tudo pra usar no app inteiro.

Exemplo reduzido:
----------------------------------------------------
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => { ... };
  const removeFromCart = (id) => { ... };
  const clearCart = () => { ... };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
----------------------------------------------------


======================================================================
🛒 DADOS ARMAZENADOS NO CONTEXTO
======================================================================

cart            → array de produtos adicionados  
addToCart()     → adiciona  
removeFromCart()→ remove  
clearCart()     → limpa tudo  


======================================================================
🧩 COMO O CARRINHO É MANIPULADO
======================================================================

addToCart(product)
  Se o produto já estiver no carrinho, incrementa a quantidade.
  Se não estiver, adiciona com quantidade = 1.

removeFromCart(id)
  Remove baseado no ID.

clearCart()
  Esvazia tudo.

Também existe validação de estoque para impedir adicionar mais itens do que existem no banco.


======================================================================
📦 ONDE O CONTEXTO É CONSUMIDO
======================================================================

Ele é usado principalmente em:

src/pages/ProductDetails.jsx     → botão “Adicionar ao Carrinho”
src/pages/Cart.jsx               → exibe e manipula o carrinho
src/components/ProductCard.jsx   → adicionar produto direto da home

Por quê?
→ São os lugares onde o usuário interage com o carrinho.


======================================================================
🌐 CONSUMO DA API (JSON SERVER)
======================================================================

O JSON Server roda em:
http://localhost:3001/products

Arquivo:
db.json

Endpoints usados:

GET    /products  
GET    /products/:id  
POST   /products  
PUT    /products/:id  
DELETE /products/:id  


======================================================================
📡 EXEMPLOS DE REQUISIÇÕES
======================================================================

GET todos os produtos:
fetch("http://localhost:3001/products")

GET por ID:
fetch("http://localhost:3001/products/1")

POST criar produto:
fetch("http://localhost:3001/products", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(novoProduto)
})

PUT atualizar:
fetch("http://localhost:3001/products/1", {
  method: "PUT",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(produtoAtualizado)
})

DELETE apagar:
fetch("http://localhost:3001/products/1", { method: "DELETE" })


======================================================================
⚠️ TRATAMENTO DE ERROS E LOADING
======================================================================

O hook:
src/hooks/useFetch.js

Ele controla:
- loading → true enquanto busca
- error   → mensagem se falhar
- data    → resultado final

Uso:
const { data, loading, error } = useFetch(getProducts)


======================================================================
🛠️ CONFIGURAÇÃO DO JSON SERVER
======================================================================

Arquivo:
db.json na raiz do projeto.

Rodar com:
npx json-server --watch db.json --port 3001

Ou no package.json:
"json-server": "json-server --watch db.json --port 3001"


======================================================================
📁 ESTRUTURA DO PROJETO
======================================================================

src/
  api/
    productService.js
  components/
    Alert.jsx
    Header.jsx
    Loading.jsx
    ProductCard.jsx
  context/
    AuthContext.jsx
    CartContext.jsx
  hooks/
    useFetch.js
  pages/
    Cadastro.jsx
    Cart.jsx
    Editar.jsx
    Editar.jsx
    Home.jsx
    Login.jsx
    NotFound.jsx
    ProductDetails.jsx
    Register.jsx
  App.jsx
  main.jsx
  index.css
  ProtectedRoute.jsx
db.json
eslint.config.js
package.json
package-lock.json
postcss.config.js
vite.config.js
tailwind.config.js
README.md

======================================================================
📄 PÁGINAS CRIADAS
======================================================================

Home
  Lista de produtos

Detalhes do Produto
  Exibe informações e permite adicionar ao carrinho

Carrinho
  Exibe produtos adicionados, remove item, limpa carrinho

Cadastro de Produto
  Formulário para cadastrar produto novo

Página 404
  Caso rota não exista


======================================================================
🔀 FLUXO DE NAVEGAÇÃO ENTRE ROTAS
======================================================================

Home → ver detalhes → adicionar ao carrinho → carrinho  
Home → cadastro → salvar produto → voltar para Home

React Router controla tudo via:
src/App.jsx


======================================================================
⚙️ FUNCIONALIDADES IMPLEMENTADAS
======================================================================

✔ Listagem de produtos  
✔ Detalhes do produto  
✔ Carrinho com Context API  
✔ CRUD completo (GET, POST, PUT, DELETE)  
✔ Validação de estoque (não deixa passar do stock)  
✔ Cadastro de produto com validação básica  
✔ Feedback de loading  
✔ Tratamento de erro ao buscar API  
✔ Tailwind funcionando  


======================================================================
▶️ COMO RODAR O PROJETO
======================================================================

Instalar dependências:
npm install

Rodar o frontend:
npm run dev

Rodar o JSON Server:
npm run json-server

Acessar:
Frontend: http://localhost:5173
API:      http://localhost:3001/products


======================================================================
📦 DEPENDÊNCIAS
======================================================================

"react"
"react-router-dom"
"tailwindcss"
"postcss"
"autoprefixer"
"json-server"