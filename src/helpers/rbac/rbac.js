const roles = {
    admin: ['create', 'read', 'update', 'delete'],
    editor: ['create', 'read', 'update'],
    guest: ['read'],
};
const users = [
    { username: 'Alice', role: 'admin' },
    { username: 'Bob', role: 'editor' },
    { username: 'Charlie', role: 'guest' },
];
export function getPermission(user, action) {
    const userRole = user.role;
    const userPermissions = roles[userRole];

    if (userPermissions && userPermissions.includes(action)) {
        return true;
    }
    return false;
}