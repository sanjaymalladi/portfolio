import ssh2 from 'ssh2';
const { Server } = ssh2;
import crypto from 'crypto';
import readline from 'readline';
import pc from 'picocolors';
import figlet from 'figlet';

// Simple data store matching portfolio
const portfolioData = {
  about: `Building The Future With AI\nI'm a ComfyUI Engineer at ShopOS, where I develop AI-powered tools for creative workflows.\nWith 53+ repositories and a passion for generative AI, I bridge the gap between complex machine learning systems and practical applications.\nMy expertise spans across Python, TypeScript, React, and various AI/ML frameworks.`,
  experience: [
    { role: "Workflow Engineer", org: "ShopOS", period: "Jun 2025 - Present" },
    { role: "Summer Research Intern", org: "College of Control Science and Engineering, Zhejiang University", period: "May 2025 - Jun 2025" },
    { role: "Technical Head", org: "Graphic Cafe - Media Cell of NIT Andhra", period: "Oct 2024 - May 2025" },
    { role: "Sponsorship Lead", org: "TEDx NIT Andhra Pradesh", period: "May 2024 - Nov 2024" },
    { role: "Summer Intern", org: "Indian Institute of Technology (BHU), Varanasi", period: "May 2024 - Jul 2024" }
  ],
  projects: [
    { title: "AI Avatar Explainer Video", tags: ["ComfyUI", "Open Source", "Video"] },
    { title: "India Demographic Insights", tags: ["Next.js", "React", "Geospatial Analytics"] },
    { title: "AI Ramp Walk", tags: ["Generative Video", "LoRA", "WAN 2.1"] },
    { title: "Heat GPT", tags: ["NDA", "Research Collaboration", "LLM"] },
    { title: "InfluencerFlow", tags: ["JavaScript", "AI", "Platform"] },
    { title: "Cluely for Brands", tags: ["TypeScript", "GenAI", "Marketing"] }
  ],
  education: [
    { degree: "B.Tech Chemical Engineering", org: "NIT Andhra Pradesh", period: "2021 - 2025" },
    { degree: "B.Sc Data Science", org: "IIT Madras", period: "2022 - 2024" }
  ],
  contact: [
    { platform: "GitHub", link: "https://github.com/sanjaymalladi" },
    { platform: "LinkedIn", link: "https://linkedin.com/in/sanjaymalladi" },
    { platform: "Email", link: "mailto:malladisanjay29@gmail.com" }
  ]
};

// Generate a temporary RSA key for the server (In production, load a saved key)
const { privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
});

const PORT = 2222;

const server = new Server({ hostKeys: [privateKey] }, (client) => {
  client.on('authentication', (ctx) => {
    // Accept any username/password/key for the portfolio
    ctx.accept();
  }).on('ready', () => {
    client.on('session', (accept, reject) => {
      const session = accept();
      
      session.on('pty', (accept, reject, info) => {
        accept();
      });

      session.on('shell', (accept, reject) => {
        const stream = accept();
        
        // Print Welcome Banner
        figlet('Sanjay Malladi', { font: 'Slant' }, (err, data) => {
          if (!err) {
            stream.write(pc.cyan(data.replace(/\n/g, '\r\n')) + '\r\n\r\n');
          }
          stream.write(pc.bold(pc.yellow('Welcome to my interactive terminal portfolio!')) + '\r\n');
          stream.write(pc.gray('Type ') + pc.green('help') + pc.gray(' to see available commands.') + '\r\n\r\n');
          
          startRepl(stream, client);
        });
      });
    });
  });
});

function startRepl(stream, client) {
  const rl = readline.createInterface({
    input: stream,
    output: stream,
    terminal: true,
    prompt: pc.blue('guest@sanjay-portfolio') + pc.white(':') + pc.magenta('~') + pc.white('$ ')
  });

  rl.prompt();

  rl.on('line', (line) => {
    const cmd = line.trim().toLowerCase();
    
    if (cmd === 'help') {
      stream.write(pc.green('Available commands:\r\n'));
      stream.write(`  ${pc.yellow('about')}       - Learn more about me\r\n`);
      stream.write(`  ${pc.yellow('experience')}  - View my work experience\r\n`);
      stream.write(`  ${pc.yellow('projects')}    - See my selected projects\r\n`);
      stream.write(`  ${pc.yellow('education')}   - View my educational background\r\n`);
      stream.write(`  ${pc.yellow('contact')}     - Get my contact information\r\n`);
      stream.write(`  ${pc.yellow('clear')}       - Clear the terminal screen\r\n`);
      stream.write(`  ${pc.yellow('exit')}        - Close connection\r\n`);
    } else if (cmd === 'about') {
      stream.write(pc.cyan('\n--- ABOUT ME ---\r\n'));
      stream.write(portfolioData.about.replace(/\n/g, '\r\n') + '\r\n\r\n');
    } else if (cmd === 'experience') {
      stream.write(pc.cyan('\n--- EXPERIENCE ---\r\n'));
      portfolioData.experience.forEach(exp => {
        stream.write(`${pc.bold(exp.role)} @ ${pc.green(exp.org)}\r\n`);
        stream.write(pc.gray(`  ${exp.period}\r\n\r\n`));
      });
    } else if (cmd === 'projects') {
      stream.write(pc.cyan('\n--- SELECTED WORK ---\r\n'));
      portfolioData.projects.forEach(proj => {
        stream.write(`${pc.bold(pc.yellow(proj.title))}\r\n`);
        stream.write(`  Tags: ${pc.blue(proj.tags.join(', '))}\r\n\r\n`);
      });
    } else if (cmd === 'education') {
      stream.write(pc.cyan('\n--- EDUCATION ---\r\n'));
      portfolioData.education.forEach(edu => {
        stream.write(`${pc.bold(edu.degree)}\r\n`);
        stream.write(`${pc.green(edu.org)} ${pc.gray(`| ${edu.period}`)}\r\n\r\n`);
      });
    } else if (cmd === 'contact') {
      stream.write(pc.cyan('\n--- CONTACT ---\r\n'));
      portfolioData.contact.forEach(c => {
        stream.write(`${pc.bold(c.platform)}: ${pc.blue(c.link)}\r\n`);
      });
      stream.write('\r\n');
    } else if (cmd === 'clear') {
      // ANSI escape sequence to clear screen and move cursor to top left
      stream.write('\x1B[2J\x1B[0;0H');
    } else if (cmd === 'exit') {
      stream.write(pc.yellow('Goodbye! Thanks for visiting.\r\n'));
      stream.end();
      client.end();
      return;
    } else if (cmd !== '') {
      stream.write(pc.red(`Command not found: ${cmd}. Type 'help' for available commands.\r\n`));
    }
    
    rl.prompt();
  });

  rl.on('close', () => {
    stream.end();
    client.end();
  });
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Terminal Portfolio] SSH Server listening on port ${PORT}`);
  console.log(`Test it locally by running: ssh -p ${PORT} localhost`);
});
