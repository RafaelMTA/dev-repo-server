import User from '../models/User.js';

const exists = async (id) => {
    const user = await User.findById(id);
    return user;
}

export default {exists};