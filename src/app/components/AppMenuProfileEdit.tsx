import ProfileEdit from "../panes/ProfileEdit/ProfileEdit";
import BackButton from "./BackButton";


const AppMenuProfileEdit = () =>{

    return(
        <main>
            <section style={{display: 'flex', margin: '10px 0px 0px 10px'}}>
                <BackButton type="channels"/>
                <h1 style={{margin: '0 0 0 10px', fontSize: '16pt'}}>Edit profile</h1>
            </section>
            <ProfileEdit/>
        </main>
    )
}

export default AppMenuProfileEdit