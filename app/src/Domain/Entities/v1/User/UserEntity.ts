interface UserEntity {
    id: string | null,
    username: String,
    email: String,
    enable: Boolean,
    password: String | null,
    createdAt: String | null,
    updatedAt: String | null,
    deletedAt: String | null
}

export default UserEntity;