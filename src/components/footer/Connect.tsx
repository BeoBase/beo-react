import {
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaShareAlt,
} from "react-icons/fa";

export default function Connect() {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/30 p-6 shadow-xl backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-3">
        <FaShareAlt className="text-4xl text-black" />
        <div className="text-white text-2xl font-bold">Connect with Beo</div>
      </div>
      
      <div className="mb-6 text-gray-200">
        Direct message or send me an email.
      </div>
      
      <ul className="space-y-3">
        <li>
          <a
            href="mailto:BellamyPhan@icloud.com"
            className="flex items-center gap-2 text-black hover:underline"
          >
            <FaEnvelope />
            Email
          </a>
        </li>
        
        <li>
          <a
            href="https://www.facebook.com/bellamyphan69"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-black hover:underline"
          >
            <FaFacebook />
            Facebook
          </a>
        </li>
        
        <li>
          <a
            href="https://www.linkedin.com/in/bellamyphan/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-black hover:underline"
          >
            <FaLinkedin />
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
}