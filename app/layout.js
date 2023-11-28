import "./globals.css"

export const metadata = {
  title: "X",
  description: "Remixed by @nexxdevv"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
       {children}
      </body>
    </html>
  )
}
