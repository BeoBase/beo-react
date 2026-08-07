import {
  FaBook,
  FaFileAlt,
  FaFolderOpen,
  FaGithub,
} from "react-icons/fa";

import myResume from "../../assets/BellamyPhan_Resume.pdf";

export default function Documentation() {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/30 p-6 shadow-xl backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-3">
        <FaFolderOpen className="text-4xl text-black" />
        <div className="text-white text-2xl font-bold">Documentation</div>
      </div>
      
      <div className="mb-6 text-gray-200">
        Public source code and project documentation.
      </div>
      
      <ul className="space-y-3">
        <li>
          <a
            href="https://github.com/bellamyphan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-black hover:underline"
          >
            <FaGithub />
            Bellamy
          </a>
        </li>
        
        <li>
          <a
            href="https://github.com/BeoBase"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-black hover:underline"
          >
            <FaGithub />
            Beo Base
          </a>
        </li>
        
        <li>
          <a
            href="https://bellamyphan.atlassian.net/wiki/spaces/BB/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-black hover:underline"
          >
            <FaBook />
            Confluence
          </a>
        </li>
        
        <li>
          <a
            href={myResume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-black hover:underline"
          >
            <FaFileAlt />
            Resume
          </a>
        </li>
      </ul>
    </div>
  );
}