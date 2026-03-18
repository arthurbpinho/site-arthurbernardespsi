# Arthur Bernardes — Landing Page

Landing page profissional para Arthur Bernardes, psicólogo clínico junguiano.

## Stack
- React + Vite
- Tailwind CSS v3
- Framer Motion (animações)

## Como rodar localmente

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Estrutura do projeto

```
arthur-bernardes/
├── public/
│   ├── assets/          ← Coloque as logos e foto aqui
│   │   ├── profile.jpg  ← FOTO DE PERFIL (substitua aqui!)
│   │   ├── logo-allos.png
│   │   ├── logo-academia-junguiana.png
│   │   └── logo-exyo.png
│   └── favicon.svg
├── src/
│   ├── App.jsx          ← Componente principal com todas as seções
│   ├── main.jsx
│   └── index.css
└── index.html
```

## Como substituir a foto de perfil

1. Coloque sua foto em `public/assets/profile.jpg`
2. No arquivo `src/App.jsx`, na seção **Sobre**, encontre o comentário:
   ```jsx
   {/* Replace this div with an <img ... /> */}
   ```
3. Substitua o `<div>` placeholder pelo seguinte:
   ```jsx
   <img
     src="/assets/profile.jpg"
     alt="Arthur Bernardes"
     style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }}
   />
   ```

## Como adicionar as logos dos projetos

Na seção **Projetos** do `App.jsx`, substitua o conteúdo do `logo` em `PROJECTS`:
```jsx
// Exemplo para Allos:
logo: <img src="/assets/logo-allos.png" alt="Allos" style={{width:'80%', objectFit:'contain'}} />,
```

## Paleta de cores

| Token       | Cor       | Uso                          |
|-------------|-----------|------------------------------|
| `--bg`      | `#0A0A0F` | Fundo principal              |
| `--surface` | `#12121A` | Cards e superfícies          |
| `--teal`    | `#2E9E8F` | Cor primária / destaque      |
| `--gold`    | `#C49A3C` | Cor secundária / acento      |
| `--text`    | `#F0EDE8` | Texto principal              |
| `--text-sec`| `#9A9590` | Texto secundário             |

## Deploy

Recomendado: **Vercel** (zero config para Vite)
```bash
npm install -g vercel
vercel
```

Ou **Netlify**:
```bash
npm run build
# faça upload da pasta dist/
```
