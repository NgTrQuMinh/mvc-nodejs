window.addEventListener('DOMContentLoaded', () => {
    const formUser = document.querySelector('#formUser');
    const todoListUser = document.querySelector('#todoListUser');

    const API = 'http://localhost:3000/api/v1/users';
    let Todos = [];

    // METHOD: GET
    const getAPI = async () => {
        try {
            const res = await fetch(`${API}/?limit=10&page=1`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer YOUR_TOKEN_HERE' // Mở ra nếu API yêu cầu mã xác thực
                }
            });
            if (!res.ok) {
                throw new Error(`Lỗi HTTP: ${res.status}`);
            }
            const data = await res.json();
            return data.data ?? [];
        } catch (error) {
            console.error('Error with getAPI!', error);
            return [];
        }
    }

    // XSS
    const clean = (str) => {
        return DOMPurify.sanitize(String(str), {  // String(): ép về chuỗi để không lỗi khi gặp số/null
            ALLOWED_TAGS: []               // Không cho thẻ HTML nào -> mọi thẻ bị loại bỏ, chỉ còn chữ thuần
        });
    }
    const template = (data) => {
        return `
            <tr class="itemUser" data-id="${clean(data._id)}">
                <td>${clean(data.name)}</td>
                <td>${clean(data.email)}</td>
                <td>${clean(data.city)}</td>
                <td>
                    <button class="btn-fix">Sửa</button>
                    <button class="btn-delete">Xóa</button>
                </td>
            </tr>
        `
    }
    const render = (data) => {
        todoListUser.innerHTML = data.map(template).join('');
    }

    // METHOD: POST
    formUser.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btnSubmit = formUser.querySelector('[type="submit"]'); // Lấy nút submit để khóa tạm thời
        btnSubmit.disabled = true;  // Khóa nút, tránh bấm nhiều lần

        const formData = new FormData(formUser);
        const dataUser = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(API, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: dataUser.nameUser,
                    email: dataUser.emailUser,
                    city: dataUser.cityUser
                })
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const dataNew = await res.json();

            Todos.push(dataNew.data);
            render(Todos);
            formUser.reset();
        } catch (error) {
            console.error('Lỗi khi thêm người dùng:', error);
            alert('Không thể thêm người dùng. Vui lòng kiểm tra lại!');
        } finally {
            btnSubmit.disabled = false;
        }
    })

    todoListUser.addEventListener('click', (e) => {
        const itemUser = e.target.closest('.itemUser');
        if (!itemUser) return;

        const itemID = itemUser.dataset?.id;
        const index = Todos.findIndex(item => {
            return String(item._id) === String(itemID);
        })
        if (index === -1) return;

        if (e.target.closest('.btn-delete')) {
            handleDelete(itemID, index);
        }
        else if (e.target.closest('.btn-fix')) {
            handleEdit(itemID, index);
        }
    });

    // startApp
    const startApp = async () => {
        Todos = await getAPI();
        render(Todos);
    }
    startApp();

    // METHOD: PUT
    const handleEdit = async (itemID, index) => {
        // Lấy dữ liệu hiện tại của user từ mảng
        const user = Todos[index];

        const name = prompt('Tên mới:', user.name);
        if (name === null) return;
        const email = prompt('Email mới:', user.email);
        if (email === null) return;
        const city = prompt('Thành phố mới:', user.city);
        if (city === null) return;

        try {
            const res = await fetch(API, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ id: itemID, name, email, city })
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);

            // Cập nhật mảng dữ liệu
            Todos[index].name = name;
            Todos[index].email = email;
            Todos[index].city = city;

            render(Todos);
        } catch (error) {
            console.error('Lỗi khi sửa người dùng:', error);
            alert('Không thể sửa người dùng. Vui lòng kiểm tra lại!');
        }
    };

    // METHOD: DELETE
    const handleDelete = async (itemID, index) => {
        try {
            const res = await fetch(API, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ id: itemID })
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);

            Todos.splice(index, 1);
            render(Todos);
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
            alert('Không thể xóa người dùng. Vui lòng kiểm tra lại!');
        }
    };


})

