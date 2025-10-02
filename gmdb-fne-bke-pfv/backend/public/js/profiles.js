// profiles.js
// Handles fetching & rendering user profiles and creating/updating/deleting

// Base API path for users
const API_BASE = '/api/users';

// DOM elements
const usersList = document.getElementById('usersList');
const addUserForm = document.getElementById('addUserForm');

// Helper: create an element with optional classes & text
function el(tag, opts = {}) {
  const e = document.createElement(tag);
  if (opts.class) e.className = opts.class;
  if (opts.text) e.textContent = opts.text;
  return e;
}

// Render a single user card
function renderUserCard(user) {
  const card = el('div', { class: 'card user-card' });

  // Avatar (or placeholder)
  const avatar = el('div', { class: 'avatar' });
  const img = document.createElement('img');
  img.src = user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ddd`;
  img.alt = user.name;
  avatar.appendChild(img);

  // Info container
  const info = el('div', { class: 'user-info' });
  info.appendChild(el('h3', { text: user.name }));
  info.appendChild(el('p', { text: user.email }));
  if (user.age) info.appendChild(el('p', { text: `Age: ${user.age}` }));
  if (user.bio) {
    const bio = el('p');
    bio.textContent = user.bio;
    bio.className = 'bio';
    info.appendChild(bio);
  }

  // Actions: Edit, Delete
  const actions = el('div', { class: 'actions' });

  const editBtn = el('button', { class: 'btn', text: 'Edit' });
  editBtn.addEventListener('click', () => openEditDialog(user));

  const delBtn = el('button', { class: 'btn danger', text: 'Delete' });
  delBtn.addEventListener('click', () => deleteUser(user._id));

  actions.appendChild(editBtn);
  actions.appendChild(delBtn);

  card.appendChild(avatar);
  card.appendChild(info);
  card.appendChild(actions);

  return card;
}

// Fetch all users and render them
async function loadUsers() {
  try {
    usersList.innerHTML = 'Loading...';
    const res = await fetch(API_BASE);
    const users = await res.json();
    usersList.innerHTML = '';

    if (users.length === 0) {
      usersList.textContent = 'No users yet. Add one!';
      return;
    }

    users.forEach(user => {
      usersList.appendChild(renderUserCard(user));
    });
  } catch (err) {
    usersList.textContent = 'Failed to load users';
    console.error(err);
  }
}

// Add user via form
addUserForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Collect field values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const age = parseInt(document.getElementById('age').value) || undefined;
  const avatarUrl = document.getElementById('avatarUrl').value.trim() || undefined;
  const bio = document.getElementById('bio').value.trim() || undefined;

  // Basic validation (name and email are required)
  if (!name || !email) return alert('Name and email are required');

  try {
    // Send POST request to create user
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, age, avatarUrl, bio })
    });

    if (!res.ok) {
      const error = await res.json();
      return alert('Error: ' + (error.error || res.statusText));
    }

    // Reset form and reload list
    addUserForm.reset();
    loadUsers();
  } catch (err) {
    console.error(err);
    alert('Failed to add user');
  }
});

// Open a simple prompt-based edit dialog (keeps UI minimal)
// For production you'd want a proper modal with form fields
function openEditDialog(user) {
  const name = prompt('Name:', user.name);
  if (name === null) return; // cancelled
  const email = prompt('Email:', user.email);
  if (email === null) return;
  const age = prompt('Age (leave blank to clear):', user.age || '');
  if (age === null) return;
  const avatarUrl = prompt('Avatar URL:', user.avatarUrl || '');
  if (avatarUrl === null) return;
  const bio = prompt('Bio:', user.bio || '');
  if (bio === null) return;

  // Build update payload (omit empty strings)
  const payload = {
    name: name.trim(),
    email: email.trim(),
    age: age.trim() ? parseInt(age.trim()) : undefined,
    avatarUrl: avatarUrl.trim() || undefined,
    bio: bio.trim() || undefined
  };

  // Send update
  fetch(`${API_BASE}/${user._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(async res => {
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Update failed');
      }
      loadUsers();
    })
    .catch(err => {
      console.error(err);
      alert('Failed to update user: ' + err.message);
    });
}

// Delete a user (confirm first)
function deleteUser(id) {
  if (!confirm('Delete this user?')) return;
  fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
    .then(async res => {
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Delete failed');
      }
      loadUsers();
    })
    .catch(err => {
      console.error(err);
      alert('Failed to delete user: ' + err.message);
    });
}

// Initial load on page open
loadUsers();
