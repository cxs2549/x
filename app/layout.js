import "./globals.css"
import { AuthProvider } from "./Providers"

export const metadata = {
  title: "X",
  description: "Remixed by @nexxdevv"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
