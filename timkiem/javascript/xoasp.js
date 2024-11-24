// Thêm sản phẩm mới (giả lập)
document.querySelector('.add-btn').addEventListener('click', () => {
    alert('Chức năng "Thêm sản phẩm" chưa được triển khai!');
});

// Xem sản phẩm
document.querySelectorAll('.view-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        alert('Xem thông tin sản phẩm!');
    });
});

// Xóa sản phẩm
document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            e.target.closest('tr').remove();
        }
    });
});

// Làm mới bộ lọc
document.querySelector('.reset-btn').addEventListener('click', () => {
    document.querySelector('#search-input').value = '';
    alert('Bộ lọc đã được làm mới!');
});
