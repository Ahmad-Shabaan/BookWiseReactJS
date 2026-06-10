// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { store } from './store/store.ts';

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";

import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import "./config/env";
import "./index.css";
// import App from './App.tsx'
import router from "./routes/index.tsx";

import { Suspense } from "react";
import Loading from "./shared/components/common/Loading.tsx";
// import AuthProvider from "./shared/providers/AuthProvider.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          {/* <AuthProvider> */}
            <RouterProvider router={router} />
          {/* </AuthProvider> */}
        </Suspense>
        <Toaster position="top-right" />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </PersistGate>
  </Provider>,
  // {/* </StrictMode> */}
);
