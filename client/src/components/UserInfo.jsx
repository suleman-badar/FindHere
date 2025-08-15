import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


export default function UserInfo() {
    return (
        <div className='flex gap-4'>
            <Link to="/signIn">Sign In</Link>
            <Link to="/profile"><FontAwesomeIcon icon={faCircleUser} className="text-3xl" /></Link>
        </div>
    );
}