import { FC } from "react"

interface IProps{
    photoUrl: string | undefined, 
    className: string
}

const MessageAvatar:FC<IProps> = ({photoUrl, className}) =>{
    return(
        <>
            {photoUrl ? <img className={className} src={photoUrl} alt="User" /> : null}
        </>
    )
}
export default MessageAvatar;