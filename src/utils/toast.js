
export function showToast(message, type = "success") {
  const container = document.getElementById('toast-container');

  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600"
  };

  const toast = document.createElement('div');

  toast.className = `
    ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg 
    transform transition-all duration-300 translate-y-10 opacity-0
  `;

  toast.innerText = message;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-10');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}