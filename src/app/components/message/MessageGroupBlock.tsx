import MessageMedia from "../MessageMedia";
import MessageContent from "./MessageContent";
import styles from '../../styles/Message.module.css';
import { IMessage } from "app/global/types/Message.dto";
import { FC } from "react";
import { IUserExternal } from "app/global/types/User.dto";
import hashStringToColor from "../../../app/utils/general/nameToColor";

interface IProps{
    message: IMessage,
    self: boolean,
    user: IUserExternal | undefined,
    showName: boolean
}

const MessageGroupBlock: FC<IProps> = ({message, self, user, showName}) =>{

    const name = user?.firstName + (user?.lastName == "" ? "" : ` ${user?.lastName}`)
    const className = self ? styles.name_self : styles.name;

    return(
        <>
            <div className = {styles.message_block_group}>
                <section className={styles.message_sender} style={{display: showName ? "" : "none"}}>
                    <h3 className={className} style={{color: hashStringToColor(name)}}>{name}</h3>
                </section>
                <MessageMedia messageMedia={message.mediaUrls!} hasMedia={message.hasMedia}/>
                <MessageContent message={message} self={self}/>
            </div>
        </>
    )
}
export default MessageGroupBlock;