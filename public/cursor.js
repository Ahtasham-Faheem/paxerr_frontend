export const cursor = function () {
  // Prevent duplicate cursors
  if (document.querySelector(".cursor")) return;

  // Create cursors
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  document.body.appendChild(cursor);

  const outerCursor = document.createElement("div");
  outerCursor.classList.add("cursor-outer");
  document.body.appendChild(outerCursor);

  // Hide cursors initially
  cursor.style.opacity = "0";
  outerCursor.style.opacity = "0";

  let mouseX = 0,
    mouseY = 0;
  let outerX = 0,
    outerY = 0;
  const delay = 0.1;
  let hasMoved = false;

  // Update cursor positions
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Show cursors when user moves the mouse for the first time
    if (!hasMoved) {
      cursor.style.opacity = "1";
      outerCursor.style.opacity = "1";
      hasMoved = true;
    }

    cursor.style.left = `${mouseX - cursor.offsetWidth / 2}px`;
    cursor.style.top = `${mouseY - cursor.offsetHeight / 2}px`;
  });

  // Animate the outer cursor to follow with delay
  function animateOuterCursor() {
    outerX += (mouseX - outerX) * delay;
    outerY += (mouseY - outerY) * delay;

    outerCursor.style.left = `${outerX - outerCursor.offsetWidth / 2}px`;
    outerCursor.style.top = `${outerY - outerCursor.offsetHeight / 2}px`;

    requestAnimationFrame(animateOuterCursor);
  }

  animateOuterCursor();

  // Fix hover effect across all pages
  function updateHoverEffect() {
    document.querySelectorAll("button, a").forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.style.backgroundColor = "white";
        outerCursor.style.borderColor = "white";
      });

      element.addEventListener("mouseleave", () => {
        cursor.style.backgroundColor = "#EB5939";
        outerCursor.style.borderColor = "#EB5939";
      });
    });
  }

  // Run it initially
  updateHoverEffect();

  // Fix Next.js navigation issue
  const observer = new MutationObserver(() => {
    updateHoverEffect();
  });

  observer.observe(document.body, { childList: true, subtree: true });
};
