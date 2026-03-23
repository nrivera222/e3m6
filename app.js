const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();

// 1. Archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); 

// 2. Configurar motor de plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// 3. Registrar Parciales (Header y Footer)
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// 4. Helper de prioridad
hbs.registerHelper('priorityClass', function(priority) {
  if (priority === 'alta') return 'priority-high';
  if (priority === 'media') return 'priority-medium';
  return 'priority-low';
});

// Registrar el helper llamado 'mayusculas'
hbs.registerHelper('mayusculas', function(text) {
    if (text && typeof text === 'string') {
        return text.toUpperCase();
    }
    return ''; // Devuelve cadena vacía si no hay texto
});

// --- RUTAS ---

app.get('/perfil', (req, res) => {
  res.render('perfil', {
    nombre: 'Gabriela',
    profesion: 'Desarrolladora Web'
  });
});

app.get('/dashboard', (req, res) => {
  const data = {
    user: { name: 'Juan', isAdmin: true },
    projects: [
      {
        name: 'API Gateway',
        isCompleted: false,
        tasks: [
          { description: 'Diseñar endpoints', priority: 'alta' },
          { description: 'Implementar JWT', priority: 'alta' },
            { description: 'colgar la ropa', priority: 'media' }
        ]
      },
      {
        name: 'Refactor del Frontend',
        isCompleted: true,
        tasks: [{ description: 'Actualizar React', priority: 'baja' }]
      }
    ]
  };
  res.render('dashboard', data);
});

app.listen(3000, () => {
  console.log('Servidor listo en http://localhost:3000');
});