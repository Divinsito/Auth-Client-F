// src/blog/api/mockBlogApi.js
const mockPosts = [
  { id: 1, title: "Bienvenidos al Blog", body: "Este es el primer post de prueba del sistema mock. Cumple con el requerimiento de usar datos simulados para el ejercicio. Aquí iría un texto mucho más largo para simular un post real y detallado." },
  { id: 2, title: "Novedades del Proyecto", body: "Esta semana añadimos nuevas funciones de seguridad y mejoramos la experiencia de usuario. Hemos actualizado la dependencia de Tailwind CSS para incluir nuevas utilidades de diseño modular. Este post simula ser el segundo contenido importante del blog." },
  { id: 3, title: "Frontend Modular", body: "Aprendemos a separar módulos por responsabilidad única. Este enfoque nos ayuda a escalar la aplicación de forma eficiente. La clave es el principio de Responsabilidad Única (SRP) aplicado a directorios y archivos." },
  { id: 4, title: "La Importancia del Mocking", body: "Simular datos permite desarrollar el frontend sin dependencia inmediata del backend. Es crucial para el desarrollo ágil, permitiendo a los desarrolladores trabajar en paralelo. Este es un ejemplo de cómo manejar datos ficticios." },
];

export const getPosts = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.05) { 
        reject(new Error("Falla simulada: El servicio de posts no está disponible."));
      } else {
        const sortedPosts = mockPosts.sort((a, b) => b.id - a.id); 
        resolve({ data: sortedPosts });
      }
    }, 800);
  });
};

export const getPostById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const postId = Number(id);
      const post = mockPosts.find((p) => p.id === postId);

      if (!post) {
        reject(new Error(`Post con ID ${id} no encontrado.`));
      } else {
        resolve({ data: post });
      }
    }, 500);
  });
};