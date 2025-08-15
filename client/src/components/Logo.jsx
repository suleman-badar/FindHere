import logoImg from '../assets/logoImg.png';
export default function Logo() {
    return (
        <img src={logoImg} alt="logo" className="w-20 h-20 md:w-20 md:h-20 lg:w-24 lg:h-20   object-contain" />
    );
}
