document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/users';

    const modals = {
        addUser: document.getElementById('addUserModal'),
        updateUser: document.getElementById('updateUserModal'),
        deleteUser: document.getElementById('deleteUserModal')
    };

    const buttons = {
        showAddUserModal: document.getElementById('showAddUserModal'),
        showUpdateUserModal: document.getElementById('showUpdateUserModal'),
        showDeleteUserModal: document.getElementById('showDeleteUserModal')
    };

    const closeButtons = {
        addUser: document.getElementById('closeAddUserModal'),
        updateUser: document.getElementById('closeUpdateUserModal'),
        deleteUser: document.getElementById('closeDeleteUserModal')
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch(apiUrl);
            const result = await response.json();
            const userList = document.getElementById('userList');
            userList.innerHTML = result.data.map(user => `
                <div class="list-group-item">
                    <strong>ID:</strong> ${user.id} <br>
                    <strong>Name:</strong> ${user.name} <br>
                    <strong>Phone:</strong> ${user.phone} <br>
                    <strong>Username:</strong> ${user.username} <br>
                    <strong>Password:</strong> ${user.password} <br>
                    <strong>Image:</strong> <img src="${user.user_image}" alt="User Image" width="100">
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const addUser = async (event) => {
        event.preventDefault();
        const newUser = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            user_image: document.getElementById('user_image').value
        };

        try {
            await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });
            modals.addUser.style.display = 'none';
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const updateUser = async (event) => {
        event.preventDefault();
        const userId = document.getElementById('updateId').value;
        const updatedUser = {
            name: document.getElementById('updateName').value,
            phone: document.getElementById('updatePhone').value,
            username: document.getElementById('updateUsername').value,
            password: document.getElementById('updatePassword').value,
            user_image: document.getElementById('updateUser_image').value
        };

        try {
            await fetch(`${apiUrl}/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser)
            });
            modals.updateUser.style.display = 'none';
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const deleteUser = async (event) => {
        event.preventDefault();
        const userId = document.getElementById('deleteId').value;

        try {
            await fetch(`${apiUrl}/${userId}`, {
                method: 'DELETE'
            });
            modals.deleteUser.style.display = 'none';
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    buttons.showAddUserModal.addEventListener('click', () => {
        modals.addUser.style.display = 'block';
    });

    buttons.showUpdateUserModal.addEventListener('click', () => {
        modals.updateUser.style.display = 'block';
    });

    buttons.showDeleteUserModal.addEventListener('click', () => {
        modals.deleteUser.style.display = 'block';
    });

    closeButtons.addUser.addEventListener('click', () => {
        modals.addUser.style.display = 'none';
    });

    closeButtons.updateUser.addEventListener('click', () => {
        modals.updateUser.style.display = 'none';
    });

    closeButtons.deleteUser.addEventListener('click', () => {
        modals.deleteUser.style.display = 'none';
    });

    document.getElementById('addUserForm').addEventListener('submit', addUser);
    document.getElementById('updateUserForm').addEventListener('submit', updateUser);
    document.getElementById('deleteUserForm').addEventListener('submit', deleteUser);

    fetchUsers();
});
