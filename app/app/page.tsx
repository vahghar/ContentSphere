import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, Card } from "@/components/ui/card"
import { Music, Users, Radio } from "lucide-react"
import Link from "next/link"
import Appbar from "./components/Appbar"
import Redirect from "./components/Redirect"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Appbar />
      <Redirect />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Let Your Fans Choose the Music
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                Engage your audience by letting them pick your stream's soundtrack.
              </p>
              <Button className="bg-purple-600 text-white hover:bg-purple-700">Get Started</Button>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-purple-400">Features</h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Users className="h-12 w-12 mb-2 text-purple-500" />
                  <h3 className="text-xl font-bold text-white">Fan Engagement</h3>
                  <p className="text-center text-gray-400">
                    Let your audience participate by choosing the music.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Radio className="h-12 w-12 mb-2 text-purple-500" />
                  <h3 className="text-xl font-bold text-white">Live Voting</h3>
                  <p className="text-center text-gray-400">
                    Real-time voting system for viewers to pick tracks.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Music className="h-12 w-12 mb-2 text-purple-500" />
                  <h3 className="text-xl font-bold text-white">Seamless Integration</h3>
                  <p className="text-center text-gray-400">
                    Works with popular streaming and music services.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-purple-400">How It Works</h2>
            <ol className="grid gap-6 md:grid-cols-3">
              <li className="flex flex-col items-center space-y-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white text-xl font-bold">1</span>
                <h3 className="text-xl font-bold text-white">Set Up Your Stream</h3>
                <p className="text-center text-gray-400">
                  Connect your accounts and music library.
                </p>
              </li>
              <li className="flex flex-col items-center space-y-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white text-xl font-bold">2</span>
                <h3 className="text-xl font-bold text-white">Fans Vote</h3>
                <p className="text-center text-gray-400">
                  Your audience votes for the next song in real-time.
                </p>
              </li>
              <li className="flex flex-col items-center space-y-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white text-xl font-bold">3</span>
                <h3 className="text-xl font-bold text-white">Music Plays</h3>
                <p className="text-center text-gray-400">
                  The winning song automatically plays on your stream.
                </p>
              </li>
            </ol>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                Ready to Revolutionize Your Streams?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed">
                Join MusicStreamChoice today and empower your audience.
              </p>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-gray-800 text-white border-gray-700" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700">Sign Up</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800 bg-gray-900 text-gray-400">
        <p className="text-xs">
          © 2024 MusicStreamChoice. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}