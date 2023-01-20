const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector);

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target) {
                    e.preventDefault();
                }
    
                modal.style.display='block';
                document.body.style.overflow='hidden';
    
                close.addEventListener('click', () => {
                    modal.style.display='none';
                    document.body.style.overflow='';
                });
    
                modal.addEventListener('click', (e) => {
                    if(e.target === modal) {
                        modal.style.display='none';
                        document.body.style.overflow='';
                    }
                });
    
            });
        })
    }

    function showModalByTime(modalSelector, modalTime,  closeSelector) {
        const modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector);

        setTimeout(function() {
            modal.style.display = 'block';
            document.body.style.overflow = "hidden";
        }, modalTime);

        close.addEventListener('click', () => {
            modal.style.display='none';
            document.body.style.overflow='';
        });

        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                modal.style.display='none';
                document.body.style.overflow='';
            }
        });

    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup_engineer', '.popup_engineer .popup_close');
    showModalByTime('.popup_engineer', 60000, '.popup_engineer .popup_close');
};

export default modals;