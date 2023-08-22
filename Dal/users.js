import jsonfile from "jsonfile"
const {readFile, writeFile} = jsonfile

const FILE = 'Dal/users.json';


export const getUsers = async () => {
    const products = await readFile(FILE);
    return products;
}
export const getUser = async (email) => {
    const products = await getUsers()
    return products.find(u => u.email === email);
}

export const deleteUser = async (email) => {
    const users = await getUsers();
    const index = users.findIndex(u => u.email === email);
    if (index >= 0) {
        const deletedUser = users[index];
        users.splice(index, 1);
        await writeFile(FILE, users);
        return deletedUser;
    }
    else {
        throw new Error('user not found !');
    }
}


export const addUser = async (user) => {
    const users = await getUsers();
    if(!users.length) user.id = 1;
    else user.id = users[users.length - 1].id + 1;
    if (!user.isAdmin) user.isAdmin = false;
    users.push(user);
    await writeFile(FILE, users);
    return user;
}

export const updateUser = async (user, email) => {
    const users = await getUsers();
    const index = users.findIndex(u => u.email === email);
    if (index >= 0) {
        const oldUser = users[index];
        users[index] = { ...oldUser,...user };
        await writeFile(FILE, users);
        return users[index];
    }
    else {
        throw new Error('user not found !');
    }
}

export default {getUser,addUser,updateUser,deleteUser,getUsers};
