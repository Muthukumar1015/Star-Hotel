"use client";

import { Provider } from "react-redux";
import store from "@/app/store/store";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Navbar />
          <main>{children}</main>  {/* Wrap children in a <main> */}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
