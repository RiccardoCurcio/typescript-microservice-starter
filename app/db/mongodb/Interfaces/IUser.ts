interface IUser {
    username: String,
    email: String,
    enable: Boolean,
    password: String,
    createdAt: Date | null,
    updatedAt: Date | null,
    deletedAt: Date | null
}

export default IUser;