import "./globals.scss";

export const metadata = {
  title: "ToDoTec",
  description: "Pomodoro Todo Tec",
  manifest: "/manifest.json", //PWA
  icons: [
    //PWA
    { rel: "apple-touch-icon", url: "/logo_128.png" },
    { rel: "icon", url: "/logo_128.png" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
