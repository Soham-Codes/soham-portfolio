import './style.css';
import { projects, experience, skills } from './js/data.js';

// Populate Content
// Projects
const projectGrid = document.getElementById('project-grid');
if (projectGrid) {
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'card h-full flex flex-col';
    card.innerHTML = `
            <h3 class="text-xl font-bold text-slate-900 mb-2">${project.title}</h3>
            <p class="text-slate-600 mb-6 text-sm leading-relaxed flex-grow">${project.description}</p>
            <div class="flex flex-wrap gap-2 mb-6">
                ${project.tech.map(t => `<span class="badge">${t}</span>`).join('')}
            </div>
            <div class="flex gap-3">
                ${project.link ? `<a href="${project.link}" target="_blank" class="btn-secondary text-sm py-2 px-4 text-center">View on GitHub</a>` : ''}
                ${project.demoLink ? `<a href="${project.demoLink}" target="_blank" class="btn-secondary text-sm py-2 px-4 text-center">${project.demoLabel || 'Try it out!'}</a>` : ''}
            </div>
        `;
    projectGrid.appendChild(card);
  });
}

// Experience
const experienceContainer = document.getElementById('experience-container');
if (experienceContainer) {
  // Sort experience by date (newest first)
  const sortedExperience = [...experience].sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));

  // Add Central Line
  const line = document.createElement('div');
  line.className = 'absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2';
  experienceContainer.appendChild(line);

  sortedExperience.forEach((exp, index) => {
    const item = document.createElement('div');
    const isLeft = index % 2 === 0;

    // Wrapper
    item.className = `relative flex flex-col md:flex-row items-center w-full mb-12`;

    // Content HTML
    const contentHtml = `
            <div class="card w-full relative">
                <span class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 block">${exp.date}</span>
                <h3 class="text-xl font-bold text-slate-900 mb-1">${exp.role}</h3>
                <h4 class="text-slate-700 font-medium mb-4">${exp.company}</h4>
                <p class="text-slate-600 text-sm leading-relaxed mb-4">${exp.description}</p>
                <div class="flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : 'justify-start'}">
                    ${exp.tech.map(t => `<span class="badge">${t}</span>`).join('')}
                </div>
            </div>
        `;

    // Marker HTML
    const markerHtml = `
            <div class="absolute left-4 md:left-1/2 w-5 h-5 bg-white border-4 border-slate-900 rounded-full -translate-x-1/2 z-10 shadow-sm"></div>
        `;

    if (isLeft) {
      // Desktop: Left Content | Marker | Spacer
      // Mobile: Marker | Content (with left padding)
      item.innerHTML = `
                ${markerHtml}
                <div class="w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right order-1">
                    ${contentHtml}
                </div>
                <div class="hidden md:block md:w-1/2 order-2"></div>
            `;
    } else {
      // Desktop: Spacer | Marker | Right Content
      // Mobile: Marker | Content (with left padding)
      item.innerHTML = `
                ${markerHtml}
                <div class="hidden md:block md:w-1/2 order-1"></div>
                <div class="w-full md:w-1/2 pl-12 md:pl-12 text-left order-2">
                    ${contentHtml}
                </div>
            `;
    }

    experienceContainer.appendChild(item);
  });
}

// Skills (for About page if needed dynamically, but currently hardcoded in about.html as badges)
const skillsContainer = document.getElementById('skills-container');
if (skillsContainer) {
  skills.forEach(skill => {
    const el = document.createElement('span');
    el.className = 'badge';
    el.textContent = skill;
    skillsContainer.appendChild(el);
  });
}
