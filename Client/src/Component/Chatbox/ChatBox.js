import * as React from 'react';
import { useParams } from 'react-router';
import logo from "../../IMG/woekday.jpg"
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import './style.css';

export default function ChatBox() {

    const { id } = useParams()

    return (
        <div className="page_container">
            <div className="contact_container">
                {
                    BaseListContact.map((item) => {
                        return <ContactItem item={item} focus={item.id == id} />
                    })
                }
            </div>
            <div className="chat_container">
                <div className="message_container">
                    {
                        BaseListMessages.map(item => {
                            return <Message item = {item}/>
                        })
                    }

                </div>
                <form className="wrapForm" noValidate autoComplete="off">
                    <TextField
                        id="standard-text"
                        label="Type here"
                        className="wrapText"
                    //margin="normal"
                    />
                    <Button variant="contained" color="primary">
                        <SendIcon />
                    </Button>
                </form>
            </div>
            <div className="tool_container">
            </div>
        </div>
    )
}

function Message(props) {
    return (
        <div className="message_item_container">
            <div className="message_avt_container">
                <img src={logo} className="avt_img" />
            </div>
            <div className="message_content">
                <h5>{props.item.name}</h5>
                <p>{props.item.content}
                </p>
            </div>
            <div className = "message_time">
                {props.item.datetime}
            </div>
        </div>
    )
}

/**
 * Contact Item
 * 
 * @param {*} props have {avt, name, focus}
 * @returns 
 */
function ContactItem(props) {
    return (
        <a className="a_normal" href={`/chatbox/${props.item.id}`}>
            <div className={props.focus ? "contact_item_focus" : "contact_item"}>
                <img src={props.item.avt} className="avt_img" />
                <div className="contact_name">{props.item.name}</div>
            </div>
        </a>
    )
}

const BaseListMessages = [
    {
        id : 1,
        name: "Thang",
        content: "Xin chao moi nguoi",
        datetime: "19/11 10:30"
    },
    {
        id : 1,
        name: "Thang",
        content: "Xin chao moi nguoi",
        datetime: "19/11 10:30"
    },
    {
        id : 1,
        name: "Thanh",
        content: "Xin chao moi nguoi",
        datetime: "19/11 10:30"
    },
    {
        id : 1,
        name: "Thang",
        content: "Xin chao moi nguoi",
        datetime: "19/11 10:30"
    },
    {
        id : 1,
        name: "Long",
        content: "Xin chao moi nguoi",
        datetime: "19/11 10:30"
    },
]

const BaseListContact = [
    {
        id: "1",
        avt: logo,
        name: "Le Duc Thang"
    },
    {
        id: "2",
        avt: logo,
        name: "Tran Hoang Long"
    },
    {
        id: "3",
        avt: logo,
        name: "Tran Nhat Thanh"
    },
    {
        id: "4",
        avt: logo,
        name: "Le Duc Thang 1"
    },
    {
        id: "5",
        avt: logo,
        name: "Le Duc Thang 2"
    },
    {
        id: "6",
        avt: logo,
        name: "LeDucThangLeDucThangLeDucThangLeDucThangLeDucThang"
    },
]