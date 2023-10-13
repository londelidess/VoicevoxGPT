
import './globals.css'
import Favicon from '/public/images/Metadata/favicon.ico';
import Navigation from './components/navigation'
import { FaLinkedin, FaFacebook, FaGithub } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'VoicevoxGPT',
  description: 'VoicevoxGPT',
  icons: [{ rel: 'icon', url: Favicon.src }],
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="flex flex-col min-h-screen bg-gray-50 relative">
          <Navigation />

          <main className="flex-1 container max-w-screen-sm mx-auto px-5 py-5">{children}</main>

          <footer className="py-5 border-t-2 border-gray-300 #D1D5DB">
    <div className="text-center text-sm mb-3">
        <h4>Copyright © All rights reserved | VOICEVOX:ずんだもん
        <br />
        2023 | Coded by Makoto Doi</h4>
    </div>
    <div className="flex justify-center mt-3">

        {/* <a href="https://www.instagram.com/your_username/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
        </a> */}
        <a className="mr-2" href="https://www.linkedin.com/in/makoto-doi/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
        </a>
        <a className="mr-2" href="https://www.facebook.com/profile.php?id=100004164127853" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
        </a>
        <a className="mr-2" href="https://github.com/londelidess" target="_blank" rel="noopener noreferrer">
            <FaGithub />
        </a>
    </div>
</footer>
        </div>
      </body>
    </html>
  )
}
