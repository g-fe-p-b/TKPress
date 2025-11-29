(function () {
  // Toast simples
  function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerHTML = `<div class="msg">${message}</div>`;
    toast.hidden = false;
    setTimeout(() => {
      toast.hidden = true;
      toast.innerHTML = '';
    }, 3500);
  };

  // CTA buttons
  const ctaRead = document.getElementById('cta-read');
  const ctaNew = document.getElementById('cta-new');

  if (ctaRead) {
    ctaRead.addEventListener('click', () => {
      window.location.href = '/articles';
    });
  };

  if (ctaNew) {
    ctaNew.addEventListener('click', async () => {
      window.location.href = '/articles/new';
    });
  };

  // Tabs no painel de autenticação
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const cancelReg = document.getElementById('cancel-reg');

  if (tabLogin && tabRegister && loginForm && registerForm) {
    tabLogin.addEventListener('click', () => {
      tabLogin.setAttribute('aria-pressed', 'true');
      tabRegister.setAttribute('aria-pressed', 'false');
      loginForm.style.display = '';
      registerForm.style.display = 'none';
    });
    tabRegister.addEventListener('click', () => {
      tabRegister.setAttribute('aria-pressed', 'true');
      tabLogin.setAttribute('aria-pressed', 'false');
      registerForm.style.display = '';
      loginForm.style.display = 'none';
    });
    cancelReg && cancelReg.addEventListener('click', () => {
      tabLogin.click();
    });
  }

  // Validar CPF
function validarCPF(cpf) {
  const numeros = cpf.replace(/\D/g, '').split('').map(Number);
  if (numeros.length !== 11) return false;

  const base = numeros.slice(0, 9);
  let soma1 = 0;
  for (let i = 0; i < 9; i++) soma1 += base[i] * (i + 1);
  let b1 = soma1 % 11;
  if (b1 === 10) b1 = 0;

  let soma2 = 0;
  for (let i = 0; i < 9; i++) soma2 += base[i] * (9 - i);
  let b2 = soma2 % 11;
  if (b2 === 10) b2 = 0;

  return numeros[9] === b1 && numeros[10] === b2;
};

if (registerForm) {
  registerForm.addEventListener('submit', () => {
    const nome = registerForm.name.value.trim();
    const email = registerForm.email.value.trim();
    const cpf = registerForm.cpf.value.trim();
    const senha = registerForm.password.value.trim();

    if (!nome || !email || !cpf || !senha) {
      e.preventDefault();
      showToast('Todos os campos são obrigatórios');
      return;
    };

    if (!validarCPF(cpf)) {
      e.preventDefault();
      showToast('CPF inválido');
      return;
    };
  });
};


document.addEventListener('DOMContentLoaded', () =>{
  const deleteForms = document.querySelectorAll('.form-delete');
  deleteForms.forEach(form => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const message = event.target.dataset.confirmMessage;
      if (confirm(message)){
        event.target.submit();
      };
    });
  });
});


  // Toggle dark theme
  const themeToggleId = 'theme-toggle';
  function applyTheme(theme) {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('tk_theme', theme);
  };
  // criar botão se não existir
  const existingToggle = document.getElementById(themeToggleId);
  if (!existingToggle) {
    const btn = document.createElement('button');
    btn.id = themeToggleId;
    btn.className = 'btn ghost';
    btn.style.marginLeft = '8px';
    btn.type = 'button';
    btn.innerText = 'Tema';
    btn.addEventListener('click', () => {
      const current = localStorage.getItem('tk_theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
    // anexar ao header se possível
    const header = document.querySelector('.header');
    if (header) header.appendChild(btn);
  };
  // inicializa tema salvo
  const saved = localStorage.getItem('tk_theme') || 'light';
  applyTheme(saved);
})();
