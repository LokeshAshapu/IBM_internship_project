const app = document.getElementById("app");

function navigate(view) {
  if (view === 'skills') loadSkillsView();
  else if (view === 'roles') loadRolesView();
  else if (view === 'gap') loadGapView();
  else if (view === 'roadmap') loadRoadmapView();
}

function loadSkillsView() {
  app.innerHTML = `
    <h2 class="text-xl font-semibold mb-4">Enter Your Skills</h2>
    <div class="mb-4">
      <input type="text" id="skillName" placeholder="Skill Name" class="border px-2 py-1 mr-2" />
      <input type="range" id="skillLevel" min="1" max="5" class="mr-2" />
      <button class="btn" onclick="addSkill()">Add Skill</button>
    </div>
    <ul id="skillList" class="list-disc pl-6"></ul>
  `;
  displaySkills();
}

const skills = JSON.parse(localStorage.getItem("skills") || "[]");

function addSkill() {
  const name = document.getElementById("skillName").value.trim();
  const level = document.getElementById("skillLevel").value;
  if (!name) return alert("Please enter a skill name.");
  skills.push({ name, level });
  localStorage.setItem("skills", JSON.stringify(skills));
  displaySkills();
}

function removeSkill(index) {
  skills.splice(index, 1);
  localStorage.setItem("skills", JSON.stringify(skills));
  displaySkills();
}

function displaySkills() {
  const list = document.getElementById("skillList");
  if (!list) return;
  list.innerHTML = skills.map((s, i) => `
    <li class="mb-1 flex items-center">
      <span>${s.name} - Level ${s.level}</span>
      <button onclick="editSkill(${i})" class="text-blue-500 ml-2">Edit</button>
      <button onclick="removeSkill(${i})" class="text-red-500 ml-2">x</button>
    </li>
  `).join("");
}

function editSkill(index) {
  const skill = skills[index];
  const newName = prompt("Edit skill name:", skill.name);
  if (newName === null) return;
  const newLevel = prompt("Edit skill level (1-5):", skill.level);
  if (newLevel === null) return;
  skills[index] = { name: newName, level: newLevel };
  localStorage.setItem("skills", JSON.stringify(skills));
  displaySkills();
}

function loadRolesView() {
  app.innerHTML = `
    <h2 class="text-xl font-semibold mb-4">Select a Career Role</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="p-4 border rounded cursor-pointer hover:bg-blue-100" onclick="selectRole('Frontend Developer')">
        <h3 class="font-semibold">Frontend Developer</h3>
        <p>HTML, CSS, JS, React</p>
      </div>
      <div class="p-4 border rounded cursor-pointer hover:bg-blue-100" onclick="selectRole('Data Scientist')">
        <h3 class="font-semibold">Data Scientist</h3>
        <p>Python, Pandas, Numpy, ML</p>
      </div>
    </div>
  `;
}

let selectedRole = null;
const roleSkills = {
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React"],
  "Data Scientist": ["Python", "Pandas", "Numpy", "Machine Learning"]
};

function selectRole(role) {
  selectedRole = role;
  localStorage.setItem("selectedRole", role);
  alert("Selected role: " + role);
}

function loadGapView() {
  const role = localStorage.getItem("selectedRole");
  if (!role) {
    app.innerHTML = "<p class='text-red-500'>Please select a career role first.</p>";
    return;
  }
  const required = roleSkills[role];
  const existing = skills.map(s => s.name);
  const missing = required.filter(r => !existing.includes(r));
  app.innerHTML = `
    <h2 class="text-xl font-semibold mb-4">Gap Analysis for ${role}</h2>
    <ul class="list-disc pl-6 mb-4">${missing.map(m => `<li>${m}</li>`).join("")}</ul>
    <canvas id="gapChart" width="400" height="200"></canvas>
  `;
  renderChart(required, existing);
}

function renderChart(required, existing) {
  const ctx = document.getElementById('gapChart');
  const labels = required;
  const data = labels.map(label => existing.includes(label) ? 1 : 0);
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Skill Match',
        data,
        backgroundColor: data.map(v => v ? 'green' : 'red')
      }]
    }
  });
}

function loadRoadmapView() {
  const role = localStorage.getItem("selectedRole");
  if (!role) {
    app.innerHTML = "<p class='text-red-500'>Please select a role first.</p>";
    return;
  }
  const required = roleSkills[role];
  const existing = skills.map(s => s.name);
  const missing = required.filter(r => !existing.includes(r));
  const completed = required.length - missing.length;
  const percent = Math.round((completed / required.length) * 100);

  app.innerHTML = `
    <h2 class="text-xl font-semibold mb-4">Learning Roadmap</h2>
    <div class="mb-4">
      <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div class="bg-blue-500 h-4 rounded-full" style="width:${percent}%"></div>
      </div>
      <span>${completed} of ${required.length} skills completed (${percent}%)</span>
    </div>
    <ul class="list-disc pl-6">
      ${missing.map(m => `<li>
        <button class="text-blue-600 underline" onclick="showSkillVideo('${m}')">Learn: ${m}</button>
      </li>`).join("")}
    </ul>
    <div id="skillVideoArea"></div>
  `;
}

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("SkillSync - My Skills", 10, 10);
  skills.forEach((s, i) => {
    doc.text(s.name + ": Level " + s.level, 10, 20 + i * 10);
  });
  doc.save("SkillSync_Report.pdf");
}
function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("SkillSync - My Skills", 10, 10);
  skills.forEach((s, i) => {
    doc.text(s.name + ": Level " + s.level, 10, 20 + i * 10);
  });
  doc.save("SkillSync_Report.pdf");
}

