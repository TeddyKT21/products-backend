import * as userDal from "../Dal/users.js";
import * as userServices from "../services/users.js";
import { addUser, checkUniqeUser, compareUserToken, getToken, isAdmin } from "../services/users.js";

export const signUp = async (req, res) => {
    try {
        const { email, password, admin } = req.body;
        const user = { email, password, admin };
        if (await checkUniqeUser(user)) {
            await addUser(user);
            res.status(201).send(user);
        }
        else {
            res.status(400).send('user already exists');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

export const login = async (req, res) => {
    try {
        const user = req.body;
        const token = await getToken(user);
        token ? res.send(token) : res.status(400).send('email or password invalid !');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;
        const deletedUser = await userDal.deleteUser(email);
        res.send(deletedUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

export const updateUser = async (req, res) => {
    try {
        const { user, token } = req.body;
        const updatedUser = await userServices.updateUser(user, token.email);
        res.status(201).send(updatedUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

export const checkAdmin = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (await isAdmin(token)) next();
        else res.status(400).send('action not authorized !');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}

export const checkUserValid = async (req, res, next) => {
    try {
        const { token } = req.body;
        const vaild = await compareUserToken(token)
        if (!vaild) res.status(400).send('action not authorized !');
        else next();
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

export const checkAdminOrSame = async (req, res, next) => {
    try {
        const { token, email } = req.body;
        if (await isAdmin(token) || token.email === email) next();
        else res.status(400).send('action not authorized !');
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}