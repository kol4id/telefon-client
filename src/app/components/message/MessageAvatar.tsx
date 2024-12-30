import { FC } from "react"
import { useNavigate } from "react-router-dom";

interface IProps{
    photoUrl: string | undefined, 
    className: string
    userChannel?: string
}

const MessageAvatar:FC<IProps> = ({photoUrl, className, userChannel}) =>{

    const navigate = useNavigate();

    return(
        <>
            {
                photoUrl ? 
                    <img className={className} 
                        src={photoUrl} 
                        alt="User" 
                        onClick={()=> userChannel && navigate(`/a/${userChannel}`)}
                        style={{cursor: 'pointer'}}/> 
                    : null
            }
        </>
    )
}
export default MessageAvatar;