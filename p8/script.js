document.addEventListener('DOMContentLoaded', function () {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const currentItem = this.parentElement;
            const isActive = currentItem.classList.contains('active');
            document.querySelectorAll('.accordion-item.active').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('active');
                }
            });
            if (isActive) {
                currentItem.classList.remove('active');
            } else {
                currentItem.classList.add('active');
            }
        });
    });
});