const cursor = document.getElementById('cursor');
const screenWidth = window.innerWidth;

// Update cursor position based on mouse movement
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const mirroredX = screenWidth - x;

  // Set cursor position
  cursor.style.left = `${mirroredX}px`;
  cursor.style.top = `300px`;
});