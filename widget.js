(function() {
  const script = document.currentScript;
  const color = script.dataset.color || '#3b82f6';
  const brand = script.dataset.brand || 'NexusAI';
  const src = script.dataset.src || window.location.origin;
  
  const bubble = document.createElement('div');
  bubble.style.cssText = `
    position: fixed; right: 20px; bottom: 20px;
    width: 58px; height: 58px; border-radius: 50%;
    background: ${color}; color: #fff;
    display: flex; align-items: center; justify-content: center;
    font: 700 18px Inter, sans-serif;
    box-shadow: 0 10px 30px rgba(0,0,0,.25);
    cursor: pointer; z-index: 999999;
    transition: transform .2s;
  `;
  bubble.textContent = brand[0] || 'N';
  bubble.onmouseenter = () => bubble.style.transform = 'scale(1.08)';
  bubble.onmouseleave = () => bubble.style.transform = 'scale(1)';
  
  const panel = document.createElement('iframe');
  panel.src = src + '/';
  panel.style.cssText = `
    position: fixed; right: 20px; bottom: 90px;
    width: 380px; height: 640px; border: none;
    border-radius: 18px;
    box-shadow: 0 18px 50px rgba(0,0,0,.28);
    display: none; z-index: 999998; background: #fff;
  `;
  
  bubble.onclick = () => {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  };
  
  document.body.appendChild(panel);
  document.body.appendChild(bubble);
})();
