import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tech,
  demoUrl,
  githubUrl,
}) => {
  return (
    <div className="group relative bg-zinc-900 rounded-lg overflow-hidden">
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-zinc-400">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ExternalLink size={20} />
            Live Demo
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Github size={20} />
            Code
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;