import plus from '../image/plus-regular-24.png';
import folder from '../image/file-solid-24.png'
import send from '../image/send-regular-24.png'

export default function Input() {
    return <div className="input">
        <input type="text" />
        <div className="textSender">
            <img src={plus} alt="" />
            <input type="file" name="file" id="file" style={{display: "none"}} />
            <label htmlFor="file">
                <img src={folder} alt="" />
            </label>
            <img src={send} alt="" />
        </div>
    </div>
}