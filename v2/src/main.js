import './style.css';
import { projects, experience, skillCategories, skillIcons } from './js/data.js';
import { initNav } from './js/nav.js';

// Initialize navigation handler
initNav();

// Helper to resolve base path for assets on GitHub Pages
const baseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
function resolvePath(path) {
    if (!path) return '';
    return path.startsWith('/') ? `${baseUrl}${path.slice(1)}` : `${baseUrl}${path}`;
}

// ----------------------------------------------------
// 1. Render Organizations / Logos Grid (Homepage)
// ----------------------------------------------------
const companyLogosGrid = document.getElementById('company-logos-grid');
if (companyLogosGrid) {
    // Unique list of companies with logos
    const uniqueCompanies = [];
    const seen = new Set();
    
    experience.forEach(exp => {
        if (exp.logo && !seen.has(exp.company)) {
            seen.add(exp.company);
            uniqueCompanies.push({
                company: exp.company,
                logo: exp.logo
            });
        }
    });

    uniqueCompanies.forEach(org => {
        const box = document.createElement('div');
        box.className = 'logo-box';
        box.innerHTML = `
            <img src="${resolvePath(org.logo)}" alt="${org.company} logo" class="max-h-12 max-w-[85%] object-contain transition-all duration-300">
        `;
        companyLogosGrid.appendChild(box);
    });
}

// ----------------------------------------------------
// 2. Render Categorized Skills (Homepage)
// ----------------------------------------------------
const categorizedSkillsContainer = document.getElementById('categorized-skills-container');
if (categorizedSkillsContainer) {
    skillCategories.forEach(cat => {
        const group = document.createElement('div');
        group.className = 'bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all';
        
        const skillsHtml = cat.skills.map(s => {
            const badgeUrl = skillIcons[s];
            if (badgeUrl) {
                return `<img src="${badgeUrl}" alt="${s}" class="h-7 object-contain rounded-md shadow-2xs hover:scale-105 transition-transform duration-200">`;
            } else {
                return `<span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200/80">${s}</span>`;
            }
        }).join('');

        group.innerHTML = `
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-teal-600"></span>
                ${cat.name}
            </h3>
            <div class="flex flex-wrap gap-2.5 items-center">
                ${skillsHtml}
            </div>
        `;
        categorizedSkillsContainer.appendChild(group);
    });
}

// ----------------------------------------------------
// 3. Render Projects Grid (Projects Page & Featured)
// ----------------------------------------------------
const featuredProjectsGrid = document.getElementById('featured-projects-grid');

function createProjectCardHtml(project) {
    const logoSrc = project.logo ? resolvePath(project.logo) : '';
    const logoBlock = logoSrc ? `
        <div class="w-full h-32 rounded-xl overflow-hidden bg-slate-900/5 border border-slate-200/70 flex items-center justify-center p-4 mb-5 group-hover:border-slate-300 transition-all">
            <img src="${logoSrc}" alt="${project.title} logo" class="max-h-24 max-w-[80%] object-contain rounded-md shadow-xs transition-transform duration-300 group-hover:scale-105">
        </div>
    ` : '';

    const courseHeader = project.course ? `
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200/80">
                <svg class="w-3.5 h-3.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                ${project.course}
            </span>
            ${project.date ? `<span class="text-xs text-slate-500 font-medium whitespace-nowrap">${project.date}</span>` : ''}
        </div>
    ` : '';

    const repoPath = project.link ? project.link.replace('https://github.com/', '') : '';

    const footerBlock = (project.link || project.demoLink) ? `
        <div class="flex flex-wrap gap-2.5 items-center pt-3 border-t border-slate-100 mt-auto">
            ${project.link ? `
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-slate-900 text-slate-100 hover:bg-slate-800 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 hover:-translate-y-0.5 shadow-xs group/repo">
                    <span class="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    </span>
                    <span class="font-medium text-sky-400 group-hover/repo:text-sky-300 transition-colors">${repoPath}</span>
                    <svg class="w-3 h-3 text-slate-400 group-hover/repo:text-slate-200 group-hover/repo:translate-x-0.5 transition-all ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </a>
            ` : ''}
            ${project.demoLink ? `
                <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer" class="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    ${project.demoLabel || 'Live Demo'}
                </a>
            ` : ''}
        </div>
    ` : `
        <div class="flex items-center gap-2 text-xs text-slate-500 font-medium pt-3 border-t border-slate-100 mt-auto">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            <span>${project.institution || 'The Ohio State University'}</span>
        </div>
    `;

    return `
        <div class="card h-full flex flex-col group">
            ${courseHeader}
            ${logoBlock}
            <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-800 transition-colors">${project.title}</h3>
            <p class="text-slate-600 mb-6 text-sm leading-relaxed flex-grow">${project.description}</p>
            <div class="flex flex-wrap gap-2 mb-6">
                ${project.tech.map(t => `<span class="badge">${t}</span>`).join('')}
            </div>
            ${footerBlock}
        </div>
    `;
}

const softwareProjectsGrid = document.getElementById('software-projects-grid');
const courseworkProjectsGrid = document.getElementById('coursework-projects-grid');
const projectGrid = document.getElementById('project-grid');

