import checkNumImputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          windows = document.querySelectorAll('[data-modal]');
    
    checkNumImputs('input[name="user_phone"]');

    const messages = {
        loading: 'Подождите, идет загрузка',
        success: 'Форма отправлена! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так..'
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = messages.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        item.appendChild(statusMessage);

        const formData = new FormData(item);
        if (item.getAttribute('data-calc') === "end") {
            for (let key in state) {
                formData.append(key, state[key]);
            };
        };

        postData('assets/server.php', formData)
            .then(res => {
                console.log(res);
                statusMessage.textContent = messages.success;
            })
            .catch(() => statusMessage.textContent = messages.failure)
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                    windows.forEach(item => {
                        item.style.display = 'none';
                    });
                    item.style.display = 'none';
                    document.body.style.overflow =' ';
                }, 3000);
            });
        });
    });
};

export default forms;