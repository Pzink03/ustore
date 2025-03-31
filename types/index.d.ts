type CurrentUserProps = {
  $id: string
  accountId: string
  fullName: string
  avatar: string
  email: string
}
type UploadFileProps = {
  file: File
  ownerId: string
  accountId: string
  path: string
}