const skillVideos = {
  "HTML": [
    { title: "HTML Crash Course", url: "https://www.youtube.com/embed/UB1O30fR-EE" }
  ],
  "CSS": [
    { title: "CSS Crash Course", url: "https://www.youtube.com/embed/yfoY53QXEnI" }
  ],
  "JavaScript": [
    { title: "JavaScript Tutorial", url: "https://www.youtube.com/embed/hdI2bqOjy3c" }
  ],
  "React": [
    { title: "React JS Crash Course", url: "https://www.youtube.com/embed/w7ejDZ8SWv8" }
  ],
  "Python": [
    { title: "Python for Beginners", url: "https://www.youtube.com/embed/rfscVS0vtbw" }
  ],
  "Pandas": [
    { title: "Pandas Tutorial", url: "https://www.youtube.com/embed/vmEHCJofslg" }
  ],
  "Numpy": [
    { title: "NumPy Tutorial", url: "https://www.youtube.com/embed/QUT1VHiLmmI" }
  ],
  "Machine Learning": [
    { title: "Machine Learning Crash Course", url: "https://www.youtube.com/embed/GwIo3gDZCVQ" }
  ]
};

// Make showSkillVideo global
function showSkillVideo(skill) {
  const videos = skillVideos[skill] || [];
  let selectedSkillVideoHtml = "";
  if (!videos.length) {
    selectedSkillVideoHtml = `<div class="mt-4 text-red-500">No video found for ${skill}.</div>`;
  } else {
    selectedSkillVideoHtml = `
      <div class="mt-4">
        <h3 class="text-lg font-semibold mb-2">${skill} Learning Videos</h3>
        ${videos.map(v => `
          <div class="mb-4">
            <iframe width="50%" height="400" src="${v.url}" title="${v.title}" frameborder="0" allowfullscreen></iframe>
            <div class="mt-1 text-sm">${v.title}</div>
            <button class="btn mt-2" onclick="downloadNotes('${skill}')">Download Full Notes</button>
          </div>
        `).join("")}
      </div>
    `;
  }
  const videoArea = document.getElementById("skillVideoArea");
  if (videoArea) videoArea.innerHTML = selectedSkillVideoHtml;
}

// Add this function globally
function downloadNotes(skill) {
  const notes = skillNotes[skill] || "No notes available.";
  const blob = new Blob([notes], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${skill}_notes.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  hamburger.addEventListener("click", function() {
    navMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", function(e) {
    if (!navMenu.contains(e.target) && e.target !== hamburger) {
      navMenu.classList.add("hidden");
    }
  });
});
function loadRoadmapView() {
  const role = localStorage.getItem("selectedRole");
  if (!role) {
    app.innerHTML = "<p class='text-red-500'>Please select a role first.</p>";
    return;
  }
  const required = roleSkills[role];
  const existing = skills.map(s => s.name);
  const missing = required.filter(r => !existing.includes(r));
  const completed = required.length - missing.length;
  const percent = Math.round((completed / required.length) * 100);

  app.innerHTML = `
    <h2 class="text-xl font-semibold mb-4">Learning Roadmap</h2>
    <div class="mb-4">
      <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div class="bg-blue-500 h-4 rounded-full" style="width:${percent}%"></div>
      </div>
      <span>${completed} of ${required.length} skills completed (${percent}%)</span>
    </div>
    <ul class="list-disc pl-6">
      ${missing.map(m => `<li>
        <button class="text-blue-600 underline" onclick="showSkillVideo('${m}')">Learn: ${m}</button>
      </li>`).join("")}
    </ul>
    <div id="skillVideoArea"></div>
  `;
}

const skillNotes = {
  "HTML": "HTML is the standard markup language for creating web pages. Key topics: tags, attributes, structure, forms, semantic elements.",
  "CSS": "CSS is used for styling web pages. Key topics: selectors, box model, flexbox, grid, responsive design.",
  "JavaScript": "JavaScript is a scripting language for web development. Key topics: variables, functions, DOM, events, ES6 features.",
  "React": "React is a JavaScript library for building user interfaces. Key topics: components, props, state, hooks, JSX.",
  "Python": "Python is a versatile programming language. Key topics: syntax, data types, functions, libraries, OOP.",
  "Pandas": "Pandas is a Python library for data analysis. Key topics: DataFrames, Series, data manipulation, aggregation.",
  "Numpy": "NumPy is a Python library for numerical computing. Key topics: arrays, operations, broadcasting, indexing.",
  "Machine Learning": "Machine Learning involves algorithms for data prediction. Key topics: supervised/unsupervised learning, regression, classification, model evaluation."
};