if (softwareProjectsGrid && courseworkProjectsGrid) {
    projects.filter(p => p.category === 'software').forEach(project => {
        const col = document.createElement('div');
        col.innerHTML = createProjectCardHtml(project);
        softwareProjectsGrid.appendChild(col.firstElementChild);
    });

    projects.filter(p => p.category === 'coursework').forEach(project => {
        const col = document.createElement('div');
        col.innerHTML = createProjectCardHtml(project);
        courseworkProjectsGrid.appendChild(col.firstElementChild);
    });
} else if (projectGrid) {
    projects.forEach(project => {
        const col = document.createElement('div');
        col.innerHTML = createProjectCardHtml(project);
        projectGrid.appendChild(col.firstElementChild);
    });
}

if (featuredProjectsGrid) {
    // Preserve MoodLogger and UniConnect as featured homepage projects
    const featuredTitles = ['MoodLogger', 'UniConnect'];
    const featuredList = projects.filter(p => featuredTitles.includes(p.title));

    featuredList.forEach(project => {
        const col = document.createElement('div');
        col.innerHTML = createProjectCardHtml(project);
        featuredProjectsGrid.appendChild(col.firstElementChild);
    });
}

// ----------------------------------------------------
// 4. Render Experience Timeline (Experience Page)
// ----------------------------------------------------
const experienceContainer = document.getElementById('experience-container');
if (experienceContainer) {
    experienceContainer.innerHTML = ''; // Clean container

    // Add central vertical timeline line
    const line = document.createElement('div');
    line.className = 'absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-200 -translate-x-1/2 hidden sm:block';
    experienceContainer.appendChild(line);

    experience.forEach((exp, index) => {
        const item = document.createElement('div');
        item.className = 'relative flex flex-col md:flex-row items-stretch w-full mb-10 group';

        const logoSrc = exp.logo ? resolvePath(exp.logo) : '';
        const logoBlock = logoSrc ? `
            <div class="w-16 h-16 rounded-xl bg-white border border-slate-200 p-2 shadow-xs flex-shrink-0 flex items-center justify-center">
                <img src="${logoSrc}" alt="${exp.company} logo" class="max-h-full max-w-full object-contain">
            </div>
        ` : '';

        const locationBlock = exp.location ? `
            <span class="inline-flex items-center gap-1 text-xs text-slate-500 font-normal mt-1">
                <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                ${exp.location}
            </span>
        ` : '';

        let contentCard;
        if (exp.roles && exp.roles.length > 0) {
            const rolesHtml = exp.roles.map((r, rIndex) => {
                const isLast = rIndex === exp.roles.length - 1;
                return `
                    <div class="relative pl-6 ${isLast ? '' : 'pb-6'} group/role">
                        ${isLast ? '' : '<div class="absolute left-1.5 top-3 -bottom-3 w-0.5 bg-slate-200"></div>'}
                        <div class="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-slate-700 group-hover/role:border-teal-700 group-hover/role:scale-110 transition-all shadow-2xs"></div>
                        
                        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                            <h4 class="text-base font-bold text-slate-900 group-hover/role:text-teal-800 transition-colors">${r.role}</h4>
                            <span class="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200/60 px-2 py-0.5 rounded-full self-start flex-shrink-0">
                                ${r.date}
                            </span>
                        </div>
                        <p class="text-slate-600 text-sm leading-relaxed mb-3">${r.description}</p>
                        ${r.tech && r.tech.length > 0 ? `
                            <div class="flex flex-wrap gap-1.5 pt-1">
                                ${r.tech.map(t => `<span class="badge text-[11px]">${t}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                `;
            }).join('');

            contentCard = `
                <div class="card w-full text-left relative">
                    <div class="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                        <div class="flex items-center gap-3.5">
                            ${logoBlock}
                            <div>
                                <h3 class="text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors">${exp.company}</h3>
                                <div class="text-slate-500 font-medium text-xs flex items-center gap-2 flex-wrap mt-0.5">
                                    <span>${exp.date}</span>
                                    ${locationBlock}
                                </div>
                            </div>
                        </div>
                        <span class="text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/60 px-2.5 py-1 rounded-full flex-shrink-0 self-start">
                            ${exp.roles.length} roles
                        </span>
                    </div>
                    <div class="pt-1">
                        ${rolesHtml}
                    </div>
                </div>
            `;
        } else {
            contentCard = `
                <div class="card w-full text-left relative">
                    <div class="flex items-start justify-between gap-4 mb-3">
                        <div class="flex items-center gap-3.5">
                            ${logoBlock}
                            <div>
                                <h3 class="text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors">${exp.role}</h3>
                                <h4 class="text-slate-700 font-medium text-sm flex items-center gap-2 flex-wrap">
                                    ${exp.company}
                                    ${locationBlock}
                                </h4>
                            </div>
                        </div>
                        <span class="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-full flex-shrink-0 self-start">
                            ${exp.date}
                        </span>
                    </div>
                    <p class="text-slate-600 text-sm leading-relaxed mb-4">${exp.description}</p>
                    ${exp.tech && exp.tech.length > 0 ? `
                        <div class="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                            ${exp.tech.map(t => `<span class="badge text-[11px]">${t}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }

        item.innerHTML = `
            <div class="hidden sm:block absolute left-6 md:left-1/2 w-4 h-4 bg-white border-4 border-slate-900 rounded-full -translate-x-1/2 top-6 z-10 shadow-xs group-hover:scale-125 transition-transform"></div>
            <div class="w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10 md:ml-auto'}">
                ${contentCard}
            </div>
        `;

        experienceContainer.appendChild(item);
    });
}
