# **Microfrontend Monorepo with Module Federation**

This repository is a **monorepo** designed to demonstrate the integration and management of **multiple microfrontends** using **Module Federation** and **pnpm workspaces**. It is a foundational setup to understand and explore the architecture of microfrontends and how they can seamlessly communicate with one another.

## **What is this project about?**

This monorepo consists of **multiple frontends (microfrontends)**, each acting as an independent project but working together as a unified system. These microfrontends are integrated into a **shell application**, which serves as the entry point for users.

The project uses **Module Federation** (a Webpack 5 feature) to enable runtime integration of these microfrontends, allowing them to load remote components or pages dynamically without needing to rebuild the entire application.

### **Key Highlights:**

1. **Monorepo Architecture:**
    - All microfrontends are managed in a single repository for easier collaboration and dependency management.
    - Example microfrontends included:
        - **Shell:** The main application that serves as the host and provides navigation between microfrontends.
        - **Products:** Displays a list of products and their details.
        - **Shop:** Handles shopping-related features.
        - **Checkout:** Handles the checkout flow.

2. **Module Federation:**
    - Enables microfrontends to expose or consume components/pages dynamically at runtime.
    - Allows each microfrontend to maintain independent builds, fostering modularity.

3. **pnpm Workspaces:**
    - Uses **pnpm workspaces** to manage dependencies across the monorepo efficiently.
    - Provides centralized scripts to build, start, and develop all microfrontends simultaneously.

4. **TypeScript Support:**
    - The project is fully written in **TypeScript**, ensuring type safety and better developer experience.

---

## **Getting Started**

### **Prerequisites**
- **Node.js**: Ensure you have Node.js installed (v16 or higher recommended).
- **pnpm**: Install pnpm globally:
  ```bash
  npm install -g pnpm
  ```

---

### **Installation**
Install dependencies for all microfrontends:
   ```bash
   pnpm install
   ```

---

### **Available Scripts**

- **Start all microfrontends in development mode**:
  ```bash
  pnpm run dev
  ```

- **Build all microfrontends**:
  ```bash
  pnpm run build
  ```

- **Start all microfrontends in production mode**:
  ```bash
  pnpm run start
  ```

---

### **Project Structure**

The repository is organized as follows:

```
microfrontends/
├── checkout/          # Checkout microfrontend
│   ├── pages/         # Pages exposed by Module Federation
│   ├── components/    # Components specific to the checkout
│   ├── next.config.ts      # Module Federation config for this microfrontend
│   └── ...
├── products/          # Products microfrontend
│   ├── pages/         # Pages exposed by Module Federation
│   ├── components/    # Components specific to the products
│   ├── next.config.ts      # Module Federation config for this microfrontend
│   └── ...
├── shop/              # Shop microfrontend
│   ├── pages/         # Pages exposed by Module Federation
│   ├── components/    # Components specific to the shop
│   ├── next.config.ts      # Module Federation config for this microfrontend
│   └── ...
├── shell/             # Shell microfrontend (host)
│   ├── pages/         # Main navigation and routing logic
│   ├── components/    # Global components (like navbar)
│   ├── next.config.ts      # Module Federation config for the shell
│   └── ...
pnpm-workspace.yaml    # Configuration for pnpm workspaces
package.json           # Root-level scripts and dependencies
```

---

### **How It Works**

1. **Module Federation Configuration:**
   Each microfrontend has its own `config.ts` file that defines:
    - **Exposes:** Pages or components it provides for other microfrontends.
    - **Remotes:** Microfrontends it consumes at runtime.
    - Example configuration:
      ```ts
      const nextConfig = {
        webpack: (config, options) => {
          config.plugins.push(
            new NextFederationPlugin({
              name: 'products',
              filename: 'static/chunks/remoteEntry.js',
              exposes: {
                './products': './pages/index.tsx',
                './productDetail': './pages/[id].tsx',
              },
              remotes: {
                shop: 'shop@http://localhost:3002/_next/static/chunks/remoteEntry.js',
                checkout: 'checkout@http://localhost:3003/_next/static/chunks/remoteEntry.js',
              },
              shared: {},
            })
          );
          return config;
        },
      };
      ```

2. **Slug-based Dynamic Routing:**
    - The `shell` microfrontend uses a `[...slug].tsx` page to dynamically render content from any microfrontend based on the URL.
    - Example:
      ```tsx
      const DynamicPage = () => {
        const { query } = useRouter();
        const { slug } = query;
 
        if (!slug || !Array.isArray(slug)) {
          return <div>404 - Page Not Found</div>;
        }
 
        const [namespace, id] = slug;
 
        const RemoteComponent = remotes[namespace];
        return <RemoteComponent {...(id ? { id } : {})} />;
      };
      ```

3. **Cross-Microfrontend Communication:**
    - Components/pages exposed by one microfrontend can be consumed by others dynamically at runtime.

---

### **Why This Setup?**

This repository provides a hands-on demonstration of:
- Managing **microfrontends** in a **monorepo** setup.
- Implementing **Module Federation** for seamless integration.
- Leveraging **pnpm workspaces** for efficient dependency management.
- Exploring dynamic routing and navigation in a microfrontend architecture.

---

### **Next Steps**

- Add more features to each microfrontend to simulate a real-world scenario.
- Optimize the build process for production environments.
- Explore other tools for improved monorepo performance.
