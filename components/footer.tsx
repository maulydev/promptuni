import { APP_NAME } from "@/data";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center space-y-5">
        <p className="text-muted-foreground">© 2025 {APP_NAME} | Built with ❤️ for AI Creators</p>
        <small className="text-foreground/50">Beyond lines, beyond limits</small>
      </div>
    </footer>
  )
}
