import { clerkClient } from "@clerk/nextjs"

interface EditedInfo {
  birthday: string
  sex: string
  userId: string
}

export async function updateProfile(editedInfo: EditedInfo) {
  const publicMetadata = {
    publicMetadata: {
      birthday: editedInfo.birthday,
      sex: editedInfo.sex,
    },
  }

  try {
    const updatedUser = await clerkClient.users.updateUser(
      editedInfo.userId,
      publicMetadata
    )
    return updatedUser
  } catch (error) {
    return error
  }
}
