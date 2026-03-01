const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'projects.html'));
});

// API: Contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields.' });
  }

  // Log to console (replace with email/DB logic in production)
  console.log('\n--- NEW CONTACT SUBMISSION ---');
  console.log(`From:    ${name} <${email}>`);
  console.log(`Service: ${service || 'Not specified'}`);
  console.log(`Message: ${message}`);
  console.log('------------------------------\n');

  res.json({ success: true, message: 'Message received. I will get back to you shortly.' });
});

// API: GitHub projects proxy (fetches uchi-c public repos)
app.get('/api/github-projects', async (req, res) => {
  try {
    const response = await fetch('https://api.github.com/users/uchi-c/repos?sort=updated&per_page=20', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'uchi-portfolio-server'
      }
    });
    if (!response.ok) throw new Error('GitHub API error');
    const repos = await response.json();
    const filtered = repos.map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      updated: r.updated_at,
      topics: r.topics
    }));
    res.json({ success: true, repos: filtered });
  } catch (err) {
    // Return fallback data if GitHub is unreachable
    res.json({
      success: true,
      repos: [],
      fallback: true,
      message: 'Live GitHub data unavailable — showing featured projects.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n🔐 Shadow Root Portfolio running on http://localhost:${PORT}\n`);
});
