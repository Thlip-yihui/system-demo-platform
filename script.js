document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loading = document.querySelector('.loading');

    // 检查是否已登录
    if (localStorage.getItem('isLoggedIn') === 'true' && window.location.pathname.includes('login.html')) {
        window.location.href = 'index.html';
    }

    // 添加输入框动画效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-5px)';
        });
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        // 显示加载动画
        loading.style.display = 'flex';
        
        // 模拟API请求延迟
        setTimeout(() => {
            // 这里可以替换为实际的API验证
            if (username === 'admin' && password === 'password') {
                // 登录成功
                if (rememberMe) {
                    localStorage.setItem('username', username);
                }
                localStorage.setItem('isLoggedIn', 'true');
                
                // 添加登录成功动画
                loginForm.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 300);
            } else {
                // 登录失败
                loading.style.display = 'none';
                alert('用户名或密码错误！');
                
                // 添加错误动画
                loginForm.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    loginForm.style.animation = '';
                }, 500);
            }
        }, 1000);
    });

    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'l') {
            document.getElementById('username').focus();
        }
    });
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style); 