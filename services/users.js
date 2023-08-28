import { getUsers } from "../Dal/users.js"
import * as userDal from '../Dal/users.js'
import bcrypt from 'bcrypt'

export const checkUniqeUser = async (user) => {
    const users = await getUsers();
    const foundUser = users.find(u => u.email === user.email);
    return !(!!foundUser);
}

export const getToken = async (user) => {
    const users = await getUsers();
    const foundUser = users.find((u) => {
        if (u.email !== user.email) return false;
        if (!bcrypt.compareSync(user.password, u.password)) return false;
        return true
    });
    if (!foundUser) return null;
    const { email, password } = foundUser
    return { email, password };
}

export const compareUserToken = async (token) => {
    const users = await getUsers();
    const foundUser = users.find((u) => (u.email === token.email && u.password === token.password));
    return !!foundUser;
}

export const addUser = async (user) => {
    const encryptedPassword = await bcrypt.hash(user.password, 10);
    user.password = encryptedPassword;
    await userDal.addUser(user);
}

export const isAdmin = async (token) => {
    const users = await getUsers();
    const foundUser = users.find((u) => (u.email === token.email && u.password === token.password));
    return foundUser?.admin;
}

export const updateUser = async (user,email) =>{
    if(user.password) user.password = await bcrypt.hash(user.password,10);
    return await userDal.updateUser(user,email);
}

